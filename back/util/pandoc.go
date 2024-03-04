package util

import (
	"bytes"
	"errors"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/88250/gulu"
	"github.com/siyuan-note/eventbus"
	"github.com/siyuan-note/logging"
)

func ConvertPandoc(dir string, args ...string) (path string, err error) {
	if "" == PandocBinPath || ContainerStd != Container {
		err = errors.New("not found executable pandoc")
		return
	}

	pandoc := exec.Command(PandocBinPath, args...)
	gulu.CmdAttr(pandoc)
	path = filepath.Join("temp", "convert", "pandoc", dir)
	absPath := filepath.Join(WorkspaceDir, path)
	if err = os.MkdirAll(absPath, 0755); nil != err {
		logging.LogErrorf("mkdir [%s] failed: [%s]", absPath, err)
		return
	}
	pandoc.Dir = absPath
	output, err := pandoc.CombinedOutput()
	if nil != err {
		err = errors.Join(err, errors.New(string(output)))
		logging.LogErrorf("pandoc convert output failed: %s", err)
		return
	}
	path = "/" + filepath.ToSlash(path)
	return
}

func Pandoc(from, to, o, content string) (err error) {
	if "" == from || "" == to || "md" == to {
		if err = gulu.File.WriteFileSafer(o, []byte(content), 0644); nil != err {
			logging.LogErrorf("write export markdown file [%s] failed: %s", o, err)
		}
		return
	}

	dir := filepath.Join(WorkspaceDir, "temp", "convert", "pandoc", gulu.Rand.String(7))
	if err = os.MkdirAll(dir, 0755); nil != err {
		logging.LogErrorf("mkdir [%s] failed: [%s]", dir, err)
		return
	}
	tmpPath := filepath.Join(dir, gulu.Rand.String(7))
	if err = os.WriteFile(tmpPath, []byte(content), 0644); nil != err {
		logging.LogErrorf("write file failed: [%s]", err)
		return
	}

	args := []string{
		tmpPath,
		"--from", from,
		"--to", to,
		"--resource-path", filepath.Dir(o),
		"-s",
		"-o", o,
	}

	pandoc := exec.Command(PandocBinPath, args...)
	gulu.CmdAttr(pandoc)
	output, err := pandoc.CombinedOutput()
	if nil != err {
		logging.LogErrorf("pandoc convert output [%s], error [%s]", string(output), err)
		return
	}
	return
}

var (
	PandocBinPath string // Pandoc 可执行文件路径
)

func InitPandoc() {
	if ContainerStd != Container {
		return
	}

	pandocDir := filepath.Join(TempDir, "pandoc")

	if confPath := filepath.Join(ConfDir, "conf.json"); gulu.File.IsExist(confPath) {
		// Workspace built-in Pandoc is no longer initialized after customizing Pandoc path https://github.com/siyuan-note/siyuan/issues/8377
		if data, err := os.ReadFile(confPath); nil == err {
			conf := map[string]interface{}{}
			if err = gulu.JSON.UnmarshalJSON(data, &conf); nil == err && nil != conf["export"] {
				export := conf["export"].(map[string]interface{})
				if customPandocBinPath := export["pandocBin"].(string); !strings.HasPrefix(customPandocBinPath, pandocDir) {
					if pandocVer := getPandocVer(customPandocBinPath); "" != pandocVer {
						PandocBinPath = customPandocBinPath
						logging.LogInfof("custom pandoc [ver=%s, bin=%s]", pandocVer, PandocBinPath)
						return
					}
				}
			}
		}
	}

	defer eventbus.Publish(EvtConfPandocInitialized)

	if gulu.OS.IsWindows() {
		PandocBinPath = filepath.Join(pandocDir, "bin", "pandoc.exe")
	} else if gulu.OS.IsDarwin() || gulu.OS.IsLinux() {
		PandocBinPath = filepath.Join(pandocDir, "bin", "pandoc")
	}
	pandocVer := getPandocVer(PandocBinPath)
	if "" != pandocVer {
		logging.LogInfof("built-in pandoc [ver=%s, bin=%s]", pandocVer, PandocBinPath)
		return
	}

	pandocZip := filepath.Join(WorkingDir, "pandoc.zip")
	if "dev" == Mode || !gulu.File.IsExist(pandocZip) {
		if gulu.OS.IsWindows() {
			pandocZip = filepath.Join(WorkingDir, "pandoc/pandoc-windows-amd64.zip")
		} else if gulu.OS.IsDarwin() {
			pandocZip = filepath.Join(WorkingDir, "pandoc/pandoc-darwin-amd64.zip")
		} else if gulu.OS.IsLinux() {
			pandocZip = filepath.Join(WorkingDir, "pandoc/pandoc-linux-amd64.zip")
		}
	}
	if err := gulu.Zip.Unzip(pandocZip, pandocDir); nil != err {
		logging.LogErrorf("unzip pandoc failed: %s", err)
		return
	}

	if gulu.OS.IsDarwin() || gulu.OS.IsLinux() {
		exec.Command("chmod", "+x", PandocBinPath).CombinedOutput()
	}
	pandocVer = getPandocVer(PandocBinPath)
	logging.LogInfof("initialized built-in pandoc [ver=%s, bin=%s]", pandocVer, PandocBinPath)
}

func getPandocVer(binPath string) (ret string) {
	if "" == binPath {
		return
	}

	cmd := exec.Command(binPath, "--version")
	gulu.CmdAttr(cmd)
	data, err := cmd.CombinedOutput()
	if nil == err && strings.HasPrefix(string(data), "pandoc") {
		parts := bytes.Split(data, []byte("\n"))
		if 0 < len(parts) {
			ret = strings.TrimPrefix(string(parts[0]), "pandoc")
			ret = strings.ReplaceAll(ret, ".exe", "")
			ret = strings.TrimSpace(ret)
		}
		return
	}
	return
}

func IsValidPandocBin(binPath string) bool {
	if "" == binPath {
		return false
	}

	cmd := exec.Command(binPath, "--version")
	gulu.CmdAttr(cmd)
	data, err := cmd.CombinedOutput()
	if nil == err && strings.HasPrefix(string(data), "pandoc") {
		return true
	}
	return false
}
