package util

import (
	"github.com/88250/gulu"
	ginSessions "github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

var WrongAuthCount int

func NeedCaptcha() bool {
	return 3 < WrongAuthCount
}

// SessionData represents the session.
type SessionData struct {
	Workspaces map[string]*WorkspaceSession // <WorkspacePath, WorkspaceSession>
}

type WorkspaceSession struct {
	AccessAuthCode string
	Captcha        string
}

// Save saves the current session of the specified context.
func (sd *SessionData) Save(c *gin.Context) error {
	session := ginSessions.Default(c)
	sessionDataBytes, err := gulu.JSON.MarshalJSON(sd)
	if nil != err {
		return err
	}
	session.Set("data", string(sessionDataBytes))
	return session.Save()
}

// GetSession returns session of the specified context.
func GetSession(c *gin.Context) *SessionData {
	ret := &SessionData{}

	session := ginSessions.Default(c)
	sessionDataStr := session.Get("data")
	if nil == sessionDataStr {
		return ret
	}

	err := gulu.JSON.UnmarshalJSON([]byte(sessionDataStr.(string)), ret)
	if nil != err {
		return ret
	}

	c.Set("session", ret)
	return ret
}

func GetWorkspaceSession(session *SessionData) (ret *WorkspaceSession) {
	ret = &WorkspaceSession{}
	if nil == session.Workspaces {
		session.Workspaces = map[string]*WorkspaceSession{}
	}
	ret = session.Workspaces[WorkspaceDir]
	if nil == ret {
		ret = &WorkspaceSession{}
		session.Workspaces[WorkspaceDir] = ret
	}
	return
}

func RemoveWorkspaceSession(session *SessionData) {
	delete(session.Workspaces, WorkspaceDir)
}
