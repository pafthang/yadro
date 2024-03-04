/*! abcjs_basic v6.2.2 Copyright © 2009-2023 Paul Rosen and Gregory Dyke (https://abcjs.net) */
/*! For license information please see abcjs_basic.LICENSE */
!(function (e, t) {
	'object' == typeof exports && 'object' == typeof module
		? (module.exports = t())
		: 'function' == typeof define && define.amd
		? define([], t)
		: 'object' == typeof exports
		? (exports.abcjs = t())
		: (e.ABCJS = t());
})(this, function () {
	return (
		(e = {
			1045: function (e, t, r) {
				var n = r(1185),
					i = r(6306),
					a = r(1592),
					s = r(1028),
					o = r(5633),/* eslint-disable no-mixed-spaces-and-tabs */

					c = {};
				(c.signature = 'abcjs-basic v' + n),
					Object.keys(i).forEach(function (e) {
						c[e] = i[e];
					}),
					Object.keys(a).forEach(function (e) {
						c[e] = a[e];
					}),
					(c.renderAbc = r(6859)),
					(c.TimingCallbacks = r(5681));
				var l = r(6020);
				(c.setGlyph = l.setSymbol), (c.strTranspose = o);
				var h = r(5594),
					u = r(8471),
					d = r(522),
					f = r(2029),
					p = r(6313),
					m = r(5281),
					g = r(8702),
					v = r(5049),
					b = r(4718),
					y = r(3450),
					x = r(562);
				(c.synth = {
					CreateSynth: h,
					instrumentIndexToName: u,
					pitchToNoteName: d,
					SynthController: y,
					SynthSequence: f,
					CreateSynthControl: p,
					registerAudioContext: m,
					activeAudioContext: g,
					supportsAudio: v,
					playEvent: b,
					getMidiFile: x,
					sequence: s
				}),
					(c.Editor = r(5294)),
					(c.EditArea = r(2945)),
					(e.exports = c);
			},
			6306: function (e, t, r) {
				var n = r(5681),
					i = {};
				!(function () {
					'use strict';
					var e, t;
					(i.startAnimation = function (r, i, a) {
						function s(e) {
							for (var t = 0; t < e.length; t++) {
								var r = e[t];
								r.classList.contains('abcjs-bar') || (r.style.display = 'none');
							}
						}
						var o;
						function c(e) {
							a.hideCurrentMeasure
								? (function (e) {
										s(r.querySelectorAll(e));
								  })(e)
								: a.hideFinishedMeasures &&
								  (function (e) {
										o && s(r.querySelectorAll(o)), (o = e);
								  })(e);
						}
						e && (e.stop(), (e = void 0)),
							a.showCursor &&
								((t = r.querySelector('.abcjs-cursor')) ||
									(((t = document.createElement('DIV')).className = 'abcjs-cursor cursor'),
									(t.style.position = 'absolute'),
									r.appendChild(t),
									(r.style.position = 'relative'))),
							(e = new n(i, {
								qpm: a.bpm,
								eventCallback: function (r) {
									if (r) {
										if (r.measureStart) {
											var n = '.abcjs-l' + (i = r).line + '.abcjs-m' + i.measureNumber;
											n && c(n);
										}
										t &&
											((t.style.left = r.left + 'px'),
											(t.style.top = r.top + 'px'),
											(t.style.width = r.width + 'px'),
											(t.style.height = r.height + 'px'));
									} else e.stop(), (e = void 0);
									var i;
								}
							})).start();
					}),
						(i.pauseAnimation = function (t) {
							e && (t ? e.pause() : e.start());
						}),
						(i.stopAnimation = function () {
							e && (e.stop(), (e = void 0));
						});
				})(),
					(e.exports = i);
			},
			4321: function (e, t, r) {
				var n = r(4916),
					i = r(5952),
					a = { violin: 'ViolinTab', fiddle: 'ViolinTab', mandolin: 'ViolinTab', guitar: 'GuitarTab' },
					s = {
						inited: !1,
						plugins: {},
						register: function (e) {
							var t = e.name,
								r = e.tablature;
							this.plugins[t] = r;
						},
						setError: function (e, t) {
							e.warnings ? e.warning.push(t) : (e.warnings = [t]);
						},
						preparePlugins: function (e, t, r) {
							var n = null;
							if (r.tablature) {
								var i = r.tablature;
								n = [];
								for (var s = 0; s < i.length; s++) {
									var o = i[s],
										c = o.instrument;
									if (null == c) return this.setError(e, "tablature 'instrument' is missing"), n;
									var l = a[c],
										h = null;
									if ((l && (h = this.plugins[l]), !h)) return this.setError(e, 'Undefined tablature plugin: ' + c), n;
									0 != r.visualTranspose && (o.visualTranspose = r.visualTranspose), (o.abcSrc = r.tablature.abcSrc);
									var u = { classz: h, tuneNumber: t, params: o, instance: null };
									n.push(u);
								}
							}
							return n;
						},
						layoutTablatures: function (e, t) {
							for (var r = t.tablatures, n = 0; n < t.lines.length; n++) {
								var i = t.lines[n],
									a = i.staff;
								if (a)
									for (var s = 0; s < a.length; s++)
										if (r[s]) {
											var o = r[s];
											null == o.instance &&
												((o.instance = new o.classz()), o.instance.init(t, o.tuneNumber, o.params, s)),
												o.instance.render(e, i, s);
										}
							}
						},
						init: function () {
							this.inited || (this.register(new n()), this.register(new i()), (this.inited = !0));
						}
					};
				e.exports = s;
			},
			5681: function (e) {
				e.exports = function (e, t) {
					var r = this;
					if ((t || (t = {}), (r.qpm = t.qpm ? parseInt(t.qpm, 10) : null), !r.qpm)) {
						var n = e.metaText ? e.metaText.tempo : null;
						r.qpm = e.getBpm(n);
					}
					(r.extraMeasuresAtBeginning = t.extraMeasuresAtBeginning ? parseInt(t.extraMeasuresAtBeginning, 10) : 0),
						(r.beatCallback = t.beatCallback),
						(r.eventCallback = t.eventCallback),
						(r.lineEndCallback = t.lineEndCallback),
						(r.lineEndAnticipation = t.lineEndAnticipation ? parseInt(t.lineEndAnticipation, 10) : 0),
						(r.beatSubdivisions = t.beatSubdivisions ? parseInt(t.beatSubdivisions, 10) : 1),
						(r.joggerTimer = null),
						(r.replaceTarget = function (e) {
							(r.noteTimings = e.setTiming(r.qpm, r.extraMeasuresAtBeginning)),
								0 === e.noteTimings.length && (r.noteTimings = e.setTiming(0, 0)),
								r.lineEndCallback &&
									(r.lineEndTimings = (function (e, t) {
										for (var r = [], n = null, i = 0; i < e.length; i++) {
											var a = e[i];
											'end' !== a.type &&
												a.top !== n &&
												(r.push({
													measureNumber: a.measureNumber,
													milliseconds: a.milliseconds - t,
													top: a.top,
													bottom: a.top + a.height
												}),
												(n = a.top));
										}
										return r;
									})(e.noteTimings, r.lineEndAnticipation)),
								(r.startTime = null),
								(r.currentBeat = 0),
								(r.currentEvent = 0),
								(r.currentLine = 0),
								(r.currentTime = 0),
								(r.isPaused = !1),
								(r.isRunning = !1),
								(r.pausedPercent = null),
								(r.justUnpaused = !1),
								(r.newSeekPercent = 0),
								(r.lastTimestamp = 0),
								0 !== r.noteTimings.length &&
									((r.millisecondsPerBeat = 1e3 / (r.qpm / 60) / r.beatSubdivisions),
									(r.lastMoment = r.noteTimings[r.noteTimings.length - 1].milliseconds),
									(r.totalBeats = Math.round(r.lastMoment / r.millisecondsPerBeat)));
						}),
						r.replaceTarget(e),
						(r.doTiming = function (e) {
							if (
								r.lastTimestamp !== e &&
								((r.lastTimestamp = e), r.startTime || (r.startTime = e), !r.isPaused && r.isRunning)
							) {
								for (
									r.currentTime = e - r.startTime, r.currentTime += 16;
									r.noteTimings.length > r.currentEvent && r.noteTimings[r.currentEvent].milliseconds < r.currentTime;

								) {
									if (r.eventCallback && 'event' === r.noteTimings[r.currentEvent].type) {
										var t = r.startTime;
										r.eventCallback(r.noteTimings[r.currentEvent]),
											t !== r.startTime && (r.currentTime = e - r.startTime);
									}
									r.currentEvent++;
								}
								if (
									r.lineEndCallback &&
									r.lineEndTimings.length > r.currentLine &&
									r.lineEndTimings[r.currentLine].milliseconds < r.currentTime &&
									r.currentEvent < r.noteTimings.length
								) {
									var n =
										r.noteTimings[r.currentEvent].milliseconds === r.currentTime
											? r.noteTimings[r.currentEvent]
											: r.noteTimings[r.currentEvent - 1];
									r.lineEndCallback(r.lineEndTimings[r.currentLine], n, {
										line: r.currentLine,
										endTimings: r.lineEndTimings,
										currentTime: r.currentTime
									}),
										r.currentLine++;
								}
								if (r.currentTime < r.lastMoment) {
									if ((requestAnimationFrame(r.doTiming), r.currentBeat * r.millisecondsPerBeat < r.currentTime)) {
										var i = r.doBeatCallback(e);
										null !== i && (r.currentTime = i);
									}
								} else if (r.currentBeat <= r.totalBeats && r.beatCallback) {
									var a = r.doBeatCallback(e);
									null !== a && (r.currentTime = a), requestAnimationFrame(r.doTiming);
								}
								if (r.currentTime >= r.lastMoment)
									if (r.eventCallback) {
										var s = r.eventCallback(null);
										r.shouldStop(s).then(function (e) {
											e && r.stop();
										});
									} else r.stop();
							}
						}),
						(r.shouldStop = function (e) {
							return new Promise(function (t) {
								return e
									? 'continue' === e
										? t(!1)
										: void (
												e.then &&
												e.then(function (e) {
													t('continue' !== e);
												})
										  )
									: t(!0);
							});
						}),
						(r.doBeatCallback = function (e) {
							if (r.beatCallback) {
								for (var t, n, i = r.currentEvent; i < r.noteTimings.length && null === r.noteTimings[i].left; ) i++;
								if (i < r.noteTimings.length) {
									for (
										t = r.noteTimings[i].milliseconds, i = Math.max(0, r.currentEvent - 1);
										i >= 0 && null === r.noteTimings[i].left;

									)
										i--;
									n = r.noteTimings[i];
								}
								var a = {},
									s = {};
								if (n) {
									(a.top = n.top), (a.height = n.height);
									var o = Math.max(0, e - r.startTime - n.milliseconds),
										c = t - n.milliseconds,
										l = n.endX - n.left,
										h = c ? (o * l) / c : 0;
									(a.left = n.left + h),
										0 === r.currentEvent && n.milliseconds > e - r.startTime && (a.left = void 0),
										(s = {
											timestamp: e,
											startTime: r.startTime,
											ev: n,
											endMs: t,
											offMs: o,
											offPx: h,
											gapMs: c,
											gapPx: l
										});
								} else s = { timestamp: e, startTime: r.startTime };
								var u = r.startTime;
								if (
									(r.beatCallback(
										r.currentBeat / r.beatSubdivisions,
										r.totalBeats / r.beatSubdivisions,
										r.lastMoment,
										a,
										s
									),
									u !== r.startTime)
								)
									return e - r.startTime;
								r.currentBeat++;
							}
							return null;
						}),
						(r.animationJogger = function () {
							r.isRunning && (r.doTiming(performance.now()), (r.joggerTimer = setTimeout(r.animationJogger, 60)));
						}),
						(r.start = function (e, t) {
							if (((r.isRunning = !0), r.isPaused && ((r.isPaused = !1), void 0 === e && (r.justUnpaused = !0)), e))
								r.setProgress(e, t);
							else if (0 === e) r.reset();
							else if (null !== r.pausedPercent) {
								var n = performance.now();
								(r.currentTime = r.lastMoment * r.pausedPercent),
									(r.startTime = n - r.currentTime),
									(r.pausedPercent = null),
									(r.reportNext = !0);
							}
							requestAnimationFrame(r.doTiming), (r.joggerTimer = setTimeout(r.animationJogger, 60));
						}),
						(r.pause = function () {
							r.isPaused = !0;
							var e = performance.now();
							(r.pausedPercent = (e - r.startTime) / r.lastMoment),
								(r.isRunning = !1),
								r.joggerTimer && (clearTimeout(r.joggerTimer), (r.joggerTimer = null));
						}),
						(r.currentMillisecond = function () {
							return r.currentTime;
						}),
						(r.reset = function () {
							(r.currentBeat = 0),
								(r.currentEvent = 0),
								(r.currentLine = 0),
								(r.startTime = null),
								(r.pausedPercent = null);
						}),
						(r.stop = function () {
							r.pause(), r.reset();
						}),
						(r.setProgress = function (e, t) {
							var n;
							switch (t) {
								case 'seconds':
									(r.currentTime = 1e3 * e),
										r.currentTime < 0 && (r.currentTime = 0),
										r.currentTime > r.lastMoment && (r.currentTime = r.lastMoment),
										(n = r.currentTime / r.lastMoment);
									break;
								case 'beats':
									(r.currentTime = e * r.millisecondsPerBeat * r.beatSubdivisions),
										r.currentTime < 0 && (r.currentTime = 0),
										r.currentTime > r.lastMoment && (r.currentTime = r.lastMoment),
										(n = r.currentTime / r.lastMoment);
									break;
								default:
									(n = e) < 0 && (n = 0), n > 1 && (n = 1), (r.currentTime = r.lastMoment * n);
							}
							r.isRunning || (r.pausedPercent = n);
							var i = performance.now();
							for (
								r.startTime = i - r.currentTime, r.currentEvent, r.currentEvent = 0;
								r.noteTimings.length > r.currentEvent && r.noteTimings[r.currentEvent].milliseconds < r.currentTime;

							)
								r.currentEvent++;
							if (r.lineEndCallback)
								for (
									r.currentLine = 0;
									r.lineEndTimings.length > r.currentLine &&
									r.lineEndTimings[r.currentLine].milliseconds + r.lineEndAnticipation < r.currentTime;

								)
									r.currentLine++;
							var a = r.currentBeat;
							(r.currentBeat = Math.floor(r.currentTime / r.millisecondsPerBeat)),
								r.beatCallback && a !== r.currentBeat && r.doBeatCallback(r.startTime + r.currentTime),
								r.eventCallback &&
									r.currentEvent >= 0 &&
									'event' === r.noteTimings[r.currentEvent].type &&
									r.eventCallback(r.noteTimings[r.currentEvent]),
								r.lineEndCallback &&
									r.lineEndCallback(r.lineEndTimings[r.currentLine], r.noteTimings[r.currentEvent], {
										line: r.currentLine,
										endTimings: r.lineEndTimings
									}),
								(r.joggerTimer = setTimeout(r.animationJogger, 60));
						});
				};
			},
			1592: function (e, t, r) {
				function n(e) {
					return (
						(n =
							'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
								? function (e) {
										return typeof e;
								  }
								: function (e) {
										return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
											? 'symbol'
											: typeof e;
								  }),
						n(e)
					);
				}
				var i = r(8905),
					a = r(9565),
					s = r(4321),
					o = {};
				!(function () {
					'use strict';
					o.numberOfTunes = function (e) {
						var t = e.split('\nX:').length;
						return 0 === t && (t = 1), t;
					};
					var e = (o.TuneBook = function (e) {
						var t = a(e);
						(this.header = t.header), (this.tunes = t.tunes);
					});
					(e.prototype.getTuneById = function (e) {
						for (var t = 0; t < this.tunes.length; t++) if (this.tunes[t].id === '' + e) return this.tunes[t];
						return null;
					}),
						(e.prototype.getTuneByTitle = function (e) {
							for (var t = 0; t < this.tunes.length; t++) if (this.tunes[t].title === e) return this.tunes[t];
							return null;
						}),
						(o.parseOnly = function (e, t) {
							for (var r = o.numberOfTunes(e), n = [], i = 0; i < r; i++) n.push(1);
							return o.renderEngine(function () {}, n, e, t);
						}),
						(o.renderEngine = function (t, r, a, o) {
							var c = [];
							if (void 0 !== r && void 0 !== a) {
								var l;
								(!(l = r) || l.propertyIsEnumerable('length') || 'object' !== n(l) || 'number' != typeof l.length) &&
									(r = [r]),
									void 0 === o && (o = {});
								for (
									var h = o.startingTune ? parseInt(o.startingTune, 10) : 0, u = new e(a), d = new i(), f = 0;
									f < r.length;
									f++
								) {
									var p = r[f];
									if (('*' === p || ('string' == typeof p && (p = document.getElementById(p))), p))
										if (h >= 0 && h < u.tunes.length) {
											d.parse(u.tunes[h].abc, o, u.tunes[h].startPos - u.header.length);
											var m = d.getTune();
											o.tablature && (s.init(), (m.tablatures = s.preparePlugins(m, h, o)));
											var g = d.getWarnings();
											g && (m.warnings = g);
											var v = t(p, m, f, u.tunes[h].abc);
											c.push(v || m);
										} else p.innerHTML && (p.innerHTML = '');
									h++;
								}
								return c;
							}
						}),
						(o.extractMeasures = function (t) {
							for (var r = [], n = new e(t), i = 0; i < n.tunes.length; i++) {
								for (
									var a = n.tunes[i],
										s = a.abc.split('K:'),
										c = s[1].split('\n'),
										l = s[0] + 'K:' + c[0] + '\n',
										h = null,
										u = null,
										d = null,
										f = [],
										p = !1,
										m = o.parseOnly(a.abc)[0],
										g = m.getPickupLength() > 0,
										v = 0;
									v < m.lines.length;
									v++
								) {
									var b = m.lines[v];
									if (b.staff)
										for (var y = 0; y < 1; y++)
											for (var x = b.staff[y], w = 0; w < 1; w++)
												for (var k = x.voices[w], C = 0; C < k.length; C++) {
													var T = k[C];
													if (
														(null === d && T.startChar >= 0 && ((d = T.startChar), (u = void 0 === T.chord ? h : null)),
														T.chord && (h = T),
														'bar' === T.el_type)
													) {
														if (p) {
															var _ = { abc: a.abc.substring(d, T.endChar) };
															(h = u && u.chord && u.chord.length > 0 ? u.chord[0].name : null) && (_.lastChord = h),
																T.startEnding && (_.startEnding = T.startEnding),
																T.endEnding && (_.endEnding = T.endEnding),
																f.push(_),
																(d = null),
																(p = !1);
														}
													} else 'note' === T.el_type && (p = !0);
												}
								}
								r.push({ header: l, measures: f, hasPickup: g });
							}
							return r;
						});
				})(),
					(e.exports = o);
			},
			6859: function (e, t, r) {
				var n = r(1592),
					i = (r(6780), r(5253)),
					a = r(8905),
					s = r(1756),
					o = {};
				function c() {
					var e = window.innerWidth;
					for (var t in o)
						if (o.hasOwnProperty(t)) {
							var r = o[t];
							(e -= 2 * r.offsetLeft), (r.style.width = e + 'px');
						}
				}
				try {
					window.addEventListener('resize', c), window.addEventListener('orientationChange', c);
				} catch (e) {}
				function l(e, t, r, n, a) {
					r.viewportHorizontal
						? ((e.innerHTML = '<div class="abcjs-inner"></div>'),
						  r.scrollHorizontal
								? ((e.style.overflowX = 'auto'), (e.style.overflowY = 'hidden'))
								: (e.style.overflow = 'hidden'),
						  (o[e.id] = e),
						  (e = e.children[0]))
						: r.viewportVertical
						? ((e.innerHTML = '<div class="abcjs-inner scroll-amount"></div>'),
						  (e.style.overflowX = 'hidden'),
						  (e.style.overflowY = 'auto'),
						  (e = e.children[0]))
						: (e.innerHTML = '');
					var s = new i(e, r);
					s.engraveABC(t, n, a),
						(t.engraver = s),
						(r.viewportVertical || r.viewportHorizontal) && (e.parentNode.style.width = e.style.width);
				}
				e.exports = function (e, t, r, o, c) {
					var h,
						u = {};
					if (r) {
						for (h in r) r.hasOwnProperty(h) && (u[h] = r[h]);
						u.warnings_id && u.tablature && (u.tablature.warning_id = u.warnings_id);
					}
					if (o)
						for (h in o)
							o.hasOwnProperty(h) &&
								('listener' === h ? o[h].highlight && (u.clickListener = o[h].highlight) : (u[h] = o[h]));
					if (c) for (h in c) c.hasOwnProperty(h) && (u[h] = c[h]);
					return n.renderEngine(
						function (e, t, r, n) {
							var o = !1;
							return (
								'*' === e &&
									((o = !0),
									(e = document.createElement('div')).setAttribute('style', 'visibility: hidden;'),
									document.body.appendChild(e)),
								u.afterParsing && u.afterParsing(t, r, n),
								!o && u.wrap && u.staffwidth
									? ((t = (function (e, t, r, n, o) {
											var c = new i(e, o).getMeasureWidths(t),
												h = s.calcLineWraps(t, c, o);
											if (h.reParse) {
												var u = new a();
												u.parse(n, h.revisedParams), (t = u.getTune());
												var d = u.getWarnings();
												d && (t.warnings = d);
											}
											return l(e, t, h.revisedParams, r, 0), (t.explanation = h.explanation), t;
									  })(e, t, r, n, u)),
									  t)
									: (l(e, t, u, r, 0), o && e.parentNode.removeChild(e), null)
							);
						},
						e,
						t,
						u
					);
				};
			},
			9447: function (e, t, r) {
				var n = r(4914).relativeMajor,
					i = { acc: 'sharp', note: 'f' },
					a = { acc: 'sharp', note: 'c' },
					s = { acc: 'sharp', note: 'g' },
					o = { acc: 'sharp', note: 'd' },
					c = { acc: 'sharp', note: 'A' },
					l = { acc: 'sharp', note: 'e' },
					h = { acc: 'flat', note: 'B' },
					u = { acc: 'flat', note: 'e' },
					d = { acc: 'flat', note: 'A' },
					f = { acc: 'flat', note: 'd' },
					p = { acc: 'flat', note: 'G' },
					m = { acc: 'flat', note: 'c' },
					g = {
						'C#': [i, a, s, o, c, l, { acc: 'sharp', note: 'B' }],
						'F#': [i, a, s, o, c, l],
						B: [i, a, s, o, c],
						E: [i, a, s, o],
						A: [i, a, s],
						D: [i, a],
						G: [i],
						C: [],
						F: [h],
						Bb: [h, u],
						Eb: [h, u, d],
						Cm: [h, u, d],
						Ab: [h, u, d, f],
						Db: [h, u, d, f, p],
						Gb: [h, u, d, f, p, m],
						Cb: [h, u, d, f, p, m, { acc: 'flat', note: 'F' }],
						'A#': [h, u],
						'B#': [],
						'D#': [h, u, d],
						'E#': [h],
						'G#': [h, u, d, f],
						none: []
					};
				e.exports = function (e) {
					var t = g[n(e)];
					return t ? JSON.parse(JSON.stringify(t)) : null;
				};
			},
			4914: function (e) {
				var t = {
						C: { modes: ['CMaj', 'Amin', 'Am', 'GMix', 'DDor', 'EPhr', 'FLyd', 'BLoc'], stepsFromC: 0 },
						Db: { modes: ['DbMaj', 'Bbmin', 'Bbm', 'AbMix', 'EbDor', 'FPhr', 'GbLyd', 'CLoc'], stepsFromC: 1 },
						D: { modes: ['DMaj', 'Bmin', 'Bm', 'AMix', 'EDor', 'F#Phr', 'GLyd', 'C#Loc'], stepsFromC: 2 },
						Eb: { modes: ['EbMaj', 'Cmin', 'Cm', 'BbMix', 'FDor', 'GPhr', 'AbLyd', 'DLoc'], stepsFromC: 3 },
						E: { modes: ['EMaj', 'C#min', 'C#m', 'BMix', 'F#Dor', 'G#Phr', 'ALyd', 'D#Loc'], stepsFromC: 4 },
						F: { modes: ['FMaj', 'Dmin', 'Dm', 'CMix', 'GDor', 'APhr', 'BbLyd', 'ELoc'], stepsFromC: 5 },
						Gb: { modes: ['GbMaj', 'Ebmin', 'Ebm', 'DbMix', 'AbDor', 'BbPhr', 'CbLyd', 'FLoc'], stepsFromC: 6 },
						G: { modes: ['GMaj', 'Emin', 'Em', 'DMix', 'ADor', 'BPhr', 'CLyd', 'F#Loc'], stepsFromC: 7 },
						Ab: { modes: ['AbMaj', 'Fmin', 'Fm', 'EbMix', 'BbDor', 'CPhr', 'DbLyd', 'GLoc'], stepsFromC: 8 },
						A: { modes: ['AMaj', 'F#min', 'F#m', 'EMix', 'BDor', 'C#Phr', 'DLyd', 'G#Loc'], stepsFromC: 9 },
						Bb: { modes: ['BbMaj', 'Gmin', 'Gm', 'FMix', 'CDor', 'DPhr', 'EbLyd', 'ALoc'], stepsFromC: 10 },
						B: { modes: ['BMaj', 'G#min', 'G#m', 'F#Mix', 'C#Dor', 'D#Phr', 'ELyd', 'A#Loc'], stepsFromC: 11 },
						'C#': { modes: ['C#Maj', 'A#min', 'A#m', 'G#Mix', 'D#Dor', 'E#Phr', 'F#Lyd', 'B#Loc'], stepsFromC: 1 },
						'F#': { modes: ['F#Maj', 'D#min', 'D#m', 'C#Mix', 'G#Dor', 'A#Phr', 'BLyd', 'E#Loc'], stepsFromC: 6 },
						Cb: { modes: ['CbMaj', 'Abmin', 'Abm', 'GbMix', 'DbDor', 'EbPhr', 'FbLyd', 'BbLoc'], stepsFromC: 11 }
					},
					r = null;
				e.exports = {
					relativeMajor: function (e) {
						r ||
							(function () {
								r = {};
								for (var e = Object.keys(t), n = 0; n < e.length; n++) {
									var i = t[e[n]];
									r[e[n].toLowerCase()] = e[n];
									for (var a = 0; a < i.modes.length; a++) {
										var s = i.modes[a].toLowerCase();
										r[s] = e[n];
									}
								}
							})();
						var n = e.toLowerCase().match(/([a-g][b#]?)(maj|min|mix|dor|phr|lyd|loc|m)?/);
						if (!n || !n[2]) return e;
						n = n[1] + n[2];
						var i = r[n];
						return i || e;
					},
					relativeMode: function (e, r) {
						var n = t[e];
						if (!n) return e;
						if ('' === r) return e;
						var i = r.toLowerCase().match(/^(maj|min|mix|dor|phr|lyd|loc|m)/);
						if (!i) return e;
						for (var a = i[1], s = 0; s < n.modes.length; s++) {
							var o = n.modes[s],
								c = o.toLowerCase().indexOf(a);
							if (-1 !== c && c === o.length - a.length) return o.substring(0, o.length - a.length);
						}
						return e;
					},
					transposeKey: function (e, r) {
						var n = t[e];
						if (!n) return e;
						for (; r < 0; ) r += 12;
						for (var i = (n.stepsFromC + r) % 12, a = 0; a < Object.keys(t).length; a++) {
							var s = Object.keys(t)[a];
							if (t[s].stepsFromC === i) return s;
						}
						return e;
					}
				};
			},
			6780: function (e, t, r) {
				var n = r(5008),
					i = r(4331),
					a = r(1028),
					s = r(9716),
					o = r(351);
				e.exports = function () {
					function e(e, t, r, n) {
						for (var i = 0; i < n.length; i++) e[r][n[i]] = t[r][n[i]];
					}
					function t(e, t) {
						for (; t < e.length && null === e[t].left; ) t++;
						return e[t];
					}
					(this.reset = function () {
						(this.version = '1.1.0'),
							(this.media = 'screen'),
							(this.metaText = {}),
							(this.metaTextInfo = {}),
							(this.formatting = {}),
							(this.lines = []),
							(this.staffNum = 0),
							(this.voiceNum = 0),
							(this.lineNum = 0),
							(this.runningFonts = {}),
							delete this.visualTranspose;
					}),
						this.reset(),
						(this.copyTopInfo = function (t) {
							var r = ['tempo', 'title', 'header', 'rhythm', 'origin', 'composer', 'author', 'partOrder'];
							e(this, t, 'metaText', r), e(this, t, 'metaTextInfo', r);
						}),
						(this.copyBottomInfo = function (t) {
							var r = [
								'unalignedWords',
								'book',
								'source',
								'discography',
								'notes',
								'transcription',
								'history',
								'abc-copyright',
								'abc-creator',
								'abc-edited-by',
								'footer'
							];
							e(this, t, 'metaText', r), e(this, t, 'metaTextInfo', r);
						}),
						(this.getBeatLength = function () {
							var e = this.getMeterFraction(),
								t = 1;
							return (6 === e.num || 9 === e.num || 12 === e.num || (3 === e.num && 8 === e.den)) && (t = 3), t / e.den;
						}),
						(this.getPickupLength = function () {
							var e = this.getBarLength(),
								t = (function (e, t) {
									for (var r = 0, n = 0; n < e.length; n++)
										if (e[n].staff)
											for (var i = 0; i < e[n].staff.length; i++)
												for (var a = 0; a < e[n].staff[i].voices.length; a++)
													for (var s = e[n].staff[i].voices[a], o = 1, c = 0; c < s.length; c++) {
														var l = s[c].rest && 'spacer' === s[c].rest.type;
														if (
															(s[c].startTriplet && (o = s[c].tripletMultiplier),
															s[c].duration && !l && 'tempo' !== s[c].el_type && (r += s[c].duration * o),
															s[c].endTriplet && (o = 1),
															r >= t && (r -= t),
															'bar' === s[c].el_type)
														)
															return r;
													}
									return r;
								})(this.lines, e);
							return t < 1e-8 || e - t < 1e-8 ? 0 : t;
						}),
						(this.getBarLength = function () {
							var e = this.getMeterFraction();
							return e.num / e.den;
						}),
						(this.getTotalTime = function () {
							return this.totalTime;
						}),
						(this.getTotalBeats = function () {
							return this.totalBeats;
						}),
						(this.millisecondsPerMeasure = function (e) {
							var t;
							if (e) t = e;
							else {
								var r = this.metaText ? this.metaText.tempo : null;
								t = this.getBpm(r);
							}
							return t <= 0 && (t = 1), (this.getBeatsPerMeasure() / t) * 6e4;
						}),
						(this.getBeatsPerMeasure = function () {
							var e = this.getBeatLength();
							return this.getBarLength() / e;
						}),
						(this.getMeter = function () {
							for (var e = 0; e < this.lines.length; e++) {
								var t = this.lines[e];
								if (t.staff)
									for (var r = 0; r < t.staff.length; r++) {
										var n = t.staff[r].meter;
										if (n) return n;
									}
							}
							return { type: 'common_time' };
						}),
						(this.getMeterFraction = function () {
							var e = this.getMeter(),
								t = 4,
								r = 4;
							return (
								e &&
									('specified' === e.type
										? ((t = parseInt(e.value[0].num, 10)), (r = parseInt(e.value[0].den, 10)))
										: 'cut_time' === e.type
										? ((t = 2), (r = 2))
										: 'common_time' === e.type && ((t = 4), (r = 4))),
								(this.meter = { num: t, den: r }),
								this.meter
							);
						}),
						(this.getKeySignature = function () {
							for (var e = 0; e < this.lines.length; e++) {
								var t = this.lines[e];
								if (t.staff) for (var r = 0; r < t.staff.length; r++) if (t.staff[r].key) return t.staff[r].key;
							}
							return {};
						}),
						(this.getElementFromChar = function (e) {
							for (var t = 0; t < this.lines.length; t++) {
								var r = this.lines[t];
								if (r.staff)
									for (var n = 0; n < r.staff.length; n++)
										for (var i = r.staff[n], a = 0; a < i.voices.length; a++)
											for (var s = i.voices[a], o = 0; o < s.length; o++) {
												var c = s[o];
												if (c.startChar && c.endChar && c.startChar <= e && c.endChar > e) return c;
											}
							}
							return null;
						}),
						(this.addElementToEvents = function (e, t, r, i, a, s, o, c, l, h) {
							if (t.hint) return { isTiedState: void 0, duration: 0 };
							var u = t.durationClass ? t.durationClass : t.duration;
							if ((t.abcelem.rest && 'spacer' === t.abcelem.rest.type && (u = 0), u > 0)) {
								for (var d = [], f = 0; f < t.elemset.length; f++) null !== t.elemset[f] && d.push(t.elemset[f]);
								var p = t.startTie;
								if (void 0 !== l)
									e['event' + l].elements.push(d),
										h &&
											(e['event' + r] ||
												(e['event' + r] = {
													type: 'event',
													milliseconds: r,
													line: s,
													measureNumber: o,
													top: i,
													height: a,
													left: null,
													width: 0,
													elements: [],
													startChar: null,
													endChar: null,
													startCharArray: [],
													endCharArray: []
												}),
											(e['event' + r].measureStart = !0),
											(h = !1)),
										p || (l = void 0);
								else {
									if (e['event' + r]) {
										if (
											(e['event' + r].left
												? (e['event' + r].left = Math.min(e['event' + r].left, t.x))
												: (e['event' + r].left = t.x),
											e['event' + r].elements.push(d),
											e['event' + r].startCharArray.push(t.abcelem.startChar),
											e['event' + r].endCharArray.push(t.abcelem.endChar),
											null === e['event' + r].startChar && (e['event' + r].startChar = t.abcelem.startChar),
											null === e['event' + r].endChar && (e['event' + r].endChar = t.abcelem.endChar),
											t.abcelem.midiPitches && t.abcelem.midiPitches.length)
										)
											for (
												e['event' + r].midiPitches || (e['event' + r].midiPitches = []), f = 0;
												f < t.abcelem.midiPitches.length;
												f++
											)
												e['event' + r].midiPitches.push(t.abcelem.midiPitches[f]);
										if (t.abcelem.midiGraceNotePitches && t.abcelem.midiGraceNotePitches.length) {
											e['event' + r].midiGraceNotePitches || (e['event' + r].midiGraceNotePitches = []);
											for (var m = 0; m < t.abcelem.midiGraceNotePitches.length; m++)
												e['event' + r].midiGraceNotePitches.push(t.abcelem.midiGraceNotePitches[m]);
										}
									} else
										(e['event' + r] = {
											type: 'event',
											milliseconds: r,
											line: s,
											measureNumber: o,
											top: i,
											height: a,
											left: t.x,
											width: t.w,
											elements: [d],
											startChar: t.abcelem.startChar,
											endChar: t.abcelem.endChar,
											startCharArray: [t.abcelem.startChar],
											endCharArray: [t.abcelem.endChar],
											midiPitches: t.abcelem.midiPitches ? n.cloneArray(t.abcelem.midiPitches) : []
										}),
											t.abcelem.midiGraceNotePitches &&
												(e['event' + r].midiGraceNotePitches = n.cloneArray(t.abcelem.midiGraceNotePitches));
									h && ((e['event' + r].measureStart = !0), (h = !1)), p && (l = r);
								}
							}
							return { isTiedState: l, duration: u / c, nextIsBar: h || 'bar' === t.type };
						}),
						(this.makeVoicesArray = function () {
							for (var e = [], t = [], r = {}, n = 0; n < this.engraver.staffgroups.length; n++) {
								var a = this.engraver.staffgroups[n];
								if (a && a.staffs && a.staffs.length > 0)
									for (
										var s = a.staffs[0],
											o = s.absoluteY,
											c = o - s.top * i.STEP,
											l = a.staffs[a.staffs.length - 1],
											h = (o = l.absoluteY) - l.bottom * i.STEP - c,
											u = a.voices,
											d = 0;
										d < u.length;
										d++
									)
										if (!u[d].staff || !u[d].staff.isTabStaff) {
											var f = !1;
											e[d] || (e[d] = []), void 0 === t[d] && (t[d] = 0);
											for (var p = u[d].children, m = 0; m < p.length; m++)
												'tempo' === p[m].type && (r[t[d]] = this.getBpm(p[m].abcelem)),
													e[d].push({ top: c, height: h, line: a.line, measureNumber: t[d], elem: p[m] }),
													'bar' === p[m].type && f && t[d]++,
													('note' !== p[m].type && 'rest' !== p[m].type) || (f = !0);
										}
							}
							return (this.tempoLocations = r), e;
						}),
						(this.setupEvents = function (e, r, n, i) {
							i || (i = 1);
							for (var a, s = [], o = {}, c = e, l = !0, h = this.makeVoicesArray(), u = 0, d = 0; d < h.length; d++) {
								var f = c,
									p = Math.round(1e3 * f),
									m = 0,
									g = -1,
									v = h[d],
									b = n;
								r = (this.getBeatLength() * b) / 60;
								for (var y = -1, x = 0; x < v.length; x++) {
									var w = v[x].measureNumber;
									y !== w &&
										this.tempoLocations[w] &&
										((b = this.tempoLocations[w]), (r = (i * this.getBeatLength() * b) / 60), (y = w));
									var k,
										C = v[x].elem,
										T = this.addElementToEvents(o, C, p, v[x].top, v[x].height, v[x].line, v[x].measureNumber, r, a, l);
									if (
										((a = T.isTiedState),
										(l = T.nextIsBar),
										(f += T.duration),
										C.duration > 0 && o['event' + p] && (k = 'event' + p),
										(p = Math.round(1e3 * f)),
										'bar' === C.type)
									) {
										var _ = C.abcelem.type,
											S = 'bar_right_repeat' === _ || 'bar_dbl_repeat' === _,
											E = '1' === C.abcelem.startEnding,
											M = 'bar_left_repeat' === _ || 'bar_dbl_repeat' === _ || 'bar_right_repeat' === _;
										if (S) {
											x > 0 && (o[k].endX = C.x), -1 === g && (g = x);
											var N = 0;
											y = -1;
											for (var A = m; A < g; A++) {
												y !== (w = v[A].measureNumber) &&
													this.tempoLocations[w] &&
													((b = this.tempoLocations[w]), (r = (i * this.getBeatLength() * b) / 60), (y = w));
												var B = v[A].elem;
												(a = (T = this.addElementToEvents(
													o,
													B,
													p,
													v[A].top,
													v[A].height,
													v[A].line,
													v[A].measureNumber,
													r,
													a,
													l
												)).isTiedState),
													(l = T.nextIsBar),
													(f += T.duration),
													(N = p),
													(p = Math.round(1e3 * f));
											}
											o['event' + N] && (o['event' + N].endX = v[g].elem.x), (l = !0), (g = -1);
										}
										E && (g = x), M && (m = x);
									}
								}
								u = Math.max(u, p);
							}
							return (
								(function (e) {
									for (var t, r, n, i, a = e.length - 1; a >= 0; a--) {
										var s = e[a];
										'bar' === s.type
											? ((s.top = n), (s.nextTop = t), (t = n), (s.bottom = i), (s.nextBottom = r), (r = i))
											: 'event' === s.type && ((n = s.top), (i = s.top + s.height));
									}
								})(
									(s = (function (e) {
										var t = [];
										for (var r in e) e.hasOwnProperty(r) && t.push(e[r]);
										return t.sort(function (e, t) {
											var r = e.milliseconds - t.milliseconds;
											return 0 !== r ? r : 'bar' === e.type ? -1 : 1;
										});
									})(o))
								),
								(function (e, r) {
									if (!(r.length < 1)) {
										for (var n = 0; n < r.length - 1; n++) {
											var i = r[n],
												a = t(r, n + 1);
											if (null !== i.left) {
												var s = a && i.top === a.top ? a.left : e[i.line].staffGroup.w;
												void 0 !== i.endX ? s > i.left && (i.endX = Math.min(i.endX, s)) : (i.endX = s);
											}
										}
										var o = r[r.length - 1];
										o.endX = e[o.line].staffGroup.w;
									}
								})(this.lines, s),
								s.push({ type: 'end', milliseconds: u }),
								this.addUsefulCallbackInfo(s, b * i),
								s
							);
						}),
						(this.addUsefulCallbackInfo = function (e, t) {
							for (var r = this.millisecondsPerMeasure(t), n = 0; n < e.length; n++) e[n].millisecondsPerMeasure = r;
						}),
						(this.getBpm = function (e) {
							var t;
							if (e) {
								t = e.bpm;
								var r = this.getBeatLength();
								t = (t * (e.duration && e.duration.length > 0 ? e.duration[0] : r)) / r;
							}
							if (!t) {
								t = 180;
								var n = this.getMeterFraction();
								n && 3 !== n.num && n.num % 3 == 0 && (t = 120);
							}
							return t;
						}),
						(this.setTiming = function (e, t) {
							if (((t = t || 0), !this.engraver || !this.engraver.staffgroups))
								return (
									console.log('setTiming cannot be called before the tune is drawn.'),
									(this.noteTimings = []),
									this.noteTimings
								);
							var r = this.metaText ? this.metaText.tempo : null,
								n = this.getBpm(r),
								i = 1;
							e ? r && (i = e / n) : (e = n);
							var a = this.getBeatLength(),
								s = e / 60,
								o = ((this.getBarLength() / a) * t) / s;
							o && (o -= this.getPickupLength() / a / s);
							var c = a * s;
							return (
								(this.noteTimings = this.setupEvents(o, c, e, i)),
								this.noteTimings.length > 0
									? ((this.totalTime = this.noteTimings[this.noteTimings.length - 1].milliseconds / 1e3),
									  (this.totalBeats = this.totalTime * s))
									: ((this.totalTime = void 0), (this.totalBeats = void 0)),
								this.noteTimings
							);
						}),
						(this.setUpAudio = function (e) {
							e || (e = {});
							var t = a(this, e);
							return s(t, e, this.formatting.percmap, this.formatting.midi);
						}),
						(this.deline = function (e) {
							return o(this.lines, e);
						});
				};
			},
			351: function (e) {
				function t(e, t) {
					return 'abselem' === e ? 'abselem' : t;
				}
				function r(e, t) {
					(e.el_type = 'meter'), (e.startChar = -1), (e.endChar = -1);
					for (var r = 0; r < t.length; r++) t[r].unshift(e);
				}
				function n(e, t) {
					(e.el_type = 'key'), (e.startChar = -1), (e.endChar = -1);
					for (var r = 0; r < t.length; r++) t[r].unshift(e);
				}
				function i(e, t) {
					(e.el_type = 'clef'), (e.startChar = -1), (e.endChar = -1);
					for (var r = 0; r < t.length; r++) t[r].unshift(e);
				}
				function a(e, t, r) {
					(e.el_type = 'font'), (e.type = r), (e.startChar = -1), (e.endChar = -1);
					for (var n = 0; n < t.length; n++) t[n].unshift(e);
				}
				function s(e, r) {
					return !e || JSON.stringify(e, t) === JSON.stringify(r, t);
				}
				function o(e) {
					for (var t = {}, r = Object.keys(e), n = 0; n < r.length; n++)
						if ('staff' !== r[n]) t[r[n]] = e[r[n]];
						else {
							t.staff = [];
							for (var i = 0; i < e.staff.length; i++) {
								for (var a = {}, s = Object.keys(e.staff[i]), o = 0; o < s.length; o++)
									if ('voices' !== s[o]) a[s[o]] = e.staff[i][s[o]];
									else {
										a.voices = [];
										for (var c = 0; c < e.staff[i].voices.length; c++) a.voices.push([].concat(e.staff[i].voices[c]));
									}
								t.staff.push(a);
							}
						}
					return t;
				}
				e.exports = function (e, t) {
					t || (t = {});
					for (
						var c = !!t.lineBreaks, l = [], h = !1, u = [], d = [], f = [], p = [], m = [], g = [], v = [], b = 0;
						b < e.length;
						b++
					) {
						var y = e[b];
						if (y.staff) {
							if (h && !y.vskip)
								for (var x = l[l.length - 1], w = 0; w < x.staff.length; w++) {
									var k = y.staff[w],
										C = x.staff[w];
									if (
										(k &&
											(s(k.meter, u[w]) || (r(k.meter, k.voices), (u[w] = k.meter), delete k.meter),
											s(k.key, d[w]) || (n(k.key, k.voices), (d[w] = k.key), delete k.key),
											k.title && (C.abbrevTitle = k.title),
											s(k.clef, f[w]) || (i(k.clef, k.voices), (f[w] = k.clef), delete k.clef),
											s(k.vocalfont, p[w]) ||
												(a(k.vocalfont, k.voices, 'vocalfont'), (p[w] = k.vocalfont), delete k.vocalfont),
											s(k.gchordfont, m[w]) ||
												(a(k.gchordfont, k.voices, 'gchordfont'), (m[w] = k.gchordfont), delete k.gchordfont),
											s(k.tripletfont, g[w]) ||
												(a(k.tripletfont, k.voices, 'tripletfont'), (g[w] = k.tripletfont), delete k.tripletfont),
											s(k.annotationfont, v[w]) ||
												(a(k.annotationfont, k.voices, 'annotationfont'),
												(v[w] = k.annotationfont),
												delete k.annotationfont)),
										k)
									)
										for (var T = 0; T < C.voices.length; T++) {
											var _ = C.voices[T],
												S = k.voices[T];
											c && _.push({ el_type: 'break' }), S && (C.voices[T] = _.concat(S));
										}
								}
							else {
								for (var E = 0; E < y.staff.length; E++)
									(d[E] = y.staff[E].key), (u[E] = y.staff[E].meter), (f[E] = y.staff[E].clef);
								l.push(o(y));
							}
							h = !0;
						} else (h = !1), l.push(y);
					}
					return l;
				};
			},
			2945: function (e) {
				try {
					if ('function' != typeof window.CustomEvent) {
						var t = function (e, t) {
							t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
							var r = document.createEvent('CustomEvent');
							return r.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), r;
						};
						(t.prototype = window.Event.prototype), (window.CustomEvent = t);
					}
				} catch (e) {}
				var r = function (e) {
					(this.textarea = document.getElementById(e)),
						(this.initialText = this.textarea.value),
						(this.isDragging = !1);
				};
				(r.prototype.addSelectionListener = function (e) {
					this.textarea.onmousemove = function (t) {
						this.isDragging && e.fireSelectionChanged();
					};
				}),
					(r.prototype.addChangeListener = function (e) {
						(this.changelistener = e),
							(this.textarea.onkeyup = function () {
								e.fireChanged();
							}),
							(this.textarea.onmousedown = function () {
								(this.isDragging = !0), e.fireSelectionChanged();
							}),
							(this.textarea.onmouseup = function () {
								(this.isDragging = !1), e.fireChanged();
							}),
							(this.textarea.onchange = function () {
								e.fireChanged();
							});
					}),
					(r.prototype.getSelection = function () {
						return { start: this.textarea.selectionStart, end: this.textarea.selectionEnd };
					}),
					(r.prototype.setSelection = function (e, t) {
						if (this.textarea.setSelectionRange) this.textarea.setSelectionRange(e, t);
						else if (this.textarea.createTextRange) {
							var r = this.textarea.createTextRange();
							r.collapse(!0), r.moveEnd('character', t), r.moveStart('character', e), r.select();
						}
						this.textarea.focus();
					}),
					(r.prototype.getString = function () {
						return this.textarea.value;
					}),
					(r.prototype.setString = function (e) {
						(this.textarea.value = e),
							(this.initialText = this.getString()),
							this.changelistener && this.changelistener.fireChanged();
					}),
					(r.prototype.getElem = function () {
						return this.textarea;
					}),
					(e.exports = r);
			},
			5294: function (e, t, r) {
				var n = r(5008),
					i = r(3450),
					a = r(5049),
					s = r(6859),
					o = r(2945),
					c = function (e, t) {
						(this.abcjsParams = (function (e) {
							var t,
								r = {};
							if (e.abcjsParams) for (t in e.abcjsParams) e.abcjsParams.hasOwnProperty(t) && (r[t] = e.abcjsParams[t]);
							if (e.midi_options)
								for (t in e.midi_options) e.midi_options.hasOwnProperty(t) && (r[t] = e.midi_options[t]);
							if (e.parser_options)
								for (t in e.parser_options) e.parser_options.hasOwnProperty(t) && (r[t] = e.parser_options[t]);
							if (e.render_options)
								for (t in e.render_options) e.render_options.hasOwnProperty(t) && (r[t] = e.render_options[t]);
							return r.tablature && e.warnings_id && (r.tablature.warnings_id = e.warnings_id), r;
						})(t)),
							t.indicate_changed && (this.indicate_changed = !0),
							(this.editarea = 'string' == typeof e ? new o(e) : e),
							this.editarea.addSelectionListener(this),
							this.editarea.addChangeListener(this),
							t.canvas_id
								? (this.div = t.canvas_id)
								: t.paper_id
								? (this.div = t.paper_id)
								: ((this.div = document.createElement('DIV')),
								  this.editarea.getElem().parentNode.insertBefore(this.div, this.editarea.getElem())),
							'string' == typeof this.div && (this.div = document.getElementById(this.div)),
							t.selectionChangeCallback && (this.selectionChangeCallback = t.selectionChangeCallback),
							(this.clientClickListener = this.abcjsParams.clickListener),
							(this.abcjsParams.clickListener = this.highlight.bind(this)),
							t.synth &&
								a() &&
								(this.synth = { el: t.synth.el, cursorControl: t.synth.cursorControl, options: t.synth.options }),
							t.generate_midi &&
								((this.generate_midi = t.generate_midi),
								this.abcjsParams.generateDownload &&
									('string' == typeof t.midi_download_id
										? (this.downloadMidi = document.getElementById(t.midi_download_id))
										: t.midi_download_id && (this.downloadMidi = t.midi_download_id)),
								!1 !== this.abcjsParams.generateInline &&
									('string' == typeof t.midi_id
										? (this.inlineMidi = document.getElementById(t.midi_id))
										: t.midi_id && (this.inlineMidi = t.midi_id))),
							t.warnings_id
								? 'string' == typeof t.warnings_id
									? (this.warningsdiv = document.getElementById(t.warnings_id))
									: (this.warningsdiv = t.warnings_id)
								: t.generate_warnings &&
								  ((this.warningsdiv = document.createElement('div')),
								  this.div.parentNode.insertBefore(this.warningsdiv, this.div)),
							(this.onchangeCallback = t.onchange),
							(this.currentAbc = ''),
							(this.tunes = []),
							(this.bReentry = !1),
							this.parseABC(),
							this.modelChanged(),
							(this.addClassName = function (e, t) {
								return (
									(function (e, t) {
										var r = e.className;
										return r.length > 0 && (r === t || new RegExp('(^|\\s)' + t + '(\\s|$)').test(r));
									})(e, t) || (e.className += (e.className ? ' ' : '') + t),
									e
								);
							}),
							(this.removeClassName = function (e, t) {
								return (e.className = n.strip(e.className.replace(new RegExp('(^|\\s+)' + t + '(\\s+|$)'), ' '))), e;
							}),
							(this.setReadOnly = function (e) {
								var t = 'abc_textarea_readonly',
									r = this.editarea.getElem();
								e
									? (r.setAttribute('readonly', 'yes'), this.addClassName(r, t))
									: (r.removeAttribute('readonly'), this.removeClassName(r, t));
							});
					};
				(c.prototype.redrawMidi = function () {
					if (this.generate_midi && !this.midiPause) {
						var e = new window.CustomEvent('generateMidi', {
							detail: {
								tunes: this.tunes,
								abcjsParams: this.abcjsParams,
								downloadMidiEl: this.downloadMidi,
								inlineMidiEl: this.inlineMidi,
								engravingEl: this.div
							}
						});
						window.dispatchEvent(e);
					}
					if (this.synth) {
						var t = this.synth.synthControl;
						this.synth.synthControl ||
							((this.synth.synthControl = new i()),
							this.synth.synthControl.load(this.synth.el, this.synth.cursorControl, this.synth.options)),
							this.synth.synthControl.setTune(this.tunes[0], t, this.synth.options);
					}
				}),
					(c.prototype.modelChanged = function () {
						if (!this.bReentry) {
							this.bReentry = !0;
							try {
								(this.timerId = null),
									this.synth && this.synth.synthControl && this.synth.synthControl.disable(!0),
									(this.tunes = s(this.div, this.currentAbc, this.abcjsParams)),
									this.tunes.length > 0 && (this.warnings = this.tunes[0].warnings),
									this.redrawMidi();
							} catch (e) {
								console.error('ABCJS error: ', e), this.warnings || (this.warnings = []), this.warnings.push(e.message);
							}
							this.warningsdiv &&
								(this.warningsdiv.innerHTML = this.warnings ? this.warnings.join('<br />') : 'No errors'),
								this.updateSelection(),
								(this.bReentry = !1);
						}
					}),
					(c.prototype.paramChanged = function (e) {
						if (e) for (var t in e) e.hasOwnProperty(t) && (this.abcjsParams[t] = e[t]);
						(this.currentAbc = ''), this.fireChanged();
					}),
					(c.prototype.synthParamChanged = function (e) {
						if (this.synth) {
							if (((this.synth.options = {}), e))
								for (var t in e) e.hasOwnProperty(t) && (this.synth.options[t] = e[t]);
							(this.currentAbc = ''), this.fireChanged();
						}
					}),
					(c.prototype.parseABC = function () {
						var e = this.editarea.getString();
						return e === this.currentAbc ? (this.updateSelection(), !1) : ((this.currentAbc = e), !0);
					}),
					(c.prototype.updateSelection = function () {
						var e = this.editarea.getSelection();
						try {
							this.tunes.length > 0 && this.tunes[0].engraver && this.tunes[0].engraver.rangeHighlight(e.start, e.end);
						} catch (e) {}
						this.selectionChangeCallback && this.selectionChangeCallback(e.start, e.end);
					}),
					(c.prototype.fireSelectionChanged = function () {
						this.updateSelection();
					}),
					(c.prototype.setDirtyStyle = function (e) {
						if (void 0 !== this.indicate_changed) {
							var t,
								r,
								i = 'abc_textarea_dirty',
								a = this.editarea.getElem();
							e
								? (function (e, t) {
										var r = e.className;
										return r.length > 0 && (r === t || new RegExp('(^|\\s)' + t + '(\\s|$)').test(r));
								  })((t = a), (r = i)) || (t.className += (t.className ? ' ' : '') + r)
								: (function (e, t) {
										e.className = n.strip(e.className.replace(new RegExp('(^|\\s+)' + t + '(\\s+|$)'), ' '));
								  })(a, i);
						}
					}),
					(c.prototype.fireChanged = function () {
						if (!this.bIsPaused && this.parseABC()) {
							var e = this;
							this.timerId && clearTimeout(this.timerId),
								(this.timerId = setTimeout(function () {
									e.modelChanged();
								}, 300));
							var t = this.isDirty();
							this.wasDirty !== t && ((this.wasDirty = t), this.setDirtyStyle(t)),
								this.onchangeCallback && this.onchangeCallback(this);
						}
					}),
					(c.prototype.setNotDirty = function () {
						(this.editarea.initialText = this.editarea.getString()), (this.wasDirty = !1), this.setDirtyStyle(!1);
					}),
					(c.prototype.isDirty = function () {
						return void 0 !== this.indicate_changed && this.editarea.initialText !== this.editarea.getString();
					}),
					(c.prototype.highlight = function (e, t, r, n, i, a) {
						this.editarea.setSelection(e.startChar, e.endChar),
							this.selectionChangeCallback && this.selectionChangeCallback(e.startChar, e.endChar),
							this.clientClickListener && this.clientClickListener(e, t, r, n, i, a);
					}),
					(c.prototype.pause = function (e) {
						(this.bIsPaused = e), e || this.fireChanged();
					}),
					(c.prototype.millisecondsPerMeasure = function () {
						return this.synth && this.synth.synthControl && this.synth.synthControl.visualObj
							? this.synth.synthControl.visualObj.millisecondsPerMeasure()
							: 0;
					}),
					(c.prototype.pauseMidi = function (e) {
						(this.midiPause = e), e || this.redrawMidi();
					}),
					(e.exports = c);
			},
			3284: function (e, t, r) {
				var n,
					i = r(9991);
				!(function () {
					'use strict';
					function e(e, t, r) {
						for (var n = Object.keys(t), i = 0; i < n.length; i++) n[i] = parseFloat(n[i]);
						n.sort(function (e, t) {
							return e - t;
						});
						for (var a = 0, s = 0; s < n.length; s++) {
							var o = t[n[s]];
							if (n[s] > a) {
								var c = (n[s] - a) * r;
								e.addRest(c), (a = n[s]);
							}
							for (var l = 0; l < o.length; l++) {
								var h = o[l];
								h.volume ? e.startNote(h.pitch, h.volume, h.cents) : e.endNote(h.pitch);
							}
						}
					}
					n = function (t, r) {
						void 0 === r && (r = {});
						var n = t.setUpAudio(r),
							a = i(),
							s = t.metaText ? t.metaText.title : void 0;
						s && s.length > 128 && (s = s.substring(0, 124) + '...');
						var o = t.getKeySignature(),
							c = t.getMeterFraction(),
							l = n.tempo / 60;
						a.setGlobalInfo(n.tempo, s, o, c);
						for (var h = 0; h < n.tracks.length; h++) {
							a.startTrack();
							for (var u = {}, d = 0; d < n.tracks[h].length; d++) {
								var f = n.tracks[h][d];
								switch (f.cmd) {
									case 'text':
										a.setText(f.type, f.text);
										break;
									case 'program':
										var p = 0;
										r.pan && r.pan.length > h && (p = r.pan[h]),
											128 === f.instrument
												? (a.setChannel(9, p), a.setInstrument(0))
												: (a.setChannel(f.channel, p), a.setInstrument(f.instrument));
										break;
									case 'note':
										var m = f.gap * l,
											g = f.start,
											v = g + f.duration - m;
										u[g] || (u[g] = []),
											u[g].push({ pitch: f.pitch, volume: f.volume, cents: f.cents }),
											u[v] || (u[v] = []),
											u[v].push({ pitch: f.pitch, volume: 0 });
										break;
									default:
										console.log('MIDI create Unknown: ' + f.cmd);
								}
							}
							e(a, u, 1920), a.endTrack();
						}
						return a.getData();
					};
				})(),
					(e.exports = n);
			},
			5008: function (e) {
				var t = {
					clone: function (e) {
						var t = {};
						for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
						return t;
					},
					cloneArray: function (e) {
						for (var r = [], n = 0; n < e.length; n++) r.push(t.clone(e[n]));
						return r;
					},
					cloneHashOfHash: function (e) {
						var r = {};
						for (var n in e) e.hasOwnProperty(n) && (r[n] = t.clone(e[n]));
						return r;
					},
					cloneHashOfArrayOfHash: function (e) {
						var r = {};
						for (var n in e) e.hasOwnProperty(n) && (r[n] = t.cloneArray(e[n]));
						return r;
					},
					strip: function (e) {
						return e.replace(/^\s+/, '').replace(/\s+$/, '');
					},
					startsWith: function (e, t) {
						return 0 === e.indexOf(t);
					},
					endsWith: function (e, t) {
						var r = e.length - t.length;
						return r >= 0 && e.lastIndexOf(t) === r;
					},
					last: function (e) {
						return 0 === e.length ? null : e[e.length - 1];
					}
				};
				e.exports = t;
			},
			8905: function (e, t, r) {
				var n = r(5008),
					i = r(8360),
					a = r(9928),
					s = r(6476),
					o = r(1881),
					c = r(1756),
					l = r(6780),
					h = r(575);
				e.exports = function () {
					'use strict';
					var e,
						t = new l(),
						r = new h(t),
						u = '',
						d = '';
					function f(e, t, r) {
						e.positioning || (e.positioning = {}), (e.positioning[t] = r);
					}
					function p(e, t, r) {
						e.fonts || (e.fonts = {}), (e.fonts[t] = r);
					}
					this.getTune = function () {
						var e = {
							formatting: t.formatting,
							lines: t.lines,
							media: t.media,
							metaText: t.metaText,
							metaTextInfo: t.metaTextInfo,
							version: t.version,
							addElementToEvents: t.addElementToEvents,
							addUsefulCallbackInfo: t.addUsefulCallbackInfo,
							getTotalTime: t.getTotalTime,
							getTotalBeats: t.getTotalBeats,
							getBarLength: t.getBarLength,
							getBeatLength: t.getBeatLength,
							getBeatsPerMeasure: t.getBeatsPerMeasure,
							getBpm: t.getBpm,
							getMeter: t.getMeter,
							getMeterFraction: t.getMeterFraction,
							getPickupLength: t.getPickupLength,
							getKeySignature: t.getKeySignature,
							getElementFromChar: t.getElementFromChar,
							makeVoicesArray: t.makeVoicesArray,
							millisecondsPerMeasure: t.millisecondsPerMeasure,
							setupEvents: t.setupEvents,
							setTiming: t.setTiming,
							setUpAudio: t.setUpAudio,
							deline: t.deline
						};
						return (
							t.lineBreaks && (e.lineBreaks = t.lineBreaks),
							t.visualTranspose && (e.visualTranspose = t.visualTranspose),
							e
						);
					};
					var m,
						g,
						v = {
							reset: function () {
								for (var e in this) this.hasOwnProperty(e) && 'function' != typeof this[e] && delete this[e];
								(this.iChar = 0),
									(this.key = { accidentals: [], root: 'none', acc: '', mode: '' }),
									(this.meter = null),
									(this.origMeter = null),
									(this.hasMainTitle = !1),
									(this.default_length = 0.125),
									(this.clef = { type: 'treble', verticalPos: 0 }),
									(this.octave = 0),
									(this.next_note_duration = 0),
									(this.start_new_line = !0),
									(this.is_in_header = !0),
									(this.partForNextLine = {}),
									(this.tempoForNextLine = []),
									(this.havent_set_length = !0),
									(this.voices = {}),
									(this.staves = []),
									(this.macros = {}),
									(this.currBarNumber = 1),
									(this.barCounter = {}),
									(this.ignoredDecorations = []),
									(this.score_is_present = !1),
									(this.inEnding = !1),
									(this.inTie = []),
									(this.inTieChord = {}),
									(this.vocalPosition = 'auto'),
									(this.dynamicPosition = 'auto'),
									(this.chordPosition = 'auto'),
									(this.ornamentPosition = 'auto'),
									(this.volumePosition = 'auto'),
									(this.openSlurs = []),
									(this.freegchord = !1),
									(this.endingHoldOver = {});
							},
							differentFont: function (e, t) {
								return (
									this[e].decoration !== t[e].decoration ||
									this[e].face !== t[e].face ||
									this[e].size !== t[e].size ||
									this[e].style !== t[e].style ||
									this[e].weight !== t[e].weight
								);
							},
							addFormattingOptions: function (e, t, r) {
								'note' === r
									? ('auto' !== this.vocalPosition && f(e, 'vocalPosition', this.vocalPosition),
									  'auto' !== this.dynamicPosition && f(e, 'dynamicPosition', this.dynamicPosition),
									  'auto' !== this.chordPosition && f(e, 'chordPosition', this.chordPosition),
									  'auto' !== this.ornamentPosition && f(e, 'ornamentPosition', this.ornamentPosition),
									  'auto' !== this.volumePosition && f(e, 'volumePosition', this.volumePosition),
									  this.differentFont('annotationfont', t) && p(e, 'annotationfont', this.annotationfont),
									  this.differentFont('gchordfont', t) && p(e, 'gchordfont', this.gchordfont),
									  this.differentFont('vocalfont', t) && p(e, 'vocalfont', this.vocalfont),
									  this.differentFont('tripletfont', t) && p(e, 'tripletfont', this.tripletfont))
									: 'bar' === r &&
									  ('auto' !== this.dynamicPosition && f(e, 'dynamicPosition', this.dynamicPosition),
									  'auto' !== this.chordPosition && f(e, 'chordPosition', this.chordPosition),
									  'auto' !== this.ornamentPosition && f(e, 'ornamentPosition', this.ornamentPosition),
									  'auto' !== this.volumePosition && f(e, 'volumePosition', this.volumePosition),
									  this.differentFont('measurefont', t) && p(e, 'measurefont', this.measurefont),
									  this.differentFont('repeatfont', t) && p(e, 'repeatfont', this.repeatfont));
							},
							duplicateStartEndingHoldOvers: function () {
								this.endingHoldOver = { inTie: [], inTieChord: {} };
								for (var e = 0; e < this.inTie.length; e++)
									if ((this.endingHoldOver.inTie.push([]), this.inTie[e]))
										for (var t = 0; t < this.inTie[e].length; t++) this.endingHoldOver.inTie[e].push(this.inTie[e][t]);
								for (var r in this.inTieChord)
									this.inTieChord.hasOwnProperty(r) && (this.endingHoldOver.inTieChord[r] = this.inTieChord[r]);
							},
							restoreStartEndingHoldOvers: function () {
								if (this.endingHoldOver.inTie) {
									(this.inTie = []), (this.inTieChord = {});
									for (var e = 0; e < this.endingHoldOver.inTie.length; e++) {
										this.inTie.push([]);
										for (var t = 0; t < this.endingHoldOver.inTie[e].length; t++)
											this.inTie[e].push(this.endingHoldOver.inTie[e][t]);
									}
									for (var r in this.endingHoldOver.inTieChord)
										this.endingHoldOver.inTieChord.hasOwnProperty(r) &&
											(this.inTieChord[r] = this.endingHoldOver.inTieChord[r]);
								}
							}
						},
						b = function (e) {
							var t = e.replace(/\x12/g, ' ');
							return (t = (t = t.replace(/&/g, '&amp;')).replace(/</g, '&lt;')).replace(/>/g, '&gt;');
						},
						y = function (t, r, n) {
							r || (r = ' ');
							var i = r[n];
							(' ' !== i && i) || (i = 'SPACE');
							var a,
								s =
									b(r.substring(n - 64, n)) +
									'<span style="text-decoration:underline;font-size:1.3em;font-weight:bold;">' +
									i +
									'</span>' +
									b(r.substring(n + 1).substring(0, 64));
							!(function (e) {
								v.warnings || (v.warnings = []), v.warnings.push(e);
							})('Music Line:' + e.lineIndex + ':' + (n + 1) + ': ' + t + ':  ' + s),
								(a = { message: t, line: r, startChar: v.iChar + n, column: n }),
								v.warningObjects || (v.warningObjects = []),
								v.warningObjects.push(a);
						};
					(this.getWarnings = function () {
						return v.warnings;
					}),
						(this.getWarningObjects = function () {
							return v.warningObjects;
						});
					var x = function (t, r) {
							if (r.indexOf('') >= 0) u += r;
							else if (((r = u + r), (u = ''), t)) {
								'-' !== (r = n.strip(r))[r.length - 1] && (r += ' ');
								for (
									var i = [],
										a = 0,
										s = !1,
										o = function (t) {
											var o = n.strip(r.substring(a, t));
											if (((o = o.replace(/\\([-_*|~])/g, '$1')), (a = t + 1), o.length > 0)) {
												s && (o = o.replace(/~/g, ' '));
												var c = r[t];
												return (
													'_' !== c && '-' !== c && (c = ' '),
													i.push({ syllable: e.translateString(o), divider: c }),
													(s = !1),
													!0
												);
											}
											return !1;
										},
										c = !1,
										l = 0;
									l < r.length;
									l++
								) {
									switch (r[l]) {
										case ' ':
										case '':
											o(l);
											break;
										case '-':
											!c && !o(l) && i.length > 0 && ((n.last(i).divider = '-'), i.push({ skip: !0, to: 'next' }));
											break;
										case '_':
											c || (o(l), i.push({ skip: !0, to: 'slur' }));
											break;
										case '*':
											c || (o(l), i.push({ skip: !0, to: 'next' }));
											break;
										case '|':
											c || (o(l), i.push({ skip: !0, to: 'bar' }));
											break;
										case '~':
											c || (s = !0);
									}
									c = '\\' === r[l];
								}
								t.forEach(function (e) {
									if (0 !== i.length)
										if (i[0].skip) {
											switch (i[0].to) {
												case 'next':
												case 'slur':
													'note' === e.el_type && null !== e.pitches && i.shift();
													break;
												case 'bar':
													'bar' === e.el_type && i.shift();
											}
											'bar' !== e.el_type &&
												(void 0 === e.lyric
													? (e.lyric = [{ syllable: '', divider: ' ' }])
													: e.lyric.push({ syllable: '', divider: ' ' }));
										} else if ('note' === e.el_type && void 0 === e.rest) {
											var t = i.shift();
											t.syllable && (t.syllable = t.syllable.replace(/ +/g, ' ')),
												void 0 === e.lyric ? (e.lyric = [t]) : e.lyric.push(t);
										}
								});
							} else y("Can't add words before the first line of music", t, 0);
						},
						w = function (t, r) {
							if (r.indexOf('') >= 0) d += r;
							else if (((r = d + r), (d = ''), t)) {
								'-' !== (r = n.strip(r))[r.length - 1] && (r += ' ');
								for (
									var i = [],
										a = 0,
										s = !1,
										o = function (t) {
											var o = n.strip(r.substring(a, t));
											if (((a = t + 1), o.length > 0)) {
												s && (o = o.replace(/~/g, ' '));
												var c = r[t];
												return (
													'_' !== c && '-' !== c && (c = ' '),
													i.push({ syllable: e.translateString(o), divider: c }),
													(s = !1),
													!0
												);
											}
											return !1;
										},
										c = 0;
									c < r.length;
									c++
								)
									switch (r[c]) {
										case ' ':
										case '':
											o(c);
											break;
										case '-':
											!o(c) && i.length > 0 && ((n.last(i).divider = '-'), i.push({ skip: !0, to: 'next' }));
											break;
										case '_':
											o(c), i.push({ skip: !0, to: 'slur' });
											break;
										case '*':
											o(c), i.push({ skip: !0, to: 'next' });
											break;
										case '|':
											o(c), i.push({ skip: !0, to: 'bar' });
											break;
										case '~':
											s = !0;
									}
								t.forEach(function (e) {
									if (0 !== i.length)
										if (i[0].skip)
											switch (i[0].to) {
												case 'next':
												case 'slur':
													'note' === e.el_type && null !== e.pitches && i.shift();
													break;
												case 'bar':
													'bar' === e.el_type && i.shift();
											}
										else if ('note' === e.el_type && void 0 === e.rest) {
											var t = i.shift();
											void 0 === e.lyric ? (e.lyric = [t]) : e.lyric.push(t);
										}
								});
							} else y("Can't add symbols before the first line of music", t, 0);
						},
						k = function (e) {
							if (n.startsWith(e, '%%')) {
								var t = i.addDirective(e.substring(2));
								t && y(t, e, 2);
							} else {
								var a = e.indexOf('%');
								if ((a >= 0 && (e = e.substring(0, a)), 0 !== (e = e.replace(/\s+$/, '')).length))
									if (u) x(r.getCurrentVoice(), e.substring(2));
									else if (d) w(r.getCurrentVoice(), e.substring(2));
									else if (e.length < 2 || ':' !== e[1] || g.lineContinuation) g.parseMusic(e);
									else {
										var s = m.parseHeader(e);
										s.regular && g.parseMusic(e),
											s.newline && g.startNewLine(),
											s.words && x(r.getCurrentVoice(), e.substring(2)),
											s.symbols && w(r.getCurrentVoice(), e.substring(2));
									}
							}
						};
					function C(e, t) {
						e.push({ el_type: 'hint' });
						for (var r = 0; r < t.length; r++) {
							var i = t[r],
								a = n.clone(i);
							if ((e.push(a), 'bar' === i.el_type)) return;
						}
					}
					function T(e, t) {
						for (var r = 0; r < e.length; r++) {
							var n = e[r],
								i = t[r];
							if (i)
								for (var a = 0; a < i.voices.length; a++) {
									var s = i.voices[a],
										o = n.voices[a];
									o && C(o, s);
								}
						}
					}
					this.parse = function (l, h, f) {
						h || (h = {}), f || (f = 0), t.reset();
						var p = (l = l.replace(/\r\n?/g, '\n') + '\n').split('\n\\');
						if (p.length > 1) {
							for (var b = 1; b < p.length; b++)
								for (; p[b].length > 0 && '\n' !== p[b][0]; ) (p[b] = p[b].substr(1)), (p[b - 1] += ' ');
							l = p.join('  ');
						}
						var C = (l = l.replace(/\\([ \t]*)(%.*)*\n/g, function (e, t, r) {
							return t + '' + (r ? Array(r.length + 1).join(' ') : '') + '\n';
						})).split('\n');
						0 === n.last(C).length && C.pop(),
							(e = new o(C, v)),
							(m = new a(e, y, v, t, r)),
							(g = new s(e, y, v, t, r, m)),
							h.print && (t.media = 'print'),
							v.reset(),
							(v.iChar = f),
							h.visualTranspose
								? ((v.globalTranspose = parseInt(h.visualTranspose)),
								  0 === v.globalTranspose ? (v.globalTranspose = void 0) : r.setVisualTranspose(h.visualTranspose))
								: (v.globalTranspose = void 0),
							h.lineBreaks && (v.lineBreaks = h.lineBreaks),
							m.reset(e, y, v, t);
						try {
							h.format && i.globalFormatting(h.format);
							for (var _ = e.nextLine(); _; ) {
								if (h.header_only && !1 === v.is_in_header) throw 'normal_abort';
								if (h.stop_on_warning && v.warnings) throw 'normal_abort';
								var S = v.is_in_header;
								k(_),
									S &&
										!v.is_in_header &&
										(r.setRunningFont('annotationfont', v.annotationfont),
										r.setRunningFont('gchordfont', v.gchordfont),
										r.setRunningFont('tripletfont', v.tripletfont),
										r.setRunningFont('vocalfont', v.vocalfont)),
									(_ = e.nextLine());
							}
							u && x(r.getCurrentVoice(), ''),
								d && w(r.getCurrentVoice(), ''),
								(v.openSlurs = r.cleanUp(v.barsperstaff, v.staffnonote, v.openSlurs));
						} catch (e) {
							if ('normal_abort' !== e) throw e;
						}
						var E = 792,
							M = 612;
						switch (v.papersize) {
							case 'legal':
								(E = 1008), (M = 612);
								break;
							case 'A4':
								(E = 842.4), (M = 597.6);
						}
						if (v.landscape) {
							var N = E;
							(E = M), (M = N);
						}
						t.formatting.pagewidth || (t.formatting.pagewidth = M),
							t.formatting.pageheight || (t.formatting.pageheight = E),
							h.hint_measures &&
								(function () {
									for (var e = 0; e < t.lines.length; e++) {
										var r = t.lines[e].staff;
										if (r) {
											for (var n = e + 1; n < t.lines.length && void 0 === t.lines[n].staff; ) n++;
											n < t.lines.length && T(r, t.lines[n].staff);
										}
									}
								})(),
							c.wrapLines(t, v.lineBreaks, v.barNumbers);
					};
				};
			},
			9565: function (e, t, r) {
				var n = r(5008);
				e.exports = function (e) {
					'use strict';
					for (var t = '', r = e.match(/(\s*)/), i = (e = n.strip(e)).split('\nX:'), a = 1; a < i.length; a++)
						i[a] = 'X:' + i[a];
					var s = r ? r[0].length : 0,
						o = [];
					i.forEach(function (e) {
						o.push({ abc: e, startPos: s }), (s += e.length + 1);
					}),
						o.length > 1 &&
							!n.startsWith(o[0].abc, 'X:') &&
							o
								.shift()
								.abc.split('\n')
								.forEach(function (e) {
									n.startsWith(e, '%%') && (t += e + '\n');
								});
					var c = t;
					return (
						o.forEach(function (e) {
							var r = e.abc.indexOf('\n\n');
							r > 0 && (e.abc = e.abc.substring(0, r)), (e.pure = e.abc), (e.abc = t + e.abc), (e.title = '');
							var i = e.pure.split('T:');
							i.length > 1 && ((i = i[1].split('\n')), (e.title = n.strip(i[0])));
							var a = e.pure.substring(2, e.pure.indexOf('\n'));
							e.id = n.strip(a);
						}),
						{ header: c, tunes: o }
					);
				};
			},
			8360: function (e, t, r) {
				var n = r(5008),
					i = {};
				!(function () {
					'use strict';
					var e, t, r, a, s;
					i.initialize = function (n, i, o, c, l) {
						(e = n),
							(t = i),
							(a = c),
							(s = l),
							((r = o).annotationfont = {
								face: 'Helvetica',
								size: 12,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(r.gchordfont = { face: 'Helvetica', size: 12, weight: 'normal', style: 'normal', decoration: 'none' }),
							(r.historyfont = {
								face: '"Times New Roman"',
								size: 16,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(r.infofont = {
								face: '"Times New Roman"',
								size: 14,
								weight: 'normal',
								style: 'italic',
								decoration: 'none'
							}),
							(r.measurefont = {
								face: '"Times New Roman"',
								size: 14,
								weight: 'normal',
								style: 'italic',
								decoration: 'none'
							}),
							(r.partsfont = {
								face: '"Times New Roman"',
								size: 15,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(r.repeatfont = {
								face: '"Times New Roman"',
								size: 13,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(r.textfont = {
								face: '"Times New Roman"',
								size: 16,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(r.tripletfont = { face: 'Times', size: 11, weight: 'normal', style: 'italic', decoration: 'none' }),
							(r.vocalfont = {
								face: '"Times New Roman"',
								size: 13,
								weight: 'bold',
								style: 'normal',
								decoration: 'none'
							}),
							(r.wordsfont = {
								face: '"Times New Roman"',
								size: 16,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(a.formatting.composerfont = {
								face: '"Times New Roman"',
								size: 14,
								weight: 'normal',
								style: 'italic',
								decoration: 'none'
							}),
							(a.formatting.subtitlefont = {
								face: '"Times New Roman"',
								size: 16,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(a.formatting.tempofont = {
								face: '"Times New Roman"',
								size: 15,
								weight: 'bold',
								style: 'normal',
								decoration: 'none'
							}),
							(a.formatting.titlefont = {
								face: '"Times New Roman"',
								size: 20,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(a.formatting.footerfont = {
								face: '"Times New Roman"',
								size: 12,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(a.formatting.headerfont = {
								face: '"Times New Roman"',
								size: 12,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(a.formatting.voicefont = {
								face: '"Times New Roman"',
								size: 13,
								weight: 'bold',
								style: 'normal',
								decoration: 'none'
							}),
							(a.formatting.tablabelfont = {
								face: '"Trebuchet MS"',
								size: 16,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(a.formatting.tabnumberfont = {
								face: '"Arial"',
								size: 11,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(a.formatting.tabgracefont = {
								face: '"Arial"',
								size: 8,
								weight: 'normal',
								style: 'normal',
								decoration: 'none'
							}),
							(a.formatting.annotationfont = r.annotationfont),
							(a.formatting.gchordfont = r.gchordfont),
							(a.formatting.historyfont = r.historyfont),
							(a.formatting.infofont = r.infofont),
							(a.formatting.measurefont = r.measurefont),
							(a.formatting.partsfont = r.partsfont),
							(a.formatting.repeatfont = r.repeatfont),
							(a.formatting.textfont = r.textfont),
							(a.formatting.tripletfont = r.tripletfont),
							(a.formatting.vocalfont = r.vocalfont),
							(a.formatting.wordsfont = r.wordsfont);
					};
					var o = {
							gchordfont: !0,
							measurefont: !0,
							partsfont: !0,
							annotationfont: !0,
							composerfont: !0,
							historyfont: !0,
							infofont: !0,
							subtitlefont: !0,
							textfont: !0,
							titlefont: !0,
							voicefont: !0
						},
						c = function (e, r, n, i, a) {
							function s() {
								var s = parseInt(e[0].token);
								return (
									e.shift(),
									r
										? 0 === e.length
											? { face: r.face, weight: r.weight, style: r.style, decoration: r.decoration, size: s }
											: 1 === e.length && 'box' === e[0].token && o[a]
											? { face: r.face, weight: r.weight, style: r.style, decoration: r.decoration, size: s, box: !0 }
											: (t('Extra parameters in font definition.', n, i),
											  { face: r.face, weight: r.weight, style: r.style, decoration: r.decoration, size: s })
										: (t("Can't set just the size of the font since there is no default value.", n, i),
										  { face: '"Times New Roman"', weight: 'normal', style: 'normal', decoration: 'none', size: s })
								);
							}
							if ('*' === e[0].token) {
								if ((e.shift(), 'number' === e[0].type)) return s();
								t('Expected font size number after *.', n, i);
							}
							if ('number' === e[0].type) return s();
							for (var c, l = [], h = 'normal', u = 'normal', d = 'none', f = !1, p = 'face', m = !1; e.length; ) {
								var g = e.shift(),
									v = g.token.toLowerCase();
								switch (p) {
									case 'face':
										m ||
										('utf' !== v &&
											'number' !== g.type &&
											'bold' !== v &&
											'italic' !== v &&
											'underline' !== v &&
											'box' !== v)
											? l.length > 0 && '-' === g.token
												? ((m = !0), (l[l.length - 1] = l[l.length - 1] + g.token))
												: m
												? ((m = !1), (l[l.length - 1] = l[l.length - 1] + g.token))
												: l.push(g.token)
											: 'number' === g.type
											? (c ? t('Font size specified twice in font definition.', n, i) : (c = g.token), (p = 'modifier'))
											: 'bold' === v
											? (h = 'bold')
											: 'italic' === v
											? (u = 'italic')
											: 'underline' === v
											? (d = 'underline')
											: 'box' === v
											? (o[a] ? (f = !0) : t('This font style doesn\'t support "box"', n, i), (p = 'finished'))
											: 'utf' === v
											? ((g = e.shift()), (p = 'size'))
											: t('Unknown parameter ' + g.token + ' in font definition.', n, i);
										break;
									case 'size':
										'number' === g.type
											? c
												? t('Font size specified twice in font definition.', n, i)
												: (c = g.token)
											: t('Expected font size in font definition.', n, i),
											(p = 'modifier');
										break;
									case 'modifier':
										'bold' === v
											? (h = 'bold')
											: 'italic' === v
											? (u = 'italic')
											: 'underline' === v
											? (d = 'underline')
											: 'box' === v
											? (o[a] ? (f = !0) : t('This font style doesn\'t support "box"', n, i), (p = 'finished'))
											: t('Unknown parameter ' + g.token + ' in font definition.', n, i);
										break;
									case 'finished':
										t('Extra characters found after "box" in font definition.', n, i);
								}
							}
							void 0 === c
								? r
									? (c = r.size)
									: (t('Must specify the size of the font since there is no default value.', n, i), (c = 12))
								: (c = parseFloat(c)),
								'' === (l = l.join(' ')) &&
									(r
										? (l = r.face)
										: (t('Must specify the name of the font since there is no default value.', n, i),
										  (l = 'sans-serif')));
							var b = (function (e) {
									switch (e) {
										case 'Arial-Italic':
											return { face: 'Arial', weight: 'normal', style: 'italic', decoration: 'none' };
										case 'Arial-Bold':
											return { face: 'Arial', weight: 'bold', style: 'normal', decoration: 'none' };
										case 'Bookman-Demi':
											return { face: 'Bookman,serif', weight: 'bold', style: 'normal', decoration: 'none' };
										case 'Bookman-DemiItalic':
											return { face: 'Bookman,serif', weight: 'bold', style: 'italic', decoration: 'none' };
										case 'Bookman-Light':
											return { face: 'Bookman,serif', weight: 'normal', style: 'normal', decoration: 'none' };
										case 'Bookman-LightItalic':
											return { face: 'Bookman,serif', weight: 'normal', style: 'italic', decoration: 'none' };
										case 'Courier':
											return { face: '"Courier New"', weight: 'normal', style: 'normal', decoration: 'none' };
										case 'Courier-Oblique':
											return { face: '"Courier New"', weight: 'normal', style: 'italic', decoration: 'none' };
										case 'Courier-Bold':
											return { face: '"Courier New"', weight: 'bold', style: 'normal', decoration: 'none' };
										case 'Courier-BoldOblique':
											return { face: '"Courier New"', weight: 'bold', style: 'italic', decoration: 'none' };
										case 'AvantGarde-Book':
											return { face: 'AvantGarde,Arial', weight: 'normal', style: 'normal', decoration: 'none' };
										case 'AvantGarde-BookOblique':
											return { face: 'AvantGarde,Arial', weight: 'normal', style: 'italic', decoration: 'none' };
										case 'AvantGarde-Demi':
										case 'Avant-Garde-Demi':
											return { face: 'AvantGarde,Arial', weight: 'bold', style: 'normal', decoration: 'none' };
										case 'AvantGarde-DemiOblique':
											return { face: 'AvantGarde,Arial', weight: 'bold', style: 'italic', decoration: 'none' };
										case 'Helvetica-Oblique':
											return { face: 'Helvetica', weight: 'normal', style: 'italic', decoration: 'none' };
										case 'Helvetica-Bold':
											return { face: 'Helvetica', weight: 'bold', style: 'normal', decoration: 'none' };
										case 'Helvetica-BoldOblique':
											return { face: 'Helvetica', weight: 'bold', style: 'italic', decoration: 'none' };
										case 'Helvetica-Narrow':
											return {
												face: '"Helvetica Narrow",Helvetica',
												weight: 'normal',
												style: 'normal',
												decoration: 'none'
											};
										case 'Helvetica-Narrow-Oblique':
											return {
												face: '"Helvetica Narrow",Helvetica',
												weight: 'normal',
												style: 'italic',
												decoration: 'none'
											};
										case 'Helvetica-Narrow-Bold':
											return {
												face: '"Helvetica Narrow",Helvetica',
												weight: 'bold',
												style: 'normal',
												decoration: 'none'
											};
										case 'Helvetica-Narrow-BoldOblique':
											return {
												face: '"Helvetica Narrow",Helvetica',
												weight: 'bold',
												style: 'italic',
												decoration: 'none'
											};
										case 'Palatino-Roman':
											return { face: 'Palatino', weight: 'normal', style: 'normal', decoration: 'none' };
										case 'Palatino-Italic':
											return { face: 'Palatino', weight: 'normal', style: 'italic', decoration: 'none' };
										case 'Palatino-Bold':
											return { face: 'Palatino', weight: 'bold', style: 'normal', decoration: 'none' };
										case 'Palatino-BoldItalic':
											return { face: 'Palatino', weight: 'bold', style: 'italic', decoration: 'none' };
										case 'NewCenturySchlbk-Roman':
											return { face: '"New Century",serif', weight: 'normal', style: 'normal', decoration: 'none' };
										case 'NewCenturySchlbk-Italic':
											return { face: '"New Century",serif', weight: 'normal', style: 'italic', decoration: 'none' };
										case 'NewCenturySchlbk-Bold':
											return { face: '"New Century",serif', weight: 'bold', style: 'normal', decoration: 'none' };
										case 'NewCenturySchlbk-BoldItalic':
											return { face: '"New Century",serif', weight: 'bold', style: 'italic', decoration: 'none' };
										case 'Times':
										case 'Times-Roman':
										case 'Times-Narrow':
										case 'Times-Courier':
										case 'Times-New-Roman':
											return { face: '"Times New Roman"', weight: 'normal', style: 'normal', decoration: 'none' };
										case 'Times-Italic':
										case 'Times-Italics':
											return { face: '"Times New Roman"', weight: 'normal', style: 'italic', decoration: 'none' };
										case 'Times-Bold':
											return { face: '"Times New Roman"', weight: 'bold', style: 'normal', decoration: 'none' };
										case 'Times-BoldItalic':
											return { face: '"Times New Roman"', weight: 'bold', style: 'italic', decoration: 'none' };
										case 'ZapfChancery-MediumItalic':
											return {
												face: '"Zapf Chancery",cursive,serif',
												weight: 'normal',
												style: 'normal',
												decoration: 'none'
											};
										default:
											return null;
									}
								})(l),
								y = {};
							return b
								? ((y.face = b.face),
								  (y.weight = b.weight),
								  (y.style = b.style),
								  (y.decoration = b.decoration),
								  (y.size = c),
								  f && (y.box = !0),
								  y)
								: ((y.face = l), (y.weight = h), (y.style = u), (y.decoration = d), (y.size = c), f && (y.box = !0), y);
						},
						l = function (e, t, n) {
							return 0 === t.length
								? 'Directive "' + e + '" requires a font as a parameter.'
								: ((r[e] = c(t, r[e], n, 0, e)), r.is_in_header && (a.formatting[e] = r[e]), null);
						},
						h = function (e, t) {
							var r = '';
							t.forEach(function (e) {
								r += e.token;
							});
							var n = parseFloat(r);
							if (isNaN(n) || 0 === n) return 'Directive "' + e + '" requires a number as a parameter.';
							a.formatting.scale = n;
						},
						u = [
							'acoustic-bass-drum',
							'bass-drum-1',
							'side-stick',
							'acoustic-snare',
							'hand-clap',
							'electric-snare',
							'low-floor-tom',
							'closed-hi-hat',
							'high-floor-tom',
							'pedal-hi-hat',
							'low-tom',
							'open-hi-hat',
							'low-mid-tom',
							'hi-mid-tom',
							'crash-cymbal-1',
							'high-tom',
							'ride-cymbal-1',
							'chinese-cymbal',
							'ride-bell',
							'tambourine',
							'splash-cymbal',
							'cowbell',
							'crash-cymbal-2',
							'vibraslap',
							'ride-cymbal-2',
							'hi-bongo',
							'low-bongo',
							'mute-hi-conga',
							'open-hi-conga',
							'low-conga',
							'high-timbale',
							'low-timbale',
							'high-agogo',
							'low-agogo',
							'cabasa',
							'maracas',
							'short-whistle',
							'long-whistle',
							'short-guiro',
							'long-guiro',
							'claves',
							'hi-wood-block',
							'low-wood-block',
							'mute-cuica',
							'open-cuica',
							'mute-triangle',
							'open-triangle'
						],
						d = function (e, t, n, i, a) {
							if (1 !== n.length || 'number' !== n[0].type)
								return 'Directive "' + t + '" requires a number as a parameter.';
							var s = n[0].intt;
							return void 0 !== i && s < i
								? 'Directive "' + t + '" requires a number greater than or equal to ' + i + ' as a parameter.'
								: void 0 !== a && s > a
								? 'Directive "' + t + '" requires a number less than or equal to ' + a + ' as a parameter.'
								: ((r[e] = s), null);
						},
						f = function (e, t, n) {
							if (1 === n.length && ('true' === n[0].token || 'false' === n[0].token))
								return (r[e] = 'true' === n[0].token), null;
							var i = d(e, t, n, 0, 1);
							return null !== i ? i : ((r[e] = 1 === r[e]), null);
						},
						p = function (e, t, n, i) {
							if (1 !== n.length)
								return 'Directive "' + t + '" requires one of [ ' + i.join(', ') + ' ] as a parameter.';
							for (var a = n[0].token, s = !1, o = 0; !s && o < i.length; o++) i[o] === a && (s = !0);
							return s
								? ((r[e] = a), null)
								: 'Directive "' + t + '" requires one of [ ' + i.join(', ') + ' ] as a parameter.';
						},
						m = [
							'nobarlines',
							'barlines',
							'beataccents',
							'nobeataccents',
							'droneon',
							'droneoff',
							'drumon',
							'drumoff',
							'fermatafixed',
							'fermataproportional',
							'gchordon',
							'gchordoff',
							'controlcombo',
							'temperamentnormal',
							'noportamento'
						],
						g = ['gchord', 'ptstress', 'beatstring'],
						v = [
							'bassvol',
							'chordvol',
							'bassprog',
							'chordprog',
							'c',
							'channel',
							'beatmod',
							'deltaloudness',
							'drumbars',
							'gracedivider',
							'makechordchannels',
							'randomchordattack',
							'chordattack',
							'stressmodel',
							'transpose',
							'rtranspose',
							'vol',
							'volinc'
						],
						b = ['program'],
						y = ['ratio', 'snt', 'bendvelocity', 'pitchbend', 'control', 'temperamentlinear'],
						x = ['beat'],
						w = ['drone'],
						k = ['portamento'],
						C = ['expand', 'grace', 'trim'],
						T = ['drum', 'chordname'];
					i.parseFontChangeLine = function (e) {
						var t = e.split('$');
						if (t.length > 1 && r.setfont) {
							for (var n = [{ text: t[0] }], i = 1; i < t.length; i++)
								'0' === t[i][0]
									? n.push({ text: t[i].substring(1) })
									: '1' === t[i][0] && r.setfont[1]
									? n.push({ font: r.setfont[1], text: t[i].substring(1) })
									: '2' === t[i][0] && r.setfont[2]
									? n.push({ font: r.setfont[2], text: t[i].substring(1) })
									: '3' === t[i][0] && r.setfont[3]
									? n.push({ font: r.setfont[3], text: t[i].substring(1) })
									: '4' === t[i][0] && r.setfont[4]
									? n.push({ font: r.setfont[4], text: t[i].substring(1) })
									: (n[n.length - 1].text += '$' + t[i]);
							if (n.length > 1) return n;
						}
						return e;
					};
					var _ = ['auto', 'above', 'below', 'hidden'];
					function S(e) {
						if (0 === e.length) return { value: 1 };
						if (1 === e.length)
							if ('number' === e[0].type) {
								if (e[0].floatt >= 0 || e[0].floatt <= 1) return { value: e[0].floatt };
							} else {
								if ('false' === e[0].token) return { value: 0 };
								if ('true' === e[0].token) return { value: 1 };
							}
						return {
							error:
								'Directive stretchlast requires zero or one parameter: false, true, or number between 0 and 1 (received ' +
								e[0].token +
								')'
						};
					}
					(i.addDirective = function (o) {
						var E = e.tokenize(o, 0, o.length);
						if (0 === E.length || 'alpha' !== E[0].type) return null;
						var M = o.substring(o.indexOf(E[0].token) + E[0].token.length);
						M = e.stripComment(M);
						var N,
							A = E.shift().token.toLowerCase(),
							B = '';
						switch (A) {
							case 'bagpipes':
								a.formatting.bagpipes = !0;
								break;
							case 'flatbeams':
								a.formatting.flatbeams = !0;
								break;
							case 'jazzchords':
								a.formatting.jazzchords = !0;
								break;
							case 'germanAlphabet':
								a.formatting.germanAlphabet = !0;
								break;
							case 'landscape':
								r.landscape = !0;
								break;
							case 'papersize':
								r.papersize = M;
								break;
							case 'graceslurs':
								if (1 !== E.length) return 'Directive graceslurs requires one parameter: 0 or 1';
								if ('0' === E[0].token || 'false' === E[0].token) a.formatting.graceSlurs = !1;
								else {
									if ('1' !== E[0].token && 'true' !== E[0].token)
										return 'Directive graceslurs requires one parameter: 0 or 1 (received ' + E[0].token + ')';
									a.formatting.graceSlurs = !0;
								}
								break;
							case 'lineThickness':
								var P = S(E);
								if ((void 0 !== P.value && (a.formatting.lineThickness = P.value), P.error)) return P.error;
								break;
							case 'stretchlast':
								var L = S(E);
								if ((void 0 !== L.value && (a.formatting.stretchlast = L.value), L.error)) return L.error;
								break;
							case 'titlecaps':
								r.titlecaps = !0;
								break;
							case 'titleleft':
								a.formatting.titleleft = !0;
								break;
							case 'measurebox':
								a.formatting.measurebox = !0;
								break;
							case 'vocal':
								return p('vocalPosition', A, E, _);
							case 'dynamic':
								return p('dynamicPosition', A, E, _);
							case 'gchord':
								return p('chordPosition', A, E, _);
							case 'ornament':
								return p('ornamentPosition', A, E, _);
							case 'volume':
								return p('volumePosition', A, E, _);
							case 'botmargin':
							case 'botspace':
							case 'composerspace':
							case 'indent':
							case 'leftmargin':
							case 'linesep':
							case 'musicspace':
							case 'partsspace':
							case 'pageheight':
							case 'pagewidth':
							case 'rightmargin':
							case 'staffsep':
							case 'staffwidth':
							case 'subtitlespace':
							case 'sysstaffsep':
							case 'systemsep':
							case 'textspace':
							case 'titlespace':
							case 'topmargin':
							case 'topspace':
							case 'vocalspace':
							case 'wordsspace':
								return (function (t, r) {
									var n = e.getMeasurement(r);
									return 0 === n.used || 0 !== r.length
										? 'Directive "' + t + '" requires a measurement as a parameter.'
										: ((a.formatting[t] = n.value), null);
								})(A, E);
							case 'voicescale':
								if (1 !== E.length || 'number' !== E[0].type) return 'voicescale requires one float as a parameter';
								var H = E.shift();
								return (
									r.currentVoice && ((r.currentVoice.scale = H.floatt), s.changeVoiceScale(r.currentVoice.scale)), null
								);
							case 'voicecolor':
								if (1 !== E.length) return 'voicecolor requires one string as a parameter';
								var O = E.shift();
								return (
									r.currentVoice && ((r.currentVoice.color = O.token), s.changeVoiceColor(r.currentVoice.color)), null
								);
							case 'vskip':
								var z = Math.round(
									(function (t, r) {
										var n = e.getMeasurement(r);
										return 0 === n.used || 0 !== r.length
											? { error: 'Directive "' + t + '" requires a measurement as a parameter.' }
											: n.value;
									})(A, E)
								);
								return z.error ? z.error : (s.addSpacing(z), null);
							case 'scale':
								h(A, E);
								break;
							case 'sep':
								if (0 === E.length) s.addSeparator(14, 14, 85, { startChar: r.iChar, endChar: r.iChar + 5 });
								else {
									var D = e.getMeasurement(E);
									if (0 === D.used)
										return 'Directive "' + A + '" requires 3 numbers: space above, space below, length of line';
									var F = D.value;
									if (0 === (D = e.getMeasurement(E)).used)
										return 'Directive "' + A + '" requires 3 numbers: space above, space below, length of line';
									var I = D.value;
									if (0 === (D = e.getMeasurement(E)).used || 0 !== E.length)
										return 'Directive "' + A + '" requires 3 numbers: space above, space below, length of line';
									var j = D.value;
									s.addSeparator(F, I, j, { startChar: r.iChar, endChar: r.iChar + M.length });
								}
								break;
							case 'barsperstaff':
								if (null !== (B = d('barsperstaff', A, E))) return B;
								break;
							case 'staffnonote':
								if (1 !== E.length) return 'Directive staffnonote requires one parameter: 0 or 1';
								if ('0' === E[0].token) r.staffnonote = !0;
								else {
									if ('1' !== E[0].token)
										return 'Directive staffnonote requires one parameter: 0 or 1 (received ' + E[0].token + ')';
									r.staffnonote = !1;
								}
								break;
							case 'printtempo':
								if (null !== (B = f('printTempo', A, E))) return B;
								break;
							case 'partsbox':
								if (null !== (B = f('partsBox', A, E))) return B;
								r.partsfont.box = r.partsBox;
								break;
							case 'freegchord':
								if (null !== (B = f('freegchord', A, E))) return B;
								break;
							case 'measurenb':
							case 'barnumbers':
								if (null !== (B = d('barNumbers', A, E))) return B;
								break;
							case 'setbarnb':
								if (1 !== E.length || 'number' !== E[0].type)
									return 'Directive setbarnb requires a number as a parameter.';
								r.currBarNumber = s.setBarNumberImmediate(E[0].intt);
								break;
							case 'begintext':
								var V = '';
								for (N = e.nextLine(); N && 0 !== N.indexOf('%%endtext'); )
									n.startsWith(N, '%%') ? (V += N.substring(2) + '\n') : (V += N + '\n'), (N = e.nextLine());
								s.addText(V, { startChar: r.iChar, endChar: r.iChar + V.length + 7 });
								break;
							case 'continueall':
								r.continueall = !0;
								break;
							case 'beginps':
								for (N = e.nextLine(); N && 0 !== N.indexOf('%%endps'); ) e.nextLine();
								t('Postscript ignored', o, 0);
								break;
							case 'deco':
								M.length > 0 && r.ignoredDecorations.push(M.substring(0, M.indexOf(' '))),
									t('Decoration redefinition ignored', o, 0);
								break;
							case 'text':
								var G = e.translateString(M);
								s.addText(i.parseFontChangeLine(G), { startChar: r.iChar, endChar: r.iChar + M.length + 7 });
								break;
							case 'center':
								var Y = e.translateString(M);
								s.addCentered(i.parseFontChangeLine(Y));
								break;
							case 'font':
								break;
							case 'setfont':
								var q = e.tokenize(M, 0, M.length);
								if (q.length >= 4 && '-' === q[0].token && 'number' === q[1].type) {
									var W = parseInt(q[1].token);
									W >= 1 &&
										W <= 4 &&
										(r.setfont || (r.setfont = []),
										q.shift(),
										q.shift(),
										(r.setfont[W] = c(q, r.setfont[W], o, 0, 'setfont')));
								}
								break;
							case 'gchordfont':
							case 'partsfont':
							case 'tripletfont':
							case 'vocalfont':
							case 'textfont':
							case 'annotationfont':
							case 'historyfont':
							case 'infofont':
							case 'measurefont':
							case 'repeatfont':
							case 'wordsfont':
								return l(A, E, o);
							case 'composerfont':
							case 'subtitlefont':
							case 'tempofont':
							case 'titlefont':
							case 'voicefont':
							case 'footerfont':
							case 'headerfont':
								return (function (e, t, r) {
									return 0 === t.length
										? 'Directive "' + e + '" requires a font as a parameter.'
										: ((a.formatting[e] = c(t, a.formatting[e], r, 0, e)), null);
								})(A, E, o);
							case 'barlabelfont':
							case 'barnumberfont':
							case 'barnumfont':
								return l('measurefont', E, o);
							case 'staves':
							case 'score':
								r.score_is_present = !0;
								for (
									var R,
										X = function (e, t, i, a, s) {
											(t || 0 === r.staves.length) && r.staves.push({ index: r.staves.length, numVoices: 0 });
											var o = n.last(r.staves);
											void 0 !== i && void 0 === o.bracket && (o.bracket = i),
												void 0 !== a && void 0 === o.brace && (o.brace = a),
												s && (o.connectBarLines = 'end'),
												void 0 === r.voices[e] &&
													((r.voices[e] = { staffNum: o.index, index: o.numVoices }), o.numVoices++);
										},
										U = !1,
										K = !1,
										Q = !1,
										$ = !1,
										J = !1,
										Z = !1,
										ee = !1,
										te = function () {
											if (((ee = !0), R)) {
												var e = 'start';
												R.staffNum > 0 &&
													(('start' !== r.staves[R.staffNum - 1].connectBarLines &&
														'continue' !== r.staves[R.staffNum - 1].connectBarLines) ||
														(e = 'continue')),
													(r.staves[R.staffNum].connectBarLines = e);
											}
										};
									E.length;

								) {
									var re = E.shift();
									switch (re.token) {
										case '(':
											U ? t("Can't nest parenthesis in %%score", o, re.start) : ((U = !0), ($ = !0));
											break;
										case ')':
											!U || $ ? t('Unexpected close parenthesis in %%score', o, re.start) : (U = !1);
											break;
										case '[':
											K ? t("Can't nest brackets in %%score", o, re.start) : ((K = !0), (J = !0));
											break;
										case ']':
											!K || J
												? t('Unexpected close bracket in %%score', o, re.start)
												: ((K = !1), (r.staves[R.staffNum].bracket = 'end'));
											break;
										case '{':
											Q ? t("Can't nest braces in %%score", o, re.start) : ((Q = !0), (Z = !0));
											break;
										case '}':
											!Q || Z
												? t('Unexpected close brace in %%score', o, re.start)
												: ((Q = !1), (r.staves[R.staffNum].brace = 'end'));
											break;
										case '|':
											te();
											break;
										default:
											for (
												var ne = '';
												('alpha' === re.type || 'number' === re.type) && ((ne += re.token), re.continueId);

											)
												re = E.shift();
											X(ne, !U || $, J ? 'start' : K ? 'continue' : void 0, Z ? 'start' : Q ? 'continue' : void 0, ee),
												($ = !1),
												(J = !1),
												(Z = !1),
												(ee = !1),
												(R = r.voices[ne]),
												'staves' === A && te();
									}
								}
								break;
							case 'newpage':
								var ie = e.getInt(M);
								s.addNewPage(0 === ie.digits ? -1 : ie.value);
								break;
							case 'abc':
								var ae = M.split(' ');
								switch (ae[0]) {
									case '-copyright':
									case '-creator':
									case '-edited-by':
									case '-version':
									case '-charset':
										var se = ae.shift();
										s.addMetaText(A + se, ae.join(' '), { startChar: r.iChar, endChar: r.iChar + M.length + 5 });
										break;
									default:
										return 'Unknown directive: ' + A + ae[0];
								}
								break;
							case 'header':
							case 'footer':
								var oe = e.getMeat(M, 0, M.length);
								'"' === (oe = M.substring(oe.start, oe.end))[0] &&
									'"' === oe[oe.length - 1] &&
									(oe = oe.substring(1, oe.length - 1));
								var ce = oe.split('\t'),
									le = {};
								(le =
									1 === ce.length
										? { left: '', center: ce[0], right: '' }
										: 2 === ce.length
										? { left: ce[0], center: ce[1], right: '' }
										: { left: ce[0], center: ce[1], right: ce[2] }),
									ce.length > 3 && t('Too many tabs in ' + A + ': ' + ce.length + ' found.', M, 0),
									s.addMetaTextObj(A, le, { startChar: r.iChar, endChar: r.iChar + o.length });
								break;
							case 'midi':
								var he = e.tokenize(M, 0, M.length, !0);
								he.length > 0 && '=' === he[0].token && he.shift(),
									0 === he.length
										? t('Expected midi command', M, 0)
										: (function (e, r, n) {
												var i = e.shift().token,
													a = [];
												if (m.indexOf(i) >= 0) 0 !== e.length && t('Unexpected parameter in MIDI ' + i, n, 0);
												else if (g.indexOf(i) >= 0)
													1 !== e.length ? t('Expected one parameter in MIDI ' + i, n, 0) : a.push(e[0].token);
												else if (v.indexOf(i) >= 0)
													1 !== e.length
														? t('Expected one parameter in MIDI ' + i, n, 0)
														: 'number' !== e[0].type
														? t('Expected one integer parameter in MIDI ' + i, n, 0)
														: a.push(e[0].intt);
												else if (b.indexOf(i) >= 0)
													1 !== e.length && 2 !== e.length
														? t('Expected one or two parameters in MIDI ' + i, n, 0)
														: 'number' !== e[0].type || (2 === e.length && 'number' !== e[1].type)
														? t('Expected integer parameter in MIDI ' + i, n, 0)
														: (a.push(e[0].intt), 2 === e.length && a.push(e[1].intt));
												else if (y.indexOf(i) >= 0)
													2 !== e.length
														? t('Expected two parameters in MIDI ' + i, n, 0)
														: 'number' !== e[0].type || 'number' !== e[1].type
														? t('Expected two integer parameters in MIDI ' + i, n, 0)
														: (a.push(e[0].intt), a.push(e[1].intt));
												else if (k.indexOf(i) >= 0)
													2 !== e.length
														? t('Expected two parameters in MIDI ' + i, n, 0)
														: 'alpha' !== e[0].type || 'number' !== e[1].type
														? t('Expected one string and one integer parameters in MIDI ' + i, n, 0)
														: (a.push(e[0].token), a.push(e[1].intt));
												else if ('drummap' === i)
													2 === e.length && 'alpha' === e[0].type && 'number' === e[1].type
														? (r.formatting || (r.formatting = {}),
														  r.formatting.midi || (r.formatting.midi = {}),
														  r.formatting.midi.drummap || (r.formatting.midi.drummap = {}),
														  (r.formatting.midi.drummap[e[0].token] = e[1].intt),
														  (a = r.formatting.midi.drummap))
														: 3 === e.length && 'punct' === e[0].type && 'alpha' === e[1].type && 'number' === e[2].type
														? (r.formatting || (r.formatting = {}),
														  r.formatting.midi || (r.formatting.midi = {}),
														  r.formatting.midi.drummap || (r.formatting.midi.drummap = {}),
														  (r.formatting.midi.drummap[e[0].token + e[1].token] = e[2].intt),
														  (a = r.formatting.midi.drummap))
														: t('Expected one note name and one integer parameter in MIDI ' + i, n, 0);
												else if (C.indexOf(i) >= 0)
													3 !== e.length || 'number' !== e[0].type || '/' !== e[1].token || 'number' !== e[2].type
														? t('Expected fraction parameter in MIDI ' + i, n, 0)
														: (a.push(e[0].intt), a.push(e[2].intt));
												else if (x.indexOf(i) >= 0)
													4 !== e.length
														? t('Expected four parameters in MIDI ' + i, n, 0)
														: 'number' !== e[0].type ||
														  'number' !== e[1].type ||
														  'number' !== e[2].type ||
														  'number' !== e[3].type
														? t('Expected four integer parameters in MIDI ' + i, n, 0)
														: (a.push(e[0].intt), a.push(e[1].intt), a.push(e[2].intt), a.push(e[3].intt));
												else if (w.indexOf(i) >= 0)
													5 !== e.length
														? t('Expected five parameters in MIDI ' + i, n, 0)
														: 'number' !== e[0].type ||
														  'number' !== e[1].type ||
														  'number' !== e[2].type ||
														  'number' !== e[3].type ||
														  'number' !== e[4].type
														? t('Expected five integer parameters in MIDI ' + i, n, 0)
														: (a.push(e[0].intt),
														  a.push(e[1].intt),
														  a.push(e[2].intt),
														  a.push(e[3].intt),
														  a.push(e[4].intt));
												else if (b.indexOf(i) >= 0)
													1 !== e.length || 4 !== e.length
														? t('Expected one or two parameters in MIDI ' + i, n, 0)
														: 'number' !== e[0].type
														? t('Expected integer parameter in MIDI ' + i, n, 0)
														: 4 === e.length
														? ('octave' !== e[1].token && t('Expected octave parameter in MIDI ' + i, n, 0),
														  '=' !== e[2].token && t('Expected octave parameter in MIDI ' + i, n, 0),
														  'number' !== e[3].type && t('Expected integer parameter for octave in MIDI ' + i, n, 0))
														: (a.push(e[0].intt), 4 === e.length && a.push(e[3].intt));
												else if (T.indexOf(i) >= 0)
													if (e.length < 2)
														t('Expected string parameter and at least one integer parameter in MIDI ' + i, n, 0);
													else if ('alpha' !== e[0].type)
														t('Expected string parameter and at least one integer parameter in MIDI ' + i, n, 0);
													else {
														var o = e.shift();
														for (a.push(o.token); e.length > 0; )
															'number' !== (o = e.shift()).type && t('Expected integer parameter in MIDI ' + i, n, 0),
																a.push(o.intt);
													}
												s.hasBeginMusic()
													? s.appendElement('midi', -1, -1, { cmd: i, params: a })
													: (void 0 === r.formatting.midi && (r.formatting.midi = {}), (r.formatting.midi[i] = a));
										  })(he, a, M);
								break;
							case 'percmap':
								var ue = (function (e) {
									var t = e.split(/\s+/);
									if (2 !== t.length && 3 !== t.length)
										return { error: 'Expected parameters "abc-note", "drum-sound", and optionally "note-head"' };
									var r = t[0],
										n = parseInt(t[1], 10);
									if (
										((isNaN(n) || n < 35 || n > 81) && t[1] && (n = u.indexOf(t[1].toLowerCase()) + 35),
										isNaN(n) || n < 35 || n > 81)
									)
										return { error: 'Expected drum name, received "' + t[1] + '"' };
									var i = { sound: n };
									return 3 === t.length && (i.noteHead = t[2]), { key: r, value: i };
								})(M);
								ue.error
									? t(ue.error, o, 8)
									: (a.formatting.percmap || (a.formatting.percmap = {}), (a.formatting.percmap[ue.key] = ue.value));
								break;
							case 'map':
							case 'playtempo':
							case 'auquality':
							case 'continuous':
							case 'nobarcheck':
								a.formatting[A] = M;
								break;
							default:
								return 'Unknown directive: ' + A;
						}
						return null;
					}),
						(i.globalFormatting = function (n) {
							for (var i in n)
								if (n.hasOwnProperty(i)) {
									var s,
										o = '' + n[i],
										c = e.tokenize(o, 0, o.length);
									switch (i) {
										case 'titlefont':
										case 'gchordfont':
										case 'composerfont':
										case 'footerfont':
										case 'headerfont':
										case 'historyfont':
										case 'infofont':
										case 'measurefont':
										case 'partsfont':
										case 'repeatfont':
										case 'subtitlefont':
										case 'tempofont':
										case 'textfont':
										case 'voicefont':
										case 'tripletfont':
										case 'vocalfont':
										case 'wordsfont':
										case 'annotationfont':
										case 'tablabelfont':
										case 'tabnumberfont':
										case 'tabgracefont':
											l(i, c, o);
											break;
										case 'scale':
											h(i, c);
											break;
										case 'partsbox':
											null !== (s = f('partsBox', i, c)) && t(s), (r.partsfont.box = r.partsBox);
											break;
										case 'freegchord':
											null !== (s = f('freegchord', i, c)) && t(s);
											break;
										case 'fontboxpadding':
											(1 === c.length && 'number' === c[0].type) ||
												t('Directive "' + i + '" requires a number as a parameter.'),
												(a.formatting.fontboxpadding = c[0].floatt);
											break;
										case 'stretchlast':
											var u = S(c);
											if ((void 0 !== u.value && (a.formatting.stretchlast = u.value), u.error)) return u.error;
											break;
										default:
											t('Formatting directive unrecognized: ', i, 0);
									}
								}
						});
				})(),
					(e.exports = i);
			},
			9928: function (e, t, r) {
				var n = r(5008),
					i = r(8360),
					a = r(9708);
				e.exports = function (e, t, r, s, o) {
					(this.reset = function (e, t, r, n) {
						a.initialize(e, t, r, n, o), i.initialize(e, t, r, n, o);
					}),
						this.reset(e, t, r, s),
						(this.setTitle = function (t) {
							if (r.hasMainTitle)
								o.addSubtitle(e.translateString(e.stripComment(t)), {
									startChar: r.iChar,
									endChar: r.iChar + t.length + 2
								});
							else {
								var n = e.translateString(e.theReverser(e.stripComment(t)));
								r.titlecaps && (n = n.toUpperCase()),
									o.addMetaText('title', n, { startChar: r.iChar, endChar: r.iChar + t.length + 2 }),
									(r.hasMainTitle = !0);
							}
						}),
						(this.setMeter = function (n) {
							if ('C' === (n = e.stripComment(n)))
								return (
									!0 === r.havent_set_length && ((r.default_length = 0.125), (r.havent_set_length = !1)),
									{ type: 'common_time' }
								);
							if ('C|' === n)
								return (
									!0 === r.havent_set_length && ((r.default_length = 0.125), (r.havent_set_length = !1)),
									{ type: 'cut_time' }
								);
							if ('o' === n)
								return (
									!0 === r.havent_set_length && ((r.default_length = 0.125), (r.havent_set_length = !1)),
									{ type: 'tempus_perfectum' }
								);
							if ('c' === n)
								return (
									!0 === r.havent_set_length && ((r.default_length = 0.125), (r.havent_set_length = !1)),
									{ type: 'tempus_imperfectum' }
								);
							if ('o.' === n)
								return (
									!0 === r.havent_set_length && ((r.default_length = 0.125), (r.havent_set_length = !1)),
									{ type: 'tempus_perfectum_prolatio' }
								);
							if ('c.' === n)
								return (
									!0 === r.havent_set_length && ((r.default_length = 0.125), (r.havent_set_length = !1)),
									{ type: 'tempus_imperfectum_prolatio' }
								);
							if (0 === n.length || 'none' === n.toLowerCase())
								return !0 === r.havent_set_length && ((r.default_length = 0.125), (r.havent_set_length = !1)), null;
							var i = e.tokenize(n, 0, n.length);
							try {
								var a = function () {
									var e = (function () {
										var e = { value: 0, num: '' },
											t = i.shift();
										for ('(' === t.token && (t = i.shift()); ; ) {
											if ('number' !== t.type) throw 'Expected top number of meter';
											if (((e.value += parseInt(t.token)), (e.num += t.token), 0 === i.length || '/' === i[0].token))
												return e;
											if (')' === (t = i.shift()).token) {
												if (0 === i.length || '/' === i[0].token) return e;
												throw 'Unexpected paren in meter';
											}
											if ('.' !== t.token && '+' !== t.token) throw 'Expected top number of meter';
											if (((e.num += t.token), 0 === i.length)) throw 'Expected top number of meter';
											t = i.shift();
										}
										return e;
									})();
									if (0 === i.length) return e;
									var t = i.shift();
									if ('/' !== t.token) throw 'Expected slash in meter';
									if ('number' !== (t = i.shift()).type) throw 'Expected bottom number of meter';
									return (e.den = t.token), (e.value = e.value / parseInt(e.den)), e;
								};
								if (0 === i.length) throw 'Expected meter definition in M: line';
								for (var s = { type: 'specified', value: [] }, o = 0; ; ) {
									var c = a();
									o += c.value;
									var l = { num: c.num };
									if ((void 0 !== c.den && (l.den = c.den), s.value.push(l), 0 === i.length)) break;
								}
								return (
									!0 === r.havent_set_length &&
										((r.default_length = o < 0.75 ? 0.0625 : 0.125), (r.havent_set_length = !1)),
									s
								);
							} catch (e) {
								t(e, n, 0);
							}
							return null;
						}),
						(this.calcTempo = function (e) {
							var t = 1 / 4;
							r.meter && 'specified' === r.meter.type
								? (t = 1 / parseInt(r.meter.value[0].den))
								: r.origMeter && 'specified' === r.origMeter.type && (t = 1 / parseInt(r.origMeter.value[0].den));
							for (var n = 0; n < e.duration; n++) e.duration[n] = t * e.duration[n];
							return e;
						}),
						(this.resolveTempo = function () {
							r.tempo && (this.calcTempo(r.tempo), (s.metaText.tempo = r.tempo), delete r.tempo);
						}),
						(this.addUserDefinition = function (e, i, a) {
							var s = e.indexOf('=', i);
							if (-1 !== s) {
								var o = n.strip(e.substring(i, s)),
									c = n.strip(e.substring(s + 1));
								1 === o.length
									? -1 !== 'HIJKLMNOPQRSTUVWXYhijklmnopqrstuvw~'.indexOf(o)
										? 0 !== c.length
											? (void 0 === r.macros && (r.macros = {}), (r.macros[o] = c))
											: t('Missing macro definition', e, i)
										: t('Macro definitions must be H-Y, h-w, or tilde', e, i)
									: t('Macro definitions can only be one character', e, i);
							} else t('Need an = in a macro definition', e, i);
						}),
						(this.setDefaultLength = function (e, t, n) {
							var i = e.substring(t, n).replace(/ /g, '').split('/');
							if (2 === i.length) {
								var a = parseInt(i[0]),
									s = parseInt(i[1]);
								s > 0 && ((r.default_length = a / s), (r.havent_set_length = !1));
							} else 1 === i.length && '1' === i[0] && ((r.default_length = 1), (r.havent_set_length = !1));
						});
					var c = {
						larghissimo: 20,
						adagissimo: 24,
						sostenuto: 28,
						grave: 32,
						largo: 40,
						lento: 50,
						larghetto: 60,
						adagio: 68,
						adagietto: 74,
						andante: 80,
						andantino: 88,
						'marcia moderato': 84,
						'andante moderato': 100,
						moderato: 112,
						allegretto: 116,
						'allegro moderato': 120,
						allegro: 126,
						animato: 132,
						agitato: 140,
						veloce: 148,
						'mosso vivo': 156,
						vivace: 164,
						vivacissimo: 172,
						allegrissimo: 176,
						presto: 184,
						prestissimo: 210
					};
					(this.setTempo = function (n, i, a, s) {
						try {
							var o = e.tokenize(n, i, a);
							if (0 === o.length) throw 'Missing parameter in Q: field';
							var l = { startChar: s + i - 2, endChar: s + a },
								h = !0,
								u = o.shift();
							if ('quote' === u.type && ((l.preString = u.token), (u = o.shift()), 0 === o.length))
								return (
									c[l.preString.toLowerCase()] && ((l.bpm = c[l.preString.toLowerCase()]), (l.suppressBpm = !0)),
									{ type: 'immediate', tempo: l }
								);
							if ('alpha' === u.type && 'C' === u.token) {
								if (0 === o.length) throw 'Missing tempo after C in Q: field';
								if ('punct' === (u = o.shift()).type && '=' === u.token) {
									if (0 === o.length) throw 'Missing tempo after = in Q: field';
									if ('number' !== (u = o.shift()).type) throw 'Expected number after = in Q: field';
									(l.duration = [1]), (l.bpm = parseInt(u.token));
								} else {
									if ('number' !== u.type) throw 'Expected number or equal after C in Q: field';
									if (((l.duration = [parseInt(u.token)]), 0 === o.length))
										throw 'Missing = after duration in Q: field';
									if ('punct' !== (u = o.shift()).type || '=' !== u.token)
										throw 'Expected = after duration in Q: field';
									if (0 === o.length) throw 'Missing tempo after = in Q: field';
									if ('number' !== (u = o.shift()).type) throw 'Expected number after = in Q: field';
									l.bpm = parseInt(u.token);
								}
							} else {
								if ('number' !== u.type) throw 'Unknown value in Q: field';
								var d = parseInt(u.token);
								if (0 === o.length || 'quote' === o[0].type) (l.duration = [1]), (l.bpm = d);
								else {
									if (((h = !1), 'punct' !== (u = o.shift()).type && '/' !== u.token))
										throw 'Expected fraction in Q: field';
									if ('number' !== (u = o.shift()).type) throw 'Expected fraction in Q: field';
									var f = parseInt(u.token);
									for (l.duration = [d / f]; o.length > 0 && '=' !== o[0].token && 'quote' !== o[0].type; ) {
										if ('number' !== (u = o.shift()).type) throw 'Expected fraction in Q: field';
										if (((d = parseInt(u.token)), 'punct' !== (u = o.shift()).type && '/' !== u.token))
											throw 'Expected fraction in Q: field';
										if ('number' !== (u = o.shift()).type) throw 'Expected fraction in Q: field';
										(f = parseInt(u.token)), l.duration.push(d / f);
									}
									if ('punct' !== (u = o.shift()).type && '=' !== u.token) throw 'Expected = in Q: field';
									if ('number' !== (u = o.shift()).type) throw 'Expected tempo in Q: field';
									l.bpm = parseInt(u.token);
								}
							}
							if (
								0 !== o.length &&
								('quote' === (u = o.shift()).type && ((l.postString = u.token), (u = o.shift())), 0 !== o.length)
							)
								throw 'Unexpected string at end of Q: field';
							return !1 === r.printTempo && (l.suppress = !0), { type: h ? 'delaySet' : 'immediate', tempo: l };
						} catch (e) {
							return t(e, n, i), { type: 'none' };
						}
					}),
						(this.letter_to_inline_header = function (n, c, l) {
							var h = e.eatWhiteSpace(n, c);
							if (((c += h), n.length >= c + 5 && '[' === n[c] && ':' === n[c + 2])) {
								var u = n.indexOf(']', c),
									d = r.iChar + c,
									f = r.iChar + u + 1;
								switch (n.substring(c, c + 3)) {
									case '[I:':
										var p = i.addDirective(n.substring(c + 3, u));
										return p && t(p, n, c), [u - c + 1 + h];
									case '[M:':
										var m = this.setMeter(n.substring(c + 3, u));
										return (
											o.hasBeginMusic() && m ? o.appendStartingElement('meter', d, f, m) : (r.meter = m),
											[u - c + 1 + h]
										);
									case '[K:':
										var g = a.parseKey(n.substring(c + 3, u), !0);
										return (
											g.foundClef && o.hasBeginMusic() && o.appendStartingElement('clef', d, f, r.clef),
											g.foundKey && o.hasBeginMusic() && o.appendStartingElement('key', d, f, a.fixKey(r.clef, r.key)),
											[u - c + 1 + h]
										);
									case '[P:':
										return (
											l || s.lines.length <= s.lineNum
												? (r.partForNextLine = { title: n.substring(c + 3, u), startChar: d, endChar: f })
												: o.appendElement('part', d, f, { title: n.substring(c + 3, u) }),
											[u - c + 1 + h]
										);
									case '[L:':
										return this.setDefaultLength(n, c + 3, u), [u - c + 1 + h];
									case '[Q:':
										if (u > 0) {
											var v = this.setTempo(n, c + 3, u, r.iChar);
											return (
												'delaySet' === v.type
													? o.hasBeginMusic()
														? o.appendElement('tempo', d, f, this.calcTempo(v.tempo))
														: (r.tempoForNextLine = ['tempo', d, f, this.calcTempo(v.tempo)])
													: 'immediate' === v.type &&
													  (!l && o.hasBeginMusic()
															? o.appendElement('tempo', d, f, v.tempo)
															: (r.tempoForNextLine = ['tempo', d, f, v.tempo])),
												[u - c + 1 + h, n[c + 1], n.substring(c + 3, u)]
											);
										}
										break;
									case '[V:':
										if (u > 0) return a.parseVoice(n, c + 3, u), [u - c + 1 + h, n[c + 1], n.substring(c + 3, u)];
										break;
									case '[r:':
										return [u - c + 1 + h];
								}
							}
							return [0];
						}),
						(this.letter_to_body_header = function (e, s) {
							if (e.length >= s + 3)
								switch (e.substring(s, s + 2)) {
									case 'I:':
										var c = i.addDirective(e.substring(s + 2));
										return c && t(c, e, s), [e.length];
									case 'M:':
										var l = this.setMeter(e.substring(s + 2));
										return (
											o.hasBeginMusic() && l && o.appendStartingElement('meter', r.iChar + s, r.iChar + e.length, l),
											[e.length]
										);
									case 'K:':
										var h = a.parseKey(e.substring(s + 2), o.hasBeginMusic());
										return (
											h.foundClef &&
												o.hasBeginMusic() &&
												o.appendStartingElement('clef', r.iChar + s, r.iChar + e.length, r.clef),
											h.foundKey &&
												o.hasBeginMusic() &&
												o.appendStartingElement('key', r.iChar + s, r.iChar + e.length, a.fixKey(r.clef, r.key)),
											[e.length]
										);
									case 'P:':
										return (
											o.hasBeginMusic() &&
												o.appendElement('part', r.iChar + s, r.iChar + e.length, { title: e.substring(s + 2) }),
											[e.length]
										);
									case 'L:':
										return this.setDefaultLength(e, s + 2, e.length), [e.length];
									case 'Q:':
										var u = e.indexOf('', s + 2);
										-1 === u && (u = e.length);
										var d = this.setTempo(e, s + 2, u, r.iChar);
										return (
											'delaySet' === d.type
												? o.appendElement('tempo', r.iChar + s, r.iChar + e.length, this.calcTempo(d.tempo))
												: 'immediate' === d.type && o.appendElement('tempo', r.iChar + s, r.iChar + e.length, d.tempo),
											[u, e[s], n.strip(e.substring(s + 2))]
										);
									case 'V:':
										return a.parseVoice(e, s + 2, e.length), [e.length, e[s], n.strip(e.substring(s + 2))];
								}
							return [0];
						});
					var l = {
						A: 'author',
						B: 'book',
						C: 'composer',
						D: 'discography',
						F: 'url',
						G: 'group',
						I: 'instruction',
						N: 'notes',
						O: 'origin',
						R: 'rhythm',
						S: 'source',
						W: 'unalignedWords',
						Z: 'transcription'
					};
					this.parseHeader = function (n) {
						var c = l[n[0]];
						if (void 0 !== c)
							return (
								'unalignedWords' === c
									? o.addMetaTextArray(c, i.parseFontChangeLine(e.translateString(e.stripComment(n.substring(2)))), {
											startChar: r.iChar,
											endChar: r.iChar + n.length
									  })
									: o.addMetaText(c, e.translateString(e.stripComment(n.substring(2))), {
											startChar: r.iChar,
											endChar: r.iChar + n.length
									  }),
								{}
							);
						var h = r.iChar,
							u = h + n.length;
						switch (n[0]) {
							case 'H':
								for (
									o.addMetaText('history', e.translateString(e.stripComment(n.substring(2))), {
										startChar: r.iChar,
										endChar: r.iChar + n.length
									}),
										n = e.peekLine();
									n && ':' !== n[1];

								)
									e.nextLine(),
										o.addMetaText('history', e.translateString(e.stripComment(n)), {
											startChar: r.iChar,
											endChar: r.iChar + n.length
										}),
										(n = e.peekLine());
								break;
							case 'K':
								this.resolveTempo();
								var d = a.parseKey(n.substring(2), !1);
								!r.is_in_header &&
									o.hasBeginMusic() &&
									(d.foundClef && o.appendStartingElement('clef', h, u, r.clef),
									d.foundKey && o.appendStartingElement('key', h, u, a.fixKey(r.clef, r.key))),
									(r.is_in_header = !1);
								break;
							case 'L':
								this.setDefaultLength(n, 2, n.length);
								break;
							case 'M':
								r.origMeter = r.meter = this.setMeter(n.substring(2));
								break;
							case 'P':
								r.is_in_header
									? o.addMetaText('partOrder', e.translateString(e.stripComment(n.substring(2))), {
											startChar: r.iChar,
											endChar: r.iChar + n.length
									  })
									: (r.partForNextLine = {
											title: e.translateString(e.stripComment(n.substring(2))),
											startChar: h,
											endChar: u
									  });
								break;
							case 'Q':
								var f = this.setTempo(n, 2, n.length, r.iChar);
								'delaySet' === f.type
									? (r.tempo = f.tempo)
									: 'immediate' === f.type &&
									  (s.metaText.tempo ? (r.tempoForNextLine = ['tempo', h, u, f.tempo]) : (s.metaText.tempo = f.tempo));
								break;
							case 'T':
								this.setTitle(n.substring(2));
								break;
							case 'U':
								this.addUserDefinition(n, 2, n.length);
								break;
							case 'V':
								if ((a.parseVoice(n, 2, n.length), !r.is_in_header)) return { newline: !0 };
								break;
							case 's':
								return { symbols: !0 };
							case 'w':
								return { words: !0 };
							case 'X':
								break;
							case 'E':
							case 'm':
								t('Ignored header', n, 0);
								break;
							default:
								return { regular: !0 };
						}
						return {};
					};
				};
			},
			9708: function (e, t, r) {
				var n = r(5008),
					i = r(8360),
					a = r(2821),
					s = {};
				!(function () {
					var e, t, r, o;
					(s.initialize = function (n, i, a, s, c) {
						(e = n), (t = i), (r = a), (o = c);
					}),
						(s.standardKey = function (e, t, n, i) {
							return a.keySignature(r, e, t, n, i);
						});
					var c = {
							treble: { clef: 'treble', pitch: 4, mid: 0 },
							'treble+8': { clef: 'treble+8', pitch: 4, mid: 0 },
							'treble-8': { clef: 'treble-8', pitch: 4, mid: 0 },
							'treble^8': { clef: 'treble+8', pitch: 4, mid: 0 },
							treble_8: { clef: 'treble-8', pitch: 4, mid: 0 },
							treble1: { clef: 'treble', pitch: 2, mid: 2 },
							treble2: { clef: 'treble', pitch: 4, mid: 0 },
							treble3: { clef: 'treble', pitch: 6, mid: -2 },
							treble4: { clef: 'treble', pitch: 8, mid: -4 },
							treble5: { clef: 'treble', pitch: 10, mid: -6 },
							perc: { clef: 'perc', pitch: 6, mid: 0 },
							none: { clef: 'none', mid: 0 },
							bass: { clef: 'bass', pitch: 8, mid: -12 },
							'bass+8': { clef: 'bass+8', pitch: 8, mid: -12 },
							'bass-8': { clef: 'bass-8', pitch: 8, mid: -12 },
							'bass^8': { clef: 'bass+8', pitch: 8, mid: -12 },
							bass_8: { clef: 'bass-8', pitch: 8, mid: -12 },
							'bass+16': { clef: 'bass', pitch: 8, mid: -12 },
							'bass-16': { clef: 'bass', pitch: 8, mid: -12 },
							'bass^16': { clef: 'bass', pitch: 8, mid: -12 },
							bass_16: { clef: 'bass', pitch: 8, mid: -12 },
							bass1: { clef: 'bass', pitch: 2, mid: -6 },
							bass2: { clef: 'bass', pitch: 4, mid: -8 },
							bass3: { clef: 'bass', pitch: 6, mid: -10 },
							bass4: { clef: 'bass', pitch: 8, mid: -12 },
							bass5: { clef: 'bass', pitch: 10, mid: -14 },
							tenor: { clef: 'alto', pitch: 8, mid: -8 },
							tenor1: { clef: 'alto', pitch: 2, mid: -2 },
							tenor2: { clef: 'alto', pitch: 4, mid: -4 },
							tenor3: { clef: 'alto', pitch: 6, mid: -6 },
							tenor4: { clef: 'alto', pitch: 8, mid: -8 },
							tenor5: { clef: 'alto', pitch: 10, mid: -10 },
							alto: { clef: 'alto', pitch: 6, mid: -6 },
							alto1: { clef: 'alto', pitch: 2, mid: -2 },
							alto2: { clef: 'alto', pitch: 4, mid: -4 },
							alto3: { clef: 'alto', pitch: 6, mid: -6 },
							alto4: { clef: 'alto', pitch: 8, mid: -8 },
							alto5: { clef: 'alto', pitch: 10, mid: -10 },
							'alto+8': { clef: 'alto+8', pitch: 6, mid: -6 },
							'alto-8': { clef: 'alto-8', pitch: 6, mid: -6 },
							'alto^8': { clef: 'alto+8', pitch: 6, mid: -6 },
							alto_8: { clef: 'alto-8', pitch: 6, mid: -6 }
						},
						l = function (e, t) {
							var r = c[e];
							return (r ? r.mid : 0) + t;
						};
					(s.fixClef = function (e) {
						var t = c[e.type];
						t && ((e.clefPos = t.pitch), (e.type = t.clef));
					}),
						(s.deepCopyKey = function (e) {
							var t = { accidentals: [], root: e.root, acc: e.acc, mode: e.mode };
							return (
								e.accidentals.forEach(function (e) {
									t.accidentals.push(n.clone(e));
								}),
								t
							);
						});
					var h = { A: 5, B: 6, C: 0, D: 1, E: 2, F: 3, G: 4, a: 12, b: 13, c: 7, d: 8, e: 9, f: 10, g: 11 };
					(s.addPosToKey = function (e, t) {
						var r = e.verticalPos;
						t.accidentals.forEach(function (e) {
							var t = h[e.note];
							(t -= r), (e.verticalPos = t);
						}),
							t.impliedNaturals &&
								t.impliedNaturals.forEach(function (e) {
									var t = h[e.note];
									(t -= r), (e.verticalPos = t);
								}),
							r < -10
								? (t.accidentals.forEach(function (e) {
										(e.verticalPos -= 7),
											(e.verticalPos >= 11 || (10 === e.verticalPos && 'flat' === e.acc)) && (e.verticalPos -= 7),
											'A' === e.note && 'sharp' === e.acc && (e.verticalPos -= 7),
											('G' !== e.note && 'F' !== e.note) || 'flat' !== e.acc || (e.verticalPos -= 7);
								  }),
								  t.impliedNaturals &&
										t.impliedNaturals.forEach(function (e) {
											(e.verticalPos -= 7),
												(e.verticalPos >= 11 || (10 === e.verticalPos && 'flat' === e.acc)) && (e.verticalPos -= 7),
												'A' === e.note && 'sharp' === e.acc && (e.verticalPos -= 7),
												('G' !== e.note && 'F' !== e.note) || 'flat' !== e.acc || (e.verticalPos -= 7);
										}))
								: r < -4
								? (t.accidentals.forEach(function (e) {
										(e.verticalPos -= 7),
											-8 !== r || ('f' !== e.note && 'g' !== e.note) || 'sharp' !== e.acc || (e.verticalPos -= 7);
								  }),
								  t.impliedNaturals &&
										t.impliedNaturals.forEach(function (e) {
											(e.verticalPos -= 7),
												-8 !== r || ('f' !== e.note && 'g' !== e.note) || 'sharp' !== e.acc || (e.verticalPos -= 7);
										}))
								: r >= 7 &&
								  (t.accidentals.forEach(function (e) {
										e.verticalPos += 7;
								  }),
								  t.impliedNaturals &&
										t.impliedNaturals.forEach(function (e) {
											e.verticalPos += 7;
										}));
					}),
						(s.fixKey = function (e, t) {
							var r = n.clone(t);
							return s.addPosToKey(e, r), r;
						});
					var u = function (e) {
						var t = 0,
							r = e[t++];
						('^' !== r && '_' !== r) || (r = e[t++]);
						var n = h[r];
						for (void 0 === n && (n = 6); t < e.length; t++)
							if (',' === e[t]) n -= 7;
							else {
								if ("'" !== e[t]) break;
								n += 7;
							}
						return { mid: n - 6, str: e.substring(t) };
					};
					(s.parseKey = function (n, a) {
						0 === n.length && (n = 'none');
						var o = e.tokenize(n, 0, n.length),
							c = {};
						if (0 === o.length) return t('Must pass in key signature.', n, 0), c;
						switch (o[0].token) {
							case 'HP':
								i.addDirective('bagpipes'),
									(r.key = { root: 'HP', accidentals: [], acc: '', mode: '' }),
									(c.foundKey = !0),
									o.shift();
								break;
							case 'Hp':
								i.addDirective('bagpipes'),
									(r.key = {
										root: 'Hp',
										accidentals: [
											{ acc: 'natural', note: 'g' },
											{ acc: 'sharp', note: 'f' },
											{ acc: 'sharp', note: 'c' }
										],
										acc: '',
										mode: ''
									}),
									(c.foundKey = !0),
									o.shift();
								break;
							case 'none':
								(r.key = { root: 'none', accidentals: [], acc: '', mode: '' }), (c.foundKey = !0), o.shift();
								break;
							default:
								var h = e.getKeyPitch(o[0].token);
								if (h.len > 0) {
									c.foundKey = !0;
									var u = '',
										d = '';
									o[0].token.length > 1 ? (o[0].token = o[0].token.substring(1)) : o.shift();
									var f = h.token;
									if (o.length > 0) {
										var p = e.getSharpFlat(o[0].token);
										if (
											(p.len > 0 &&
												(o[0].token.length > 1 ? (o[0].token = o[0].token.substring(1)) : o.shift(),
												(f += p.token),
												(u = p.token)),
											o.length > 0)
										) {
											var m = e.getMode(o[0].token);
											m.len > 0 && (o.shift(), (f += m.token), (d = m.token));
										}
										if (void 0 === s.standardKey(f, h.token, u, 0))
											return t('Unsupported key signature: ' + f, n, 0), c;
									}
									var g,
										v = s.deepCopyKey(r.key),
										b = !a && r.globalTranspose ? -r.globalTranspose : 0;
									if (
										(a && (g = r.globalTransposeOrigKeySig),
										(r.key = s.deepCopyKey(s.standardKey(f, h.token, u, b))),
										a && (r.globalTransposeOrigKeySig = g),
										(r.key.mode = d),
										v)
									) {
										for (var y, x = 0; x < r.key.accidentals.length; x++)
											for (y = 0; y < v.accidentals.length; y++)
												v.accidentals[y].note &&
													r.key.accidentals[x].note.toLowerCase() === v.accidentals[y].note.toLowerCase() &&
													(v.accidentals[y].note = null);
										for (y = 0; y < v.accidentals.length; y++)
											v.accidentals[y].note &&
												(r.key.impliedNaturals || (r.key.impliedNaturals = []),
												r.key.impliedNaturals.push({ acc: 'natural', note: v.accidentals[y].note }));
									}
								}
						}
						if (0 === o.length) return c;
						if (('exp' === o[0].token && o.shift(), 0 === o.length)) return c;
						if (('oct' === o[0].token && o.shift(), 0 === o.length)) return c;
						var w,
							k = e.getKeyAccidentals2(o);
						if ((k.warn && t(k.warn, n, 0), k.accs)) {
							c.foundKey || ((c.foundKey = !0), (r.key = { root: 'none', acc: '', mode: '', accidentals: [] })),
								(function (e) {
									for (var t = 0; t < e.length; t++)
										'b' === e[t].note
											? (e[t].note = 'B')
											: 'a' === e[t].note
											? (e[t].note = 'A')
											: 'F' === e[t].note
											? (e[t].note = 'f')
											: 'E' === e[t].note
											? (e[t].note = 'e')
											: 'D' === e[t].note
											? (e[t].note = 'd')
											: 'C' === e[t].note
											? (e[t].note = 'c')
											: 'G' === e[t].note && 'sharp' === e[t].acc
											? (e[t].note = 'g')
											: 'g' === e[t].note && 'flat' === e[t].acc && (e[t].note = 'G');
								})(k.accs);
							for (var C = 0; C < k.accs.length; C++) {
								for (var T = !1, _ = 0; _ < r.key.accidentals.length && !T; _++)
									r.key.accidentals[_].note === k.accs[C].note &&
										((T = !0),
										r.key.accidentals[_].acc !== k.accs[C].acc &&
											((r.key.accidentals[_].acc = k.accs[C].acc),
											r.key.explicitAccidentals || (r.key.explicitAccidentals = []),
											r.key.explicitAccidentals.push(k.accs[C])));
								if (
									!T &&
									(r.key.explicitAccidentals || (r.key.explicitAccidentals = []),
									r.key.explicitAccidentals.push(k.accs[C]),
									r.key.accidentals.push(k.accs[C]),
									r.key.impliedNaturals)
								)
									for (var S = 0; S < r.key.impliedNaturals.length; S++)
										r.key.impliedNaturals[S].note === k.accs[C].note && r.key.impliedNaturals.splice(S, 1);
							}
						}
						for (; o.length > 0; )
							switch (o[0].token) {
								case 'm':
								case 'middle':
									if ((o.shift(), 0 === o.length)) return t('Expected = after middle', n, 0), c;
									if ('=' !== (w = o.shift()).token) {
										t('Expected = after middle', n, w.start);
										break;
									}
									if (0 === o.length) return t('Expected parameter after middle=', n, 0), c;
									var E = e.getPitchFromTokens(o);
									E.warn && t(E.warn, n, 0), E.position && (r.clef.verticalPos = E.position - 6);
									break;
								case 'transpose':
									if ((o.shift(), 0 === o.length)) return t('Expected = after transpose', n, 0), c;
									if ('=' !== (w = o.shift()).token) {
										t('Expected = after transpose', n, w.start);
										break;
									}
									if (0 === o.length) return t('Expected parameter after transpose=', n, 0), c;
									if ('number' !== o[0].type) {
										t('Expected number after transpose', n, o[0].start);
										break;
									}
									(r.clef.transpose = o[0].intt), o.shift();
									break;
								case 'stafflines':
									if ((o.shift(), 0 === o.length)) return t('Expected = after stafflines', n, 0), c;
									if ('=' !== (w = o.shift()).token) {
										t('Expected = after stafflines', n, w.start);
										break;
									}
									if (0 === o.length) return t('Expected parameter after stafflines=', n, 0), c;
									if ('number' !== o[0].type) {
										t('Expected number after stafflines', n, o[0].start);
										break;
									}
									(r.clef.stafflines = o[0].intt), o.shift();
									break;
								case 'staffscale':
									if ((o.shift(), 0 === o.length)) return t('Expected = after staffscale', n, 0), c;
									if ('=' !== (w = o.shift()).token) {
										t('Expected = after staffscale', n, w.start);
										break;
									}
									if (0 === o.length) return t('Expected parameter after staffscale=', n, 0), c;
									if ('number' !== o[0].type) {
										t('Expected number after staffscale', n, o[0].start);
										break;
									}
									(r.clef.staffscale = o[0].floatt), o.shift();
									break;
								case 'octave':
									if ((o.shift(), 0 === o.length)) return t('Expected = after octave', n, 0), c;
									if ('=' !== (w = o.shift()).token) {
										t('Expected = after octave', n, w.start);
										break;
									}
									if (0 === o.length) return t('Expected parameter after octave=', n, 0), c;
									if ('number' !== o[0].type) {
										t('Expected number after octave', n, o[0].start);
										break;
									}
									(r.octave = o[0].intt), o.shift();
									break;
								case 'style':
									if ((o.shift(), 0 === o.length)) return t('Expected = after style', n, 0), c;
									if ('=' !== (w = o.shift()).token) {
										t('Expected = after style', n, w.start);
										break;
									}
									if (0 === o.length) return t('Expected parameter after style=', n, 0), c;
									switch (o[0].token) {
										case 'normal':
										case 'harmonic':
										case 'rhythm':
										case 'x':
										case 'triangle':
											(r.style = o[0].token), o.shift();
											break;
										default:
											t('error parsing style element: ' + o[0].token, n, o[0].start);
									}
									break;
								case 'clef':
									if ((o.shift(), 0 === o.length)) return t('Expected = after clef', n, 0), c;
									if ('=' !== (w = o.shift()).token) {
										t('Expected = after clef', n, w.start);
										break;
									}
									if (0 === o.length) return t('Expected parameter after clef=', n, 0), c;
								case 'treble':
								case 'bass':
								case 'alto':
								case 'tenor':
								case 'perc':
								case 'none':
									var M = o.shift();
									switch (M.token) {
										case 'treble':
										case 'tenor':
										case 'alto':
										case 'bass':
										case 'perc':
										case 'none':
											break;
										case 'C':
										case 'c':
											M.token = 'alto';
											break;
										case 'F':
										case 'f':
											M.token = 'bass';
											break;
										case 'G':
										case 'g':
											M.token = 'treble';
											break;
										default:
											t('Expected clef name. Found ' + M.token, n, M.start);
									}
									o.length > 0 && 'number' === o[0].type && ((M.token += o[0].token), o.shift()),
										o.length > 1 &&
											('-' === o[0].token || '+' === o[0].token || '^' === o[0].token || '_' === o[0].token) &&
											'8' === o[1].token &&
											((M.token += o[0].token + o[1].token), o.shift(), o.shift()),
										(r.clef = { type: M.token, verticalPos: l(M.token, 0) }),
										r.currentVoice &&
											void 0 !== r.currentVoice.transpose &&
											(r.clef.transpose = r.currentVoice.transpose),
										(c.foundClef = !0);
									break;
								default:
									t('Unknown parameter: ' + o[0].token, n, o[0].start), o.shift();
							}
						return c;
					}),
						(s.parseVoice = function (n, i, a) {
							var s = e.getMeat(n, i, a),
								c = s.start,
								h = s.end,
								d = e.getToken(n, c, h);
							if (0 !== d.length) {
								var f = !1;
								void 0 === r.voices[d] &&
									((r.voices[d] = {}),
									(f = !0),
									r.score_is_present && t("Can't have an unknown V: id when the %score directive is present", n, c)),
									(c += d.length),
									(c += e.eatWhiteSpace(n, c));
								for (
									var p = { startStaff: f },
										m = function (r) {
											var i = e.getVoiceToken(n, c, h);
											void 0 !== i.warn
												? t('Expected value for ' + r + ' in voice: ' + i.warn, n, c)
												: void 0 !== i.err
												? t('Expected value for ' + r + ' in voice: ' + i.err, n, c)
												: 0 === i.token.length && '"' !== n[c]
												? t('Expected value for ' + r + ' in voice', n, c)
												: (p[r] = i.token),
												(c += i.len);
										},
										g = function (i, a, s) {
											var o = e.getVoiceToken(n, c, h);
											void 0 !== o.warn
												? t('Expected value for ' + a + ' in voice: ' + o.warn, n, c)
												: void 0 !== o.err
												? t('Expected value for ' + a + ' in voice: ' + o.err, n, c)
												: 0 === o.token.length && '"' !== n[c]
												? t('Expected value for ' + a + ' in voice', n, c)
												: ('number' === s && (o.token = parseFloat(o.token)), (r.voices[i][a] = o.token)),
												(c += o.len);
										},
										v = function (r, i) {
											var a = e.getVoiceToken(n, c, h);
											if (void 0 !== a.warn) t('Expected value for ' + r + ' in voice: ' + a.warn, n, c);
											else if (void 0 !== a.err) t('Expected value for ' + r + ' in voice: ' + a.err, n, c);
											else {
												if (0 !== a.token.length || '"' === n[c])
													return 'number' === i && (a.token = parseFloat(a.token)), a.token;
												t('Expected value for ' + r + ' in voice', n, c);
											}
											c += a.len;
										},
										b = function (i, a) {
											var s = e.getVoiceToken(n, c, h);
											if (void 0 !== s.warn)
												t('Expected one of (_B, _E, _b, _e) for ' + a + ' in voice: ' + s.warn, n, c);
											else if (0 === s.token.length && '"' !== n[c])
												t('Expected one of (_B, _E, _b, _e) for ' + a + ' in voice', n, c);
											else {
												var o = { _B: 2, _E: 9, _b: -10, _e: -3 }[s.token];
												o ? (r.voices[i][a] = o) : t('Expected one of (_B, _E, _b, _e) for ' + a + ' in voice', n, c);
											}
											c += s.len;
										};
									c < h;

								) {
									var y = e.getVoiceToken(n, c, h);
									if (((c += y.len), y.warn)) t('Error parsing voice: ' + y.warn, n, c);
									else {
										var x = null;
										switch (y.token) {
											case 'clef':
											case 'cl':
												m('clef');
												var w = 0;
												void 0 !== p.clef &&
													((p.clef = p.clef.replace(/[',]/g, '')),
													-1 !== p.clef.indexOf('+16') && ((w += 14), (p.clef = p.clef.replace('+16', ''))),
													(p.verticalPos = l(p.clef, w)));
												break;
											case 'treble':
											case 'bass':
											case 'tenor':
											case 'alto':
											case 'perc':
											case 'none':
											case "treble'":
											case "bass'":
											case "tenor'":
											case "alto'":
											case "none'":
											case "treble''":
											case "bass''":
											case "tenor''":
											case "alto''":
											case "none''":
											case 'treble,':
											case 'bass,':
											case 'tenor,':
											case 'alto,':
											case 'none,':
											case 'treble,,':
											case 'bass,,':
											case 'tenor,,':
											case 'alto,,':
											case 'none,,':
												(p.clef = y.token.replace(/[',]/g, '')),
													(p.verticalPos = l(p.clef, 0)),
													(r.voices[d].clef = y.token);
												break;
											case 'staves':
											case 'stave':
											case 'stv':
												m('staves');
												break;
											case 'brace':
											case 'brc':
												m('brace');
												break;
											case 'bracket':
											case 'brk':
												m('bracket');
												break;
											case 'name':
											case 'nm':
												m('name');
												break;
											case 'subname':
											case 'sname':
											case 'snm':
												m('subname');
												break;
											case 'merge':
												p.startStaff = !1;
												break;
											case 'stem':
											case 'stems':
												void 0 !== (x = e.getVoiceToken(n, c, h)).warn
													? t('Expected value for stems in voice: ' + x.warn, n, c)
													: void 0 !== x.err
													? t('Expected value for stems in voice: ' + x.err, n, c)
													: 'up' === x.token || 'down' === x.token
													? (r.voices[d].stem = x.token)
													: t('Expected up or down for voice stem', n, c),
													(c += x.len);
												break;
											case 'up':
											case 'down':
												r.voices[d].stem = y.token;
												break;
											case 'middle':
											case 'm':
												m('verticalPos'), (p.verticalPos = u(p.verticalPos).mid);
												break;
											case 'gchords':
											case 'gch':
												(r.voices[d].suppressChords = !0), '0' === (x = e.getVoiceToken(n, c, h)).token && (c += x.len);
												break;
											case 'space':
											case 'spc':
												m('spacing');
												break;
											case 'scale':
												g(d, 'scale', 'number');
												break;
											case 'score':
												b(d, 'scoreTranspose');
												break;
											case 'transpose':
												g(d, 'transpose', 'number');
												break;
											case 'stafflines':
												g(d, 'stafflines', 'number');
												break;
											case 'staffscale':
												g(d, 'staffscale', 'number');
												break;
											case 'octave':
												g(d, 'octave', 'number');
												break;
											case 'volume':
												g(d, 'volume', 'number');
												break;
											case 'cue':
												var k = v('cue', 'string');
												r.voices[d].scale = 'on' === k ? 0.6 : 1;
												break;
											case 'style':
												void 0 !== (x = e.getVoiceToken(n, c, h)).warn
													? t('Expected value for style in voice: ' + x.warn, n, c)
													: void 0 !== x.err
													? t('Expected value for style in voice: ' + x.err, n, c)
													: 'normal' === x.token ||
													  'harmonic' === x.token ||
													  'rhythm' === x.token ||
													  'x' === x.token ||
													  'triangle' === x.token
													? (r.voices[d].style = x.token)
													: t('Expected one of [normal, harmonic, rhythm, x, triangle] for voice style', n, c),
													(c += x.len);
										}
									}
									c += e.eatWhiteSpace(n, c);
								}
								if (
									((p.startStaff || 0 === r.staves.length) &&
										(r.staves.push({ index: r.staves.length, meter: r.origMeter }),
										r.score_is_present || (r.staves[r.staves.length - 1].numVoices = 0)),
									void 0 === r.voices[d].staffNum)
								) {
									r.voices[d].staffNum = r.staves.length - 1;
									var C = 0;
									for (var T in r.voices)
										r.voices.hasOwnProperty(T) && r.voices[T].staffNum === r.voices[d].staffNum && C++;
									r.voices[d].index = C - 1;
								}
								var _ = r.staves[r.voices[d].staffNum];
								r.score_is_present || _.numVoices++,
									p.clef && (_.clef = { type: p.clef, verticalPos: p.verticalPos }),
									p.spacing && (_.spacing_below_offset = p.spacing),
									p.verticalPos && (_.verticalPos = p.verticalPos),
									p.name && (_.name ? _.name.push(p.name) : (_.name = [p.name])),
									p.subname && (_.subname ? _.subname.push(p.subname) : (_.subname = [p.subname])),
									(function (e) {
										(r.currentVoice = r.voices[e]), o.setCurrentVoice(r.currentVoice.staffNum, r.currentVoice.index);
									})(d);
							} else t('Expected a voice id', n, c);
						});
				})(),
					(e.exports = s);
			},
			6476: function (e, t, r) {
				var n,
					i,
					a,
					s,
					o,
					c,
					l = r(5008),
					h = r(9708),
					u = r(2821),
					d = function (e, t, r, l, h, u) {
						(n = e), (i = t), (a = r), (s = l), (o = h), (c = u), (this.lineContinuation = !1);
					},
					f = function (e, t, r) {
						if (void 0 === e.inTie[t]) return !1;
						var n = e.currentVoice ? 100 * e.currentVoice.staffNum + e.currentVoice.index : 0;
						return !(!e.inTie[t][n] || (void 0 === r.pitches && 'spacer' === r.rest.type));
					},
					p = {};
				d.prototype.parseMusic = function (e) {
					c.resolveTempo(), (a.is_in_header = !1);
					for (var t = 0, r = a.iChar; n.isWhiteSpace(e[t]) && t < e.length; ) t++;
					if (t !== e.length && '%' !== e[t]) {
						var l = a.start_new_line;
						void 0 === a.continueall ? (a.start_new_line = !0) : (a.start_new_line = !1);
						var h = 0,
							u = c.letter_to_body_header(e, t);
						u[0] > 0 && ((t += u[0]), 'V' === u[1] && this.startNewLine());
						for (var d = 0; t < e.length; ) {
							var x = t;
							if ('%' === e[t]) break;
							var w = c.letter_to_inline_header(e, t, l);
							if (w[0] > 0) (t += w[0]), 'V' === w[1] && (l = !0);
							else {
								var k;
								for ((!o.hasBeginMusic() || (l && !this.lineContinuation)) && (this.startNewLine(), (l = !1)); ; )
									if (
										((k = n.eatWhiteSpace(e, t)) > 0 && (t += k),
										t > 0 &&
											'' === e[t - 1] &&
											(k = c.letter_to_body_header(e, t))[0] > 0 &&
											('V' === k[1] && this.startNewLine(), (t = k[0]), (a.start_new_line = !1)),
										(k = S(e, t))[0] > 0 && (t += k[0]),
										(k = g(e, t))[0] > 0)
									) {
										p.chord || (p.chord = []);
										var C = n.translateString(k[1]);
										C = C.replace(/;/g, '\n');
										for (var T = !1, M = 0; M < p.chord.length; M++)
											p.chord[M].position === k[2] && ((T = !0), (p.chord[M].name += '\n' + C));
										!1 === T &&
											(null === k[2] && k[3]
												? p.chord.push({ name: C, rel_position: k[3] })
												: p.chord.push({ name: C, position: k[2] })),
											(t += k[0]);
										var B = n.skipWhiteSpace(e.substring(t));
										B > 0 && (p.force_end_beam_last = !0), (t += B);
									} else if ((k = -1 === 'ABCDEFGabcdefgxyzZ[]|^_{'.indexOf(e[t]) ? _(e, t) : [0])[0] > 0)
										null === k[1]
											? t + 1 < e.length && this.startNewLine()
											: k[1].length > 0 &&
											  (0 === k[1].indexOf('style=')
													? (p.style = k[1].substr(6))
													: (void 0 === p.decoration && (p.decoration = []),
													  'beambr1' === k[1]
															? (p.beambr = 1)
															: 'beambr2' === k[1]
															? (p.beambr = 2)
															: p.decoration.push(k[1]))),
											(t += k[0]);
									else {
										if (!((k = v(e, t))[0] > 0)) break;
										(p.gracenotes = k[1]), (t += k[0]);
									}
								if ((k = E(e, t))[0] > 0) {
									(d = 0),
										void 0 !== p.gracenotes &&
											((p.rest = { type: 'spacer' }),
											(p.duration = 0.125),
											a.addFormattingOptions(p, s.formatting, 'note'),
											o.appendElement('note', r + t, r + t + k[0], p),
											(a.measureNotEmpty = !0),
											(p = {}));
									var P = { type: k[1] };
									0 === P.type.length
										? i('Unknown bar type', e, t)
										: (a.inEnding && 'bar_thin' !== P.type && ((P.endEnding = !0), (a.inEnding = !1)),
										  k[2] &&
												((P.startEnding = k[2]),
												a.inEnding && (P.endEnding = !0),
												(a.inEnding = !0),
												'bar_right_repeat' === k[1]
													? a.restoreStartEndingHoldOvers()
													: a.duplicateStartEndingHoldOvers()),
										  void 0 !== p.decoration && (P.decoration = p.decoration),
										  void 0 !== p.chord && (P.chord = p.chord),
										  P.startEnding && void 0 === a.barFirstEndingNum
												? (a.barFirstEndingNum = a.currBarNumber)
												: P.startEnding && P.endEnding && a.barFirstEndingNum
												? (a.currBarNumber = a.barFirstEndingNum)
												: P.endEnding && (a.barFirstEndingNum = void 0),
										  'bar_invisible' !== P.type &&
												a.measureNotEmpty &&
												(void 0 === a.currentVoice || (0 === a.currentVoice.staffNum && 0 === a.currentVoice.index)) &&
												(a.currBarNumber++,
												a.barNumbers && a.currBarNumber % a.barNumbers == 0 && (P.barNumber = a.currBarNumber)),
										  a.addFormattingOptions(p, s.formatting, 'bar'),
										  o.appendElement('bar', r + x, r + t + k[0], P),
										  (a.measureNotEmpty = !1),
										  (p = {})),
										(t += k[0]);
								} else if ('&' === e[t])
									(k = b(e, t))[0] > 0 && (o.appendElement('overlay', r, r + 1, {}), (t += 1), d++);
								else {
									if (
										((k = N(e, t)).consumed > 0 &&
											(void 0 !== k.startSlur && (p.startSlur = k.startSlur),
											k.dottedSlur && (p.dottedSlur = !0),
											void 0 !== k.triplet &&
												(h > 0
													? i("Can't nest triplets", e, t)
													: ((p.startTriplet = k.triplet),
													  (p.tripletMultiplier = k.tripletQ / k.triplet),
													  (p.tripletR = k.num_notes),
													  (h = void 0 === k.num_notes ? k.triplet : k.num_notes))),
											(t += k.consumed)),
										'[' === e[t])
									) {
										t++;
										for (var L = null, z = !1, D = !1; !D; ) {
											var F = _(e, t);
											F[0] > 0 && (t += F[0]);
											var I = H(e, t, {}, !1);
											if (null !== I && void 0 !== I.pitch)
												F[0] > 0 &&
													0 !== F[1].indexOf('style=') &&
													(void 0 === p.decoration && (p.decoration = []), p.decoration.push(F[1])),
													I.end_beam && ((p.end_beam = !0), delete I.end_beam),
													void 0 === p.pitches ? ((p.duration = I.duration), (p.pitches = [I])) : p.pitches.push(I),
													delete I.duration,
													F[0] > 0 &&
														0 === F[1].indexOf('style=') &&
														(p.pitches[p.pitches.length - 1].style = F[1].substr(6)),
													a.inTieChord[p.pitches.length] &&
														((I.endTie = !0), (a.inTieChord[p.pitches.length] = void 0)),
													I.startTie && (a.inTieChord[p.pitches.length] = !0),
													(t = I.endChar),
													delete I.endChar;
											else if (' ' === e[t]) i('Spaces are not allowed in chords', e, t), t++;
											else {
												if (t < e.length && ']' === e[t]) {
													t++,
														0 !== a.next_note_duration &&
															((p.duration = p.duration * a.next_note_duration), (a.next_note_duration = 0)),
														f(a, d, p) &&
															(p.pitches.forEach(function (e) {
																e.endTie = !0;
															}),
															m(a, d, !1)),
														h > 0 && (!p.rest || 'spacer' !== p.rest.type) && 0 == --h && (p.endTriplet = !0);
													for (var j = !1; t < e.length && !j; ) {
														switch (e[t]) {
															case ' ':
															case '\t':
																A(p);
																break;
															case ')':
																void 0 === p.endSlur ? (p.endSlur = 1) : p.endSlur++;
																break;
															case '-':
																p.pitches.forEach(function (e) {
																	e.startTie = {};
																}),
																	m(a, d, !0);
																break;
															case '>':
															case '<':
																var V = O(e, t);
																(t += V[0] - 1), (a.next_note_duration = V[2]), L ? (L *= V[1]) : (L = V[1]);
																break;
															case '1':
															case '2':
															case '3':
															case '4':
															case '5':
															case '6':
															case '7':
															case '8':
															case '9':
															case '/':
																var G = n.getFraction(e, t);
																L = G.value;
																var Y = e[(t = G.index)];
																' ' === Y && (z = !0),
																	'-' === Y || ')' === Y || ' ' === Y || '<' === Y || '>' === Y ? t-- : (j = !0);
																break;
															default:
																j = !0;
														}
														j || t++;
													}
												} else i("Expected ']' to end the chords", e, t);
												void 0 !== p.pitches &&
													(null !== L && ((p.duration = p.duration * L), z && A(p)),
													a.addFormattingOptions(p, s.formatting, 'note'),
													o.appendElement('note', r + x, r + t, p),
													(a.measureNotEmpty = !0),
													(p = {})),
													(D = !0);
											}
										}
									} else {
										var q = {},
											W = H(e, t, q, !0);
										void 0 !== q.endTie && m(a, d, !0),
											null !== W &&
												(void 0 !== W.pitch
													? ((p.pitches = [{}]),
													  void 0 !== W.accidental && (p.pitches[0].accidental = W.accidental),
													  (p.pitches[0].pitch = W.pitch),
													  (p.pitches[0].name = W.name),
													  (W.midipitch || 0 === W.midipitch) && (p.pitches[0].midipitch = W.midipitch),
													  void 0 !== W.endSlur && (p.pitches[0].endSlur = W.endSlur),
													  void 0 !== W.endTie && (p.pitches[0].endTie = W.endTie),
													  void 0 !== W.startSlur && (p.pitches[0].startSlur = W.startSlur),
													  void 0 !== p.startSlur && (p.pitches[0].startSlur = p.startSlur),
													  void 0 !== p.dottedSlur && (p.pitches[0].dottedSlur = !0),
													  void 0 !== W.startTie && (p.pitches[0].startTie = W.startTie),
													  void 0 !== p.startTie && (p.pitches[0].startTie = p.startTie))
													: ((p.rest = W.rest),
													  void 0 !== W.endSlur && (p.endSlur = W.endSlur),
													  void 0 !== W.endTie && (p.rest.endTie = W.endTie),
													  void 0 !== W.startSlur && (p.startSlur = W.startSlur),
													  void 0 !== W.startTie && (p.rest.startTie = W.startTie),
													  void 0 !== p.startTie && (p.rest.startTie = p.startTie)),
												void 0 !== W.chord && (p.chord = W.chord),
												void 0 !== W.duration && (p.duration = W.duration),
												void 0 !== W.decoration && (p.decoration = W.decoration),
												void 0 !== W.graceNotes && (p.graceNotes = W.graceNotes),
												delete p.startSlur,
												delete p.dottedSlur,
												f(a, d, p) &&
													(void 0 !== p.pitches
														? (p.pitches[0].endTie = !0)
														: 'spacer' !== p.rest.type && (p.rest.endTie = !0),
													m(a, d, !1)),
												(W.startTie || p.startTie) && m(a, d, !0),
												(t = W.endChar),
												h > 0 && (!W.rest || 'spacer' !== W.rest.type) && 0 == --h && (p.endTriplet = !0),
												W.end_beam && A(p),
												p.rest &&
													'rest' === p.rest.type &&
													1 === p.duration &&
													y(a) <= 1 &&
													((p.rest.type = 'whole'), (p.duration = y(a))),
												p.duration < 1 &&
													-1 ===
														[
															0.5, 0.75, 0.875, 0.9375, 0.96875, 0.984375, 0.25, 0.375, 0.4375, 0.46875, 0.484375,
															0.4921875, 0.125, 0.1875, 0.21875, 0.234375, 0.2421875, 0.24609375, 0.0625, 0.09375,
															0.109375, 0.1171875, 0.12109375, 0.123046875, 0.03125, 0.046875, 0.0546875, 0.05859375,
															0.060546875, 0.0615234375, 0.015625, 0.0234375, 0.02734375, 0.029296875, 0.0302734375,
															0.03076171875
														].indexOf(p.duration) &&
													0 !== p.duration &&
													((p.rest && 'spacer' === p.rest.type) ||
														i('Duration not representable: ' + e.substring(x, t), e, t)),
												a.addFormattingOptions(p, s.formatting, 'note'),
												o.appendElement('note', r + x, r + t, p),
												(a.measureNotEmpty = !0),
												(p = {}));
									}
									t === x && (' ' !== e[t] && '`' !== e[t] && i('Unknown character ignored', e, t), t++);
								}
							}
						}
						(this.lineContinuation = e.indexOf('') >= 0 || u[0] > 0), this.lineContinuation || (p = {});
					}
				};
				var m = function (e, t, r) {
						var n = e.currentVoice ? 100 * e.currentVoice.staffNum + e.currentVoice.index : 0;
						void 0 === e.inTie[t] && (e.inTie[t] = []), (e.inTie[t][n] = r);
					},
					g = function (e, t) {
						if ('"' === e[t]) {
							var r = n.getBrackettedSubstring(e, t, 5);
							if (
								(r[2] || i('Missing the closing quote while parsing the chord symbol', e, t),
								r[0] > 0 && r[1].length > 0 && '^' === r[1][0])
							)
								(r[1] = r[1].substring(1)), (r[2] = 'above');
							else if (r[0] > 0 && r[1].length > 0 && '_' === r[1][0]) (r[1] = r[1].substring(1)), (r[2] = 'below');
							else if (r[0] > 0 && r[1].length > 0 && '<' === r[1][0]) (r[1] = r[1].substring(1)), (r[2] = 'left');
							else if (r[0] > 0 && r[1].length > 0 && '>' === r[1][0]) (r[1] = r[1].substring(1)), (r[2] = 'right');
							else if (r[0] > 0 && r[1].length > 0 && '@' === r[1][0]) {
								r[1] = r[1].substring(1);
								var s = n.getFloat(r[1]);
								0 === s.digits && i('Missing first position in absolutely positioned annotation.', e, t),
									(r[1] = r[1].substring(s.digits)),
									',' !== r[1][0] && i('Missing comma absolutely positioned annotation.', e, t),
									(r[1] = r[1].substring(1));
								var o = n.getFloat(r[1]);
								0 === o.digits && i('Missing second position in absolutely positioned annotation.', e, t),
									(r[1] = r[1].substring(o.digits));
								var c = n.skipWhiteSpace(r[1]);
								(r[1] = r[1].substring(c)), (r[2] = null), (r[3] = { x: s.value, y: o.value });
							} else
								!0 !== a.freegchord &&
									((r[1] = r[1].replace(/([ABCDEFG0-9])b/g, '$1♭')),
									(r[1] = r[1].replace(/([ABCDEFG0-9])#/g, '$1♯')),
									(r[1] = r[1].replace(/^([ABCDEFG])([♯♭]?)o([^A-Za-z])/g, '$1$2°$3')),
									(r[1] = r[1].replace(/^([ABCDEFG])([♯♭]?)o$/g, '$1$2°')),
									(r[1] = r[1].replace(/^([ABCDEFG])([♯♭]?)0([^A-Za-z])/g, '$1$2ø$3')),
									(r[1] = r[1].replace(/^([ABCDEFG])([♯♭]?)\^([^A-Za-z])/g, '$1$2∆$3'))),
									(r[2] = 'default'),
									(r[1] = u.chordName(a, r[1]));
							return r;
						}
						return [0, ''];
					},
					v = function (e, t) {
						if ('{' === e[t]) {
							var r = n.getBrackettedSubstring(e, t, 1, '}');
							r[2] || i("Missing the closing '}' while parsing grace note", e, t),
								')' === e[t + r[0]] && (r[0]++, (r[1] += ')'));
							for (var s = [], o = 0, c = !1; o < r[1].length; ) {
								var l = !1;
								'/' === r[1][o] && ((l = !0), o++);
								var h = H(r[1], o, {}, !1);
								null !== h
									? ((h.duration = h.duration / (8 * a.default_length)),
									  l && (h.acciaccatura = !0),
									  s.push(h),
									  c && ((h.endTie = !0), (c = !1)),
									  h.startTie && (c = !0),
									  (o = h.endChar),
									  delete h.endChar,
									  h.end_beam && ((h.endBeam = !0), delete h.end_beam))
									: (' ' === r[1][o]
											? s.length > 0 && (s[s.length - 1].endBeam = !0)
											: i("Unknown character '" + r[1][o] + "' while parsing grace note", e, t),
									  o++);
							}
							if (s.length) return [r[0], s];
						}
						return [0];
					};
				function b(e, t) {
					if ('&' === e[t]) {
						for (var r = t; e[t] && ':' !== e[t] && '|' !== e[t]; ) t++;
						return [t - r, e.substring(r + 1, t)];
					}
					return [0];
				}
				function y(e) {
					var t = e.origMeter;
					return t && 'specified' === t.type && t.value && 0 !== t.value.length
						? parseInt(t.value[0].num, 10) / parseInt(t.value[0].den, 10)
						: 1;
				}
				var x = [
						'trill',
						'lowermordent',
						'uppermordent',
						'mordent',
						'pralltriller',
						'accent',
						'fermata',
						'invertedfermata',
						'tenuto',
						'0',
						'1',
						'2',
						'3',
						'4',
						'5',
						'+',
						'wedge',
						'open',
						'thumb',
						'snap',
						'turn',
						'roll',
						'breath',
						'shortphrase',
						'mediumphrase',
						'longphrase',
						'segno',
						'coda',
						'D.S.',
						'D.C.',
						'fine',
						'beambr1',
						'beambr2',
						'slide',
						'marcato',
						'upbow',
						'downbow',
						'/',
						'//',
						'///',
						'////',
						'trem1',
						'trem2',
						'trem3',
						'trem4',
						'turnx',
						'invertedturn',
						'invertedturnx',
						'trill(',
						'trill)',
						'arpeggio',
						'xstem',
						'mark',
						'umarcato',
						'style=normal',
						'style=harmonic',
						'style=rhythm',
						'style=x',
						'style=triangle',
						'D.C.alcoda',
						'D.C.alfine',
						'D.S.alcoda',
						'D.S.alfine',
						'editorial',
						'courtesy'
					],
					w = ['p', 'pp', 'f', 'ff', 'mf', 'mp', 'ppp', 'pppp', 'fff', 'ffff', 'sfz'],
					k = ['crescendo(', 'crescendo)', 'diminuendo(', 'diminuendo)', 'glissando(', 'glissando)'],
					C = [
						['<', 'accent'],
						['>', 'accent'],
						['tr', 'trill'],
						['plus', '+'],
						['emphasis', 'accent'],
						['^', 'umarcato'],
						['marcato', 'umarcato']
					],
					T = [
						['<(', 'crescendo('],
						['<)', 'crescendo)'],
						['>(', 'diminuendo('],
						['>)', 'diminuendo)']
					],
					_ = function (e, t) {
						var r = a.macros[e[t]];
						if (void 0 !== r)
							return (
								('!' !== r[0] && '+' !== r[0]) || (r = r.substring(1)),
								('!' !== r[r.length - 1] && '+' !== r[r.length - 1]) || (r = r.substring(0, r.length - 1)),
								x.includes(r)
									? [1, r]
									: w.includes(r)
									? ('hidden' === a.volumePosition && (r = ''), [1, r])
									: k.includes(r)
									? ('hidden' === a.dynamicPosition && (r = ''), [1, r])
									: (a.ignoredDecorations.includes(r) || i('Unknown macro: ' + r, e, t), [1, ''])
							);
						switch (e[t]) {
							case '.':
								if ('(' === e[t + 1] || '-' === e[t + 1]) break;
								return [1, 'staccato'];
							case 'u':
								return [1, 'upbow'];
							case 'v':
								return [1, 'downbow'];
							case '~':
								return [1, 'irishroll'];
							case '!':
							case '+':
								var s = n.getBrackettedSubstring(e, t, 5);
								if (
									(s[1].length > 1 && ('^' === s[1][0] || '_' === s[1][0]) && (s[1] = s[1].substring(1)),
									x.includes(s[1]))
								)
									return s;
								if (w.includes(s[1])) return 'hidden' === a.volumePosition && (s[1] = ''), s;
								if (k.includes(s[1])) return 'hidden' === a.dynamicPosition && (s[1] = ''), s;
								var o = C.findIndex(function (e) {
									return s[1] === e[0];
								});
								return o >= 0
									? ((s[1] = C[o][1]), s)
									: (o = T.findIndex(function (e) {
											return s[1] === e[0];
									  })) >= 0
									? ((s[1] = T[o][1]), 'hidden' === a.dynamicPosition && (s[1] = ''), s)
									: '!' !== e[t] || (1 !== s[0] && '!' === e[t + s[0] - 1])
									? (i('Unknown decoration: ' + s[1], e, t), (s[1] = ''), s)
									: [1, null];
							case 'H':
								return [1, 'fermata'];
							case 'J':
								return [1, 'slide'];
							case 'L':
								return [1, 'accent'];
							case 'M':
								return [1, 'mordent'];
							case 'O':
								return [1, 'coda'];
							case 'P':
								return [1, 'pralltriller'];
							case 'R':
								return [1, 'roll'];
							case 'S':
								return [1, 'segno'];
							case 'T':
								return [1, 'trill'];
						}
						return [0, 0];
					},
					S = function (e, t) {
						for (var r = t; n.isWhiteSpace(e[t]); ) t++;
						return [t - r];
					},
					E = function (e, t) {
						var r = n.getBarLine(e, t);
						if (0 === r.len) return [0, ''];
						if (r.warn) return i(r.warn, e, t), [r.len, ''];
						for (var a = 0; a < e.length && ' ' === e[t + r.len + a]; a++);
						var s = r.len;
						if (('[' === e[t + r.len + a] && (r.len += a + 1), '"' === e[t + r.len] && '[' === e[t + r.len - 1])) {
							var o = n.getBrackettedSubstring(e, t + r.len, 5);
							return [r.len + o[0], r.token, o[1]];
						}
						var c = n.getTokenOf(e.substring(t + r.len), '1234567890-,');
						return 0 === c.len || '-' === c.token[0] ? [s, r.token] : [r.len + c.len, r.token, c.token];
					},
					M = { 2: 3, 3: 2, 4: 3, 5: 2, 6: 2, 7: 2, 8: 3, 9: 2 },
					N = function (e, t) {
						var r = {},
							a = t;
						for ('.' === e[t] && '(' === e[t + 1] && ((r.dottedSlur = !0), t++); '(' === e[t] || n.isWhiteSpace(e[t]); )
							'(' === e[t] &&
								(t + 1 < e.length && e[t + 1] >= '2' && e[t + 1] <= '9'
									? (void 0 !== r.triplet
											? i("Can't nest triplets", e, t)
											: ((r.triplet = e[t + 1] - '0'),
											  (r.tripletQ = M[r.triplet]),
											  (r.num_notes = r.triplet),
											  t + 2 < e.length &&
													':' === e[t + 2] &&
													(t + 3 < e.length && ':' === e[t + 3]
														? t + 4 < e.length && e[t + 4] >= '1' && e[t + 4] <= '9'
															? ((r.num_notes = e[t + 4] - '0'), (t += 3))
															: i('expected number after the two colons after the triplet to mark the duration', e, t)
														: t + 3 < e.length && e[t + 3] >= '1' && e[t + 3] <= '9'
														? ((r.tripletQ = e[t + 3] - '0'),
														  t + 4 < e.length && ':' === e[t + 4]
																? t + 5 < e.length &&
																  e[t + 5] >= '1' &&
																  e[t + 5] <= '9' &&
																  ((r.num_notes = e[t + 5] - '0'), (t += 4))
																: (t += 2))
														: i('expected number after the triplet to mark the duration', e, t))),
									  t++)
									: void 0 === r.startSlur
									? (r.startSlur = 1)
									: r.startSlur++),
								t++;
						return (r.consumed = t - a), r;
					};
				d.prototype.startNewLine = function () {
					var e = { startChar: -1, endChar: -1 };
					a.partForNextLine.title && (e.part = a.partForNextLine),
						(e.clef =
							a.currentVoice && void 0 !== a.staves[a.currentVoice.staffNum].clef
								? l.clone(a.staves[a.currentVoice.staffNum].clef)
								: l.clone(a.clef));
					var t = a.currentVoice ? a.currentVoice.scoreTranspose : 0;
					if (
						((e.key = h.standardKey(a.key.root + a.key.acc + a.key.mode, a.key.root, a.key.acc, t)),
						(e.key.mode = a.key.mode),
						a.key.impliedNaturals && (e.key.impliedNaturals = a.key.impliedNaturals),
						a.key.explicitAccidentals)
					)
						for (var r = 0; r < a.key.explicitAccidentals.length; r++) {
							for (var n = !1, i = 0; i < e.key.accidentals.length; i++)
								e.key.accidentals[i].note === a.key.explicitAccidentals[r].note &&
									((e.key.accidentals[i].acc = a.key.explicitAccidentals[r].acc), (n = !0));
							n || e.key.accidentals.push(a.key.explicitAccidentals[r]);
						}
					if (
						((a.targetKey = e.key),
						e.key.explicitAccidentals && delete e.key.explicitAccidentals,
						h.addPosToKey(e.clef, e.key),
						null !== a.meter
							? (a.currentVoice
									? (a.staves.forEach(function (e) {
											e.meter = a.meter;
									  }),
									  (e.meter = a.staves[a.currentVoice.staffNum].meter),
									  (a.staves[a.currentVoice.staffNum].meter = null))
									: (e.meter = a.meter),
							  (a.meter = null))
							: a.currentVoice &&
							  a.staves[a.currentVoice.staffNum].meter &&
							  ((e.meter = a.staves[a.currentVoice.staffNum].meter), (a.staves[a.currentVoice.staffNum].meter = null)),
						a.currentVoice && a.currentVoice.name && (e.name = a.currentVoice.name),
						a.vocalfont && (e.vocalfont = a.vocalfont),
						a.tripletfont && (e.tripletfont = a.tripletfont),
						a.gchordfont && (e.gchordfont = a.gchordfont),
						a.style && (e.style = a.style),
						a.currentVoice)
					) {
						var s = a.staves[a.currentVoice.staffNum];
						s.brace && (e.brace = s.brace),
							s.bracket && (e.bracket = s.bracket),
							s.connectBarLines && (e.connectBarLines = s.connectBarLines),
							s.name && (e.name = s.name[a.currentVoice.index]),
							s.subname && (e.subname = s.subname[a.currentVoice.index]),
							a.currentVoice.stem && (e.stem = a.currentVoice.stem),
							a.currentVoice.stafflines && (e.stafflines = a.currentVoice.stafflines),
							a.currentVoice.staffscale && (e.staffscale = a.currentVoice.staffscale),
							a.currentVoice.scale && (e.scale = a.currentVoice.scale),
							a.currentVoice.color && (e.color = a.currentVoice.color),
							a.currentVoice.style && (e.style = a.currentVoice.style),
							a.currentVoice.transpose && (e.clef.transpose = a.currentVoice.transpose);
					}
					var c = void 0 === a.currentVoice || (0 === a.currentVoice.staffNum && 0 === a.currentVoice.index);
					0 === a.barNumbers && c && 1 !== a.currBarNumber && (e.barNumber = a.currBarNumber),
						o.startNewLine(e),
						a.key.impliedNaturals && delete a.key.impliedNaturals,
						(a.partForNextLine = {}),
						4 === a.tempoForNextLine.length &&
							o.appendElement(
								a.tempoForNextLine[0],
								a.tempoForNextLine[1],
								a.tempoForNextLine[2],
								a.tempoForNextLine[3]
							),
						(a.tempoForNextLine = []);
				};
				var A = function (e) {
						return void 0 !== e.duration && e.duration < 0.25 && (e.end_beam = !0), e;
					},
					B = { A: 5, B: 6, C: 0, D: 1, E: 2, F: 3, G: 4, a: 12, b: 13, c: 7, d: 8, e: 9, f: 10, g: 11 },
					P = { x: 'invisible', X: 'invisible-multimeasure', y: 'spacer', z: 'rest', Z: 'multimeasure' },
					L = {
						dblflat: '__',
						flat: '_',
						natural: '=',
						sharp: '^',
						dblsharp: '^^',
						quarterflat: '_/',
						quartersharp: '^/'
					},
					H = function (e, t, r, i) {
						var c,
							l = function (e) {
								return (
									'octave' === e || 'duration' === e || 'Zduration' === e || 'broken_rhythm' === e || 'end_slur' === e
								);
							};
						'.' === e[t] && '-' === e[t + 1] && ((c = !0), t++);
						for (var h = 'startSlur', d = !1; ; ) {
							switch (e[t]) {
								case '(':
									if ('startSlur' !== h) return l(h) ? ((r.endChar = t), r) : null;
									void 0 === r.startSlur ? (r.startSlur = 1) : r.startSlur++;
									break;
								case ')':
									if (!l(h)) return null;
									void 0 === r.endSlur ? (r.endSlur = 1) : r.endSlur++;
									break;
								case '^':
									if ('startSlur' === h) (r.accidental = 'sharp'), (h = 'sharp2');
									else {
										if ('sharp2' !== h) return l(h) ? ((r.endChar = t), r) : null;
										(r.accidental = 'dblsharp'), (h = 'pitch');
									}
									break;
								case '_':
									if ('startSlur' === h) (r.accidental = 'flat'), (h = 'flat2');
									else {
										if ('flat2' !== h) return l(h) ? ((r.endChar = t), r) : null;
										(r.accidental = 'dblflat'), (h = 'pitch');
									}
									break;
								case '=':
									if ('startSlur' !== h) return l(h) ? ((r.endChar = t), r) : null;
									(r.accidental = 'natural'), (h = 'pitch');
									break;
								case 'A':
								case 'B':
								case 'C':
								case 'D':
								case 'E':
								case 'F':
								case 'G':
								case 'a':
								case 'b':
								case 'c':
								case 'd':
								case 'e':
								case 'f':
								case 'g':
									if ('startSlur' !== h && 'sharp2' !== h && 'flat2' !== h && 'pitch' !== h)
										return l(h) ? ((r.endChar = t), r) : null;
									if (
										((r.pitch = B[e[t]]),
										(r.pitch +=
											7 * (a.currentVoice && void 0 !== a.currentVoice.octave ? a.currentVoice.octave : a.octave)),
										(r.name = e[t]),
										r.accidental && (r.name = L[r.accidental] + r.name),
										u.note(a, r),
										(h = 'octave'),
										i && 0 !== a.next_note_duration
											? ((r.duration = a.default_length * a.next_note_duration), (a.next_note_duration = 0), (d = !0))
											: (r.duration = a.default_length),
										(a.clef && 'perc' === a.clef.type) || (a.currentVoice && 'perc' === a.currentVoice.clef))
									) {
										var f = e[t];
										r.accidental && (f = L[r.accidental] + f),
											s.formatting &&
												s.formatting.midi &&
												s.formatting.midi.drummap &&
												(r.midipitch = s.formatting.midi.drummap[f]);
									}
									break;
								case ',':
									if ('octave' !== h) return l(h) ? ((r.endChar = t), r) : null;
									(r.pitch -= 7), (r.name += ',');
									break;
								case "'":
									if ('octave' !== h) return l(h) ? ((r.endChar = t), r) : null;
									(r.pitch += 7), (r.name += "'");
									break;
								case 'x':
								case 'X':
								case 'y':
								case 'z':
								case 'Z':
									if ('startSlur' !== h) return l(h) ? ((r.endChar = t), r) : null;
									(r.rest = { type: P[e[t]] }),
										delete r.accidental,
										delete r.startSlur,
										delete r.startTie,
										delete r.endSlur,
										delete r.endTie,
										delete r.end_beam,
										delete r.grace_notes,
										r.rest.type.indexOf('multimeasure') >= 0
											? ((r.duration = s.getBarLength()), (r.rest.text = 1), (h = 'Zduration'))
											: (i && 0 !== a.next_note_duration
													? ((r.duration = a.default_length * a.next_note_duration),
													  (a.next_note_duration = 0),
													  (d = !0))
													: (r.duration = a.default_length),
											  (h = 'duration'));
									break;
								case '1':
								case '2':
								case '3':
								case '4':
								case '5':
								case '6':
								case '7':
								case '8':
								case '9':
								case '0':
								case '/':
									if ('octave' === h || 'duration' === h) {
										var p = n.getFraction(e, t);
										for (
											r.duration = r.duration * p.value, r.endChar = p.index;
											p.index < e.length && (n.isWhiteSpace(e[p.index]) || '-' === e[p.index]);

										)
											'-' === e[p.index] ? (r.startTie = {}) : (r = A(r)), p.index++;
										(t = p.index - 1), (h = 'broken_rhythm');
									} else if ('sharp2' === h) (r.accidental = 'quartersharp'), (h = 'pitch');
									else {
										if ('flat2' !== h) {
											if ('Zduration' === h) {
												var m = n.getNumber(e, t);
												return (r.duration = m.num * s.getBarLength()), (r.rest.text = m.num), (r.endChar = m.index), r;
											}
											return null;
										}
										(r.accidental = 'quarterflat'), (h = 'pitch');
									}
									break;
								case '-':
									if ('startSlur' === h) o.addTieToLastNote(c), (r.endTie = !0);
									else {
										if ('octave' !== h && 'duration' !== h && 'end_slur' !== h)
											return 'broken_rhythm' === h ? ((r.endChar = t), r) : null;
										if (((r.startTie = {}), d || !i)) return n.isWhiteSpace(e[t + 1]) && A(r), (r.endChar = t + 1), r;
										h = 'broken_rhythm';
									}
									break;
								case ' ':
								case '\t':
									if (!l(h)) return null;
									(r.end_beam = !0), (c = !1);
									do {
										'.' === e[t] && '-' === e[t + 1] && ((c = !0), t++),
											'-' === e[t] && ((r.startTie = {}), c && (r.startTie.style = 'dotted')),
											t++;
									} while (
										(t < e.length && (n.isWhiteSpace(e[t]) || '-' === e[t])) ||
										('.' === e[t] && '-' === e[t + 1])
									);
									if (((r.endChar = t), d || !i || ('<' !== e[t] && '>' !== e[t]))) return r;
									t--, (h = 'broken_rhythm');
									break;
								case '>':
								case '<':
									if (!l(h)) return null;
									if (!i) return (r.endChar = t), r;
									var g = O(e, t);
									(t += g[0] - 1), (a.next_note_duration = g[2]), (r.duration = g[1] * r.duration), (h = 'end_slur');
									break;
								default:
									return l(h) ? ((r.endChar = t), r) : null;
							}
							if (++t === e.length) return l(h) ? ((r.endChar = t), r) : null;
						}
						return null;
					},
					O = function (e, t) {
						switch (e[t]) {
							case '>':
								return t < e.length - 2 && '>' === e[t + 1] && '>' === e[t + 2]
									? [3, 1.875, 0.125]
									: t < e.length - 1 && '>' === e[t + 1]
									? [2, 1.75, 0.25]
									: [1, 1.5, 0.5];
							case '<':
								return t < e.length - 2 && '<' === e[t + 1] && '<' === e[t + 2]
									? [3, 0.125, 1.875]
									: t < e.length - 1 && '<' === e[t + 1]
									? [2, 0.25, 1.75]
									: [1, 0.5, 1.5];
						}
						return null;
					};
				e.exports = d;
			},
			1881: function (e, t, r) {
				var n = r(5008),
					i = function (e, t) {
						(this.lineIndex = 0),
							(this.lines = e),
							(this.multilineVars = t),
							(this.skipWhiteSpace = function (e) {
								for (var t = 0; t < e.length; t++) if (!this.isWhiteSpace(e[t])) return t;
								return e.length;
							});
						var r = function (e, t) {
							return t >= e.length;
						};
						(this.eatWhiteSpace = function (e, t) {
							for (var r = t; r < e.length; r++) if (!this.isWhiteSpace(e[r])) return r - t;
							return r - t;
						}),
							(this.getKeyPitch = function (e) {
								var t = this.skipWhiteSpace(e);
								if (r(e, t)) return { len: 0 };
								switch (e[t]) {
									case 'A':
										return { len: t + 1, token: 'A' };
									case 'B':
										return { len: t + 1, token: 'B' };
									case 'C':
										return { len: t + 1, token: 'C' };
									case 'D':
										return { len: t + 1, token: 'D' };
									case 'E':
										return { len: t + 1, token: 'E' };
									case 'F':
										return { len: t + 1, token: 'F' };
									case 'G':
										return { len: t + 1, token: 'G' };
								}
								return { len: 0 };
							}),
							(this.getSharpFlat = function (e) {
								if ('bass' === e) return { len: 0 };
								switch (e[0]) {
									case '#':
										return { len: 1, token: '#' };
									case 'b':
										return { len: 1, token: 'b' };
								}
								return { len: 0 };
							}),
							(this.getMode = function (e) {
								var t = function (e, t) {
										for (; t < e.length && ((e[t] >= 'a' && e[t] <= 'z') || (e[t] >= 'A' && e[t] <= 'Z')); ) t++;
										return t;
									},
									n = this.skipWhiteSpace(e);
								if (r(e, n)) return { len: 0 };
								var i = e.substring(n, n + 3).toLowerCase();
								switch (
									(((i.length > 1 && ' ' === i[1]) || '^' === i[1] || '_' === i[1] || '=' === i[1]) && (i = i[0]), i)
								) {
									case 'mix':
										return { len: t(e, n), token: 'Mix' };
									case 'dor':
										return { len: t(e, n), token: 'Dor' };
									case 'phr':
										return { len: t(e, n), token: 'Phr' };
									case 'lyd':
										return { len: t(e, n), token: 'Lyd' };
									case 'loc':
										return { len: t(e, n), token: 'Loc' };
									case 'aeo':
									case 'min':
									case 'm':
										return { len: t(e, n), token: 'm' };
									case 'maj':
									case 'ion':
										return { len: t(e, n), token: '' };
								}
								return { len: 0 };
							}),
							(this.getClef = function (e, t) {
								var i = e,
									a = this.skipWhiteSpace(e);
								if (r(e, a)) return { len: 0 };
								var s = !1,
									o = e.substring(a);
								if ((n.startsWith(o, 'clef=') && ((s = !0), (o = o.substring(5)), (a += 5)), 0 === o.length && s))
									return { len: a + 5, warn: 'No clef specified: ' + i };
								var c = this.skipWhiteSpace(o);
								if (r(o, c)) return { len: 0 };
								c > 0 && ((a += c), (o = o.substring(c)));
								var l = null;
								if (n.startsWith(o, 'treble')) l = 'treble';
								else if (n.startsWith(o, 'bass3')) l = 'bass3';
								else if (n.startsWith(o, 'bass')) l = 'bass';
								else if (n.startsWith(o, 'tenor')) l = 'tenor';
								else if (n.startsWith(o, 'alto2')) l = 'alto2';
								else if (n.startsWith(o, 'alto1')) l = 'alto1';
								else if (n.startsWith(o, 'alto')) l = 'alto';
								else if (!t && s && n.startsWith(o, 'none')) l = 'none';
								else if (n.startsWith(o, 'perc')) l = 'perc';
								else if (!t && s && n.startsWith(o, 'C')) l = 'tenor';
								else if (!t && s && n.startsWith(o, 'F')) l = 'bass';
								else {
									if (t || !s || !n.startsWith(o, 'G')) return { len: a + 5, warn: 'Unknown clef specified: ' + i };
									l = 'treble';
								}
								return (
									(o = o.substring(l.length)),
									(c = this.isMatch(o, '+8')) > 0 ? (l += '+8') : (c = this.isMatch(o, '-8')) > 0 && (l += '-8'),
									{ len: a + l.length, token: l, explicit: s }
								);
							}),
							(this.getBarLine = function (e, t) {
								switch (e[t]) {
									case ']':
										switch (e[++t]) {
											case '|':
												return { len: 2, token: 'bar_thick_thin' };
											case '[':
												return (e[++t] >= '1' && e[t] <= '9') || '"' === e[t]
													? { len: 2, token: 'bar_invisible' }
													: { len: 1, warn: 'Unknown bar symbol' };
											default:
												return { len: 1, token: 'bar_invisible' };
										}
										break;
									case ':':
										switch (e[++t]) {
											case ':':
												return { len: 2, token: 'bar_dbl_repeat' };
											case '|':
												switch (e[++t]) {
													case ']':
														return '|' === e[++t] && ':' === e[++t]
															? { len: 5, token: 'bar_dbl_repeat' }
															: { len: 3, token: 'bar_right_repeat' };
													case '|':
														return ':' === e[++t]
															? { len: 4, token: 'bar_dbl_repeat' }
															: { len: 3, token: 'bar_right_repeat' };
													default:
														return { len: 2, token: 'bar_right_repeat' };
												}
												break;
											default:
												return { len: 1, warn: 'Unknown bar symbol' };
										}
										break;
									case '[':
										if ('|' !== e[++t])
											return (e[t] >= '1' && e[t] <= '9') || '"' === e[t]
												? { len: 1, token: 'bar_invisible' }
												: { len: 0 };
										switch (e[++t]) {
											case ':':
												return { len: 3, token: 'bar_left_repeat' };
											case ']':
												return { len: 3, token: 'bar_invisible' };
											default:
												return { len: 2, token: 'bar_thick_thin' };
										}
										break;
									case '|':
										switch (e[++t]) {
											case ']':
												return { len: 2, token: 'bar_thin_thick' };
											case '|':
												return ':' === e[++t]
													? { len: 3, token: 'bar_left_repeat' }
													: { len: 2, token: 'bar_thin_thin' };
											case ':':
												for (var r = 0; ':' === e[t + r]; ) r++;
												return { len: 1 + r, token: 'bar_left_repeat' };
											default:
												return { len: 1, token: 'bar_thin' };
										}
								}
								return { len: 0 };
							}),
							(this.getTokenOf = function (e, t) {
								for (var r = 0; r < e.length; r++) if (t.indexOf(e[r]) < 0) return { len: r, token: e.substring(0, r) };
								return { len: r, token: e };
							}),
							(this.getToken = function (e, t, r) {
								for (var n = t; n < r && !this.isWhiteSpace(e[n]); ) n++;
								return e.substring(t, n);
							}),
							(this.isMatch = function (e, t) {
								var i = this.skipWhiteSpace(e);
								return r(e, i) ? 0 : n.startsWith(e.substring(i), t) ? i + t.length : 0;
							}),
							(this.getPitchFromTokens = function (e) {
								var t = {};
								if (
									((t.position = {
										A: 5,
										B: 6,
										C: 0,
										D: 1,
										E: 2,
										F: 3,
										G: 4,
										a: 12,
										b: 13,
										c: 7,
										d: 8,
										e: 9,
										f: 10,
										g: 11
									}[e[0].token]),
									void 0 === t.position)
								)
									return { warn: 'Pitch expected. Found: ' + e[0].token };
								for (e.shift(); e.length; )
									switch (e[0].token) {
										case ',':
											(t.position -= 7), e.shift();
											break;
										case "'":
											(t.position += 7), e.shift();
											break;
										default:
											return t;
									}
								return t;
							}),
							(this.getKeyAccidentals2 = function (e) {
								for (var t; e.length > 0; ) {
									var r;
									if ('^' === e[0].token) {
										if (((r = 'sharp'), e.shift(), 0 === e.length))
											return { accs: t, warn: 'Expected note name after ' + r };
										switch (e[0].token) {
											case '^':
												(r = 'dblsharp'), e.shift();
												break;
											case '/':
												(r = 'quartersharp'), e.shift();
										}
									} else if ('=' === e[0].token) (r = 'natural'), e.shift();
									else {
										if ('_' !== e[0].token) return { accs: t };
										if (((r = 'flat'), e.shift(), 0 === e.length))
											return { accs: t, warn: 'Expected note name after ' + r };
										switch (e[0].token) {
											case '_':
												(r = 'dblflat'), e.shift();
												break;
											case '/':
												(r = 'quarterflat'), e.shift();
										}
									}
									if (0 === e.length) return { accs: t, warn: 'Expected note name after ' + r };
									switch (e[0].token[0]) {
										case 'a':
										case 'b':
										case 'c':
										case 'd':
										case 'e':
										case 'f':
										case 'g':
										case 'A':
										case 'B':
										case 'C':
										case 'D':
										case 'E':
										case 'F':
										case 'G':
											void 0 === t && (t = []),
												t.push({ acc: r, note: e[0].token[0] }),
												1 === e[0].token.length ? e.shift() : (e[0].token = e[0].token.substring(1));
											break;
										default:
											return { accs: t, warn: 'Expected note name after ' + r + ' Found: ' + e[0].token };
									}
								}
								return { accs: t };
							}),
							(this.getKeyAccidental = function (e) {
								var t = {
										'^': 'sharp',
										'^^': 'dblsharp',
										'=': 'natural',
										_: 'flat',
										__: 'dblflat',
										'_/': 'quarterflat',
										'^/': 'quartersharp'
									},
									n = this.skipWhiteSpace(e);
								if (r(e, n)) return { len: 0 };
								var i = null;
								switch (e[n]) {
									case '^':
									case '_':
									case '=':
										i = e[n];
										break;
									default:
										return { len: 0 };
								}
								if ((n++, r(e, n))) return { len: 1, warn: 'Expected note name after accidental' };
								switch (e[n]) {
									case 'a':
									case 'b':
									case 'c':
									case 'd':
									case 'e':
									case 'f':
									case 'g':
									case 'A':
									case 'B':
									case 'C':
									case 'D':
									case 'E':
									case 'F':
									case 'G':
										return { len: n + 1, token: { acc: t[i], note: e[n] } };
									case '^':
									case '_':
									case '/':
										if (((i += e[n]), n++, r(e, n))) return { len: 2, warn: 'Expected note name after accidental' };
										switch (e[n]) {
											case 'a':
											case 'b':
											case 'c':
											case 'd':
											case 'e':
											case 'f':
											case 'g':
											case 'A':
											case 'B':
											case 'C':
											case 'D':
											case 'E':
											case 'F':
											case 'G':
												return { len: n + 1, token: { acc: t[i], note: e[n] } };
											default:
												return { len: 2, warn: 'Expected note name after accidental' };
										}
										break;
									default:
										return { len: 1, warn: 'Expected note name after accidental' };
								}
							}),
							(this.isWhiteSpace = function (e) {
								return ' ' === e || '\t' === e || '' === e;
							}),
							(this.getMeat = function (e, t, r) {
								var n = e.indexOf('%', t);
								for (n >= 0 && n < r && (r = n); t < r && (' ' === e[t] || '\t' === e[t] || '' === e[t]); ) t++;
								for (; t < r && (' ' === e[r - 1] || '\t' === e[r - 1] || '' === e[r - 1]); ) r--;
								return { start: t, end: r };
							});
						var i = function (e) {
								return (e >= 'A' && e <= 'Z') || (e >= 'a' && e <= 'z');
							},
							a = function (e) {
								return e >= '0' && e <= '9';
							};
						(this.tokenize = function (e, t, r, n) {
							var s = this.getMeat(e, t, r);
							(t = s.start), (r = s.end);
							for (var o, c = []; t < r; ) {
								if ('"' === e[t]) {
									for (o = t + 1; o < r && '"' !== e[o]; ) o++;
									c.push({ type: 'quote', token: e.substring(t + 1, o), start: t + 1, end: o }), o++;
								} else if (i(e[t])) {
									if (((o = t + 1), n)) for (; o < r && !this.isWhiteSpace(e[o]); ) o++;
									else for (; o < r && i(e[o]); ) o++;
									c.push({ type: 'alpha', token: e.substring(t, o), continueId: a(e[o]), start: t, end: o }),
										(t = o + 1);
								} else if ('.' === e[t] && a(e[o + 1])) {
									o = t + 1;
									for (var l; o < r && a(e[o]); ) o++;
									(l = parseFloat(e.substring(t, o))),
										c.push({
											type: 'number',
											token: e.substring(t, o),
											intt: null,
											floatt: l,
											continueId: i(e[o]),
											start: t,
											end: o
										}),
										(t = o + 1);
								} else if (a(e[t]) || ('-' === e[t] && a(e[o + 1]))) {
									o = t + 1;
									for (var h, u = null; o < r && a(e[o]); ) o++;
									if ('.' === e[o] && a(e[o + 1])) for (o++; o < r && a(e[o]); ) o++;
									else u = parseInt(e.substring(t, o));
									(h = parseFloat(e.substring(t, o))),
										c.push({
											type: 'number',
											token: e.substring(t, o),
											intt: u,
											floatt: h,
											continueId: i(e[o]),
											start: t,
											end: o
										}),
										(t = o + 1);
								} else
									' ' === e[t] || '\t' === e[t] || c.push({ type: 'punct', token: e[t], start: t, end: t + 1 }),
										(o = t + 1);
								t = o;
							}
							return c;
						}),
							(this.getVoiceToken = function (e, t, r) {
								for (var n = t; (n < r && this.isWhiteSpace(e[n])) || '=' === e[n]; ) n++;
								if ('"' === e[n]) {
									var i = e.indexOf('"', n + 1);
									return -1 === i || i >= r
										? { len: 1, err: 'Missing close quote' }
										: { len: i - t + 1, token: this.translateString(e.substring(n + 1, i)) };
								}
								for (var a = n; a < r && !this.isWhiteSpace(e[a]) && '=' !== e[a]; ) a++;
								return { len: a - t + 1, token: e.substring(n, a) };
							});
						var s = {
								'`a': 'à',
								"'a": 'á',
								'^a': 'â',
								'~a': 'ã',
								'"a': 'ä',
								oa: 'å',
								aa: 'å',
								'=a': 'ā',
								ua: 'ă',
								';a': 'ą',
								'`e': 'è',
								"'e": 'é',
								'^e': 'ê',
								'"e': 'ë',
								'=e': 'ē',
								ue: 'ĕ',
								';e': 'ę',
								'.e': 'ė',
								'`i': 'ì',
								"'i": 'í',
								'^i': 'î',
								'"i': 'ï',
								'=i': 'ī',
								ui: 'ĭ',
								';i': 'į',
								'`o': 'ò',
								"'o": 'ó',
								'^o': 'ô',
								'~o': 'õ',
								'"o': 'ö',
								'=o': 'ō',
								uo: 'ŏ',
								'/o': 'ø',
								'`u': 'ù',
								"'u": 'ú',
								'^u': 'û',
								'~u': 'ũ',
								'"u': 'ü',
								ou: 'ů',
								'=u': 'ū',
								uu: 'ŭ',
								';u': 'ų',
								'`A': 'À',
								"'A": 'Á',
								'^A': 'Â',
								'~A': 'Ã',
								'"A': 'Ä',
								oA: 'Å',
								AA: 'Å',
								'=A': 'Ā',
								uA: 'Ă',
								';A': 'Ą',
								'`E': 'È',
								"'E": 'É',
								'^E': 'Ê',
								'"E': 'Ë',
								'=E': 'Ē',
								uE: 'Ĕ',
								';E': 'Ę',
								'.E': 'Ė',
								'`I': 'Ì',
								"'I": 'Í',
								'^I': 'Î',
								'~I': 'Ĩ',
								'"I': 'Ï',
								'=I': 'Ī',
								uI: 'Ĭ',
								';I': 'Į',
								'.I': 'İ',
								'`O': 'Ò',
								"'O": 'Ó',
								'^O': 'Ô',
								'~O': 'Õ',
								'"O': 'Ö',
								'=O': 'Ō',
								uO: 'Ŏ',
								'/O': 'Ø',
								'`U': 'Ù',
								"'U": 'Ú',
								'^U': 'Û',
								'~U': 'Ũ',
								'"U': 'Ü',
								oU: 'Ů',
								'=U': 'Ū',
								uU: 'Ŭ',
								';U': 'Ų',
								ae: 'æ',
								AE: 'Æ',
								oe: 'œ',
								OE: 'Œ',
								ss: 'ß',
								"'c": 'ć',
								'^c': 'ĉ',
								uc: 'č',
								cc: 'ç',
								'.c': 'ċ',
								cC: 'Ç',
								"'C": 'Ć',
								'^C': 'Ĉ',
								uC: 'Č',
								'.C': 'Ċ',
								'~N': 'Ñ',
								'~n': 'ñ',
								'=s': 'š',
								vs: 'š',
								DH: 'Ð',
								dh: 'ð',
								HO: 'Ő',
								Ho: 'ő',
								HU: 'Ű',
								Hu: 'ű',
								"'Y": 'Ý',
								"'y": 'ý',
								'^Y': 'Ŷ',
								'^y': 'ŷ',
								'"Y': 'Ÿ',
								'"y': 'ÿ',
								vS: 'Š',
								vZ: 'Ž',
								vz: 'ž'
							},
							o = { '#': '♯', b: '♭', '=': '♮' },
							c = {
								201: '♯',
								202: '♭',
								203: '♮',
								241: '¡',
								242: '¢',
								252: 'a',
								262: '2',
								272: 'o',
								302: 'Â',
								312: 'Ê',
								322: 'Ò',
								332: 'Ú',
								342: 'â',
								352: 'ê',
								362: 'ò',
								372: 'ú',
								243: '£',
								253: '«',
								263: '3',
								273: '»',
								303: 'Ã',
								313: 'Ë',
								323: 'Ó',
								333: 'Û',
								343: 'ã',
								353: 'ë',
								363: 'ó',
								373: 'û',
								244: '¤',
								254: '¬',
								264: '  ́',
								274: '1⁄4',
								304: 'Ä',
								314: 'Ì',
								324: 'Ô',
								334: 'Ü',
								344: 'ä',
								354: 'ì',
								364: 'ô',
								374: 'ü',
								245: '¥',
								255: '-',
								265: 'μ',
								275: '1⁄2',
								305: 'Å',
								315: 'Í',
								325: 'Õ',
								335: 'Ý',
								345: 'å',
								355: 'í',
								365: 'õ',
								375: 'ý',
								246: '¦',
								256: '®',
								266: '¶',
								276: '3⁄4',
								306: 'Æ',
								316: 'Î',
								326: 'Ö',
								336: 'Þ',
								346: 'æ',
								356: 'î',
								366: 'ö',
								376: 'þ',
								247: '§',
								257: ' ̄',
								267: '·',
								277: '¿',
								307: 'Ç',
								317: 'Ï',
								327: '×',
								337: 'ß',
								347: 'ç',
								357: 'ï',
								367: '÷',
								377: 'ÿ',
								250: ' ̈',
								260: '°',
								270: ' ̧',
								300: 'À',
								310: 'È',
								320: 'Ð',
								330: 'Ø',
								340: 'à',
								350: 'è',
								360: 'ð',
								370: 'ø',
								251: '©',
								261: '±',
								271: '1',
								301: 'Á',
								311: 'É',
								321: 'Ñ',
								331: 'Ù',
								341: 'á',
								351: 'é',
								361: 'ñ',
								371: 'ù'
							};
						(this.translateString = function (e) {
							var t = e.split('\\');
							if (1 === t.length) return e;
							var r = null;
							return (
								t.forEach(function (e) {
									if (null === r) r = e;
									else {
										var t = s[e.substring(0, 2)];
										void 0 !== t
											? (r += t + e.substring(2))
											: void 0 !== (t = c[e.substring(0, 3)])
											? (r += t + e.substring(3))
											: ((t = o[e.substring(0, 1)]), (r += void 0 !== t ? t + e.substring(1) : '\\' + e));
									}
								}),
								r
							);
						}),
							(this.getNumber = function (e, t) {
								for (var r = 0; t < e.length; )
									switch (e[t]) {
										case '0':
											(r *= 10), t++;
											break;
										case '1':
											(r = 10 * r + 1), t++;
											break;
										case '2':
											(r = 10 * r + 2), t++;
											break;
										case '3':
											(r = 10 * r + 3), t++;
											break;
										case '4':
											(r = 10 * r + 4), t++;
											break;
										case '5':
											(r = 10 * r + 5), t++;
											break;
										case '6':
											(r = 10 * r + 6), t++;
											break;
										case '7':
											(r = 10 * r + 7), t++;
											break;
										case '8':
											(r = 10 * r + 8), t++;
											break;
										case '9':
											(r = 10 * r + 9), t++;
											break;
										default:
											return { num: r, index: t };
									}
								return { num: r, index: t };
							}),
							(this.getFraction = function (e, t) {
								var r = 1,
									n = 1;
								if ('/' !== e[t]) {
									var i = this.getNumber(e, t);
									(r = i.num), (t = i.index);
								}
								if ('/' === e[t]) {
									if ('/' === e[++t]) {
										for (var a = 0.5; '/' === e[t++]; ) a /= 2;
										return { value: r * a, index: t - 1 };
									}
									var s = t,
										o = this.getNumber(e, t);
									0 === o.num && s === t && (o.num = 2), 0 !== o.num && (n = o.num), (t = o.index);
								}
								return { value: r / n, index: t };
							}),
							(this.theReverser = function (e) {
								return n.endsWith(e, ', The')
									? 'The ' + e.substring(0, e.length - 5)
									: n.endsWith(e, ', A')
									? 'A ' + e.substring(0, e.length - 3)
									: e;
							}),
							(this.stripComment = function (e) {
								var t = e.indexOf('%');
								return t >= 0 ? n.strip(e.substring(0, t)) : n.strip(e);
							}),
							(this.getInt = function (e) {
								var t = parseInt(e);
								if (isNaN(t)) return { digits: 0 };
								var r = '' + t;
								return { value: t, digits: e.indexOf(r) + r.length };
							}),
							(this.getFloat = function (e) {
								var t = parseFloat(e);
								if (isNaN(t)) return { digits: 0 };
								var r = '' + t;
								return { value: t, digits: e.indexOf(r) + r.length };
							}),
							(this.getMeasurement = function (e) {
								if (0 === e.length) return { used: 0 };
								var t = 1,
									r = '';
								if ('-' === e[0].token) e.shift(), (r = '-'), t++;
								else if ('number' !== e[0].type) return { used: 0 };
								if (((r += e.shift().token), 0 === e.length)) return { used: 1, value: parseInt(r) };
								var n = e.shift();
								if ('.' === n.token) {
									if ((t++, 0 === e.length)) return { used: t, value: parseInt(r) };
									if ('number' === e[0].type && ((r = r + '.' + (n = e.shift()).token), t++, 0 === e.length))
										return { used: t, value: parseFloat(r) };
									n = e.shift();
								}
								switch (n.token) {
									case 'pt':
									case 'px':
										return { used: t + 1, value: parseFloat(r) };
									case 'cm':
										return { used: t + 1, value: (parseFloat(r) / 2.54) * 72 };
									case 'in':
										return { used: t + 1, value: 72 * parseFloat(r) };
									default:
										return e.unshift(n), { used: t, value: parseFloat(r) };
								}
							});
						var l = function (e) {
							return (e = (e = e.replace(/\\n/g, '\n')).replace(/\\"/g, '"'));
						};
						this.getBrackettedSubstring = function (e, t, r, n) {
							for (var i = n || e[t], a = t + 1, s = !1; a < e.length && (s || e[a] !== i); ) (s = '\\' === e[a]), ++a;
							return e[a] === i
								? [a - t + 1, l(e.substring(t + 1, a)), !0]
								: ((a = t + r) > e.length - 1 && (a = e.length - 1), [a - t + 1, l(e.substring(t + 1, a)), !1]);
						};
					};
				(i.prototype.peekLine = function () {
					return this.lines[this.lineIndex];
				}),
					(i.prototype.nextLine = function () {
						if (
							(this.lineIndex > 0 && (this.multilineVars.iChar += this.lines[this.lineIndex - 1].length + 1),
							this.lineIndex < this.lines.length)
						) {
							var e = this.lines[this.lineIndex];
							return this.lineIndex++, e;
						}
						return null;
					}),
					(e.exports = i);
			},
			2821: function (e, t, r) {
				var n = r(867),
					i = r(4208),
					a = r(9447),
					s = {},
					o = {
						C: 0,
						'C#': 1,
						Db: 1,
						D: 2,
						'D#': 3,
						Eb: 3,
						E: 4,
						F: 5,
						'F#': 6,
						Gb: 6,
						G: 7,
						'G#': 8,
						Ab: 8,
						A: 9,
						'A#': 10,
						Bb: 10,
						B: 11
					},
					c = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
					l = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
				(s.keySignature = function (e, t, r, n, i) {
					if ('perc' === e.clef.type || 'none' === e.clef.type) return { accidentals: a(t), root: r, acc: n };
					i || (i = 0), (e.localTransposeVerticalMovement = 0), (e.localTransposePreferFlats = !1);
					var s = a(t);
					if (!s) return e.key;
					if (((e.localTranspose = (e.globalTranspose ? e.globalTranspose : 0) + i), !e.localTranspose))
						return { accidentals: s, root: r, acc: n };
					if (((e.globalTransposeOrigKeySig = s), e.localTranspose % 12 == 0))
						return (
							(e.localTransposeVerticalMovement = (e.localTranspose / 12) * 7), { accidentals: s, root: r, acc: n }
						);
					var h = t[0];
					'b' === t[1] || '#' === t[1] ? ((h += t[1]), (t = t.substr(2))) : (t = t.substr(1));
					var u = o[h],
						d = void 0 !== u;
					d || ((u = 0), (h = 'C'), (t = ''));
					for (var f = u + e.localTranspose; f < 0; ) f += 12;
					f > 11 && (f %= 12);
					var p = 'm' === t[0] ? l[f] : c[f],
						m = p + t,
						g = a(m);
					g.length > 0 && 'flat' === g[0].acc && (e.localTransposePreferFlats = !0);
					var v = m.charCodeAt(0) - h.charCodeAt(0);
					return (
						e.localTranspose > 0
							? v < 0
								? (v += 7)
								: 0 === v && (('#' !== h[1] && 'b' !== m[1]) || (v += 7))
							: e.localTranspose < 0 && (v > 0 ? (v -= 7) : 0 === v && (('b' !== h[1] && '#' !== m[1]) || (v -= 7))),
						e.localTranspose > 0
							? (e.localTransposeVerticalMovement = v + 7 * Math.floor(e.localTranspose / 12))
							: (e.localTransposeVerticalMovement = v + 7 * Math.ceil(e.localTranspose / 12)),
						d ? { accidentals: g, root: p[0], acc: p.length > 1 ? p[1] : '' } : { accidentals: [], root: r, acc: n }
					);
				}),
					(s.chordName = function (e, t) {
						return i(t, e.localTranspose, e.localTransposePreferFlats, e.freegchord);
					});
				var h = ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
					u = { dblflat: -2, flat: -1, natural: 0, sharp: 1, dblsharp: 2 },
					d = { '-2': 'dblflat', '-1': 'flat', 0: 'natural', 1: 'sharp', 2: 'dblsharp' },
					f = { '-2': '__', '-1': '_', 0: '=', 1: '^', 2: '^^' };
				(s.note = function (e, t) {
					if (e.localTranspose && 'perc' !== e.clef.type) {
						var r = t.pitch;
						if (e.localTransposeVerticalMovement && ((t.pitch = t.pitch + e.localTransposeVerticalMovement), t.name)) {
							var i = t.accidental ? t.name.substring(1) : t.name,
								a = t.accidental ? t.name[0] : '',
								s = n.pitchIndex(i);
							t.name = a + n.noteName(s + e.localTransposeVerticalMovement);
						}
						if (t.accidental) {
							var o = (function (e, t, r, n, i) {
								for (var a = h[(e + 49) % 7], s = 0, o = 0; o < n.length; o++)
									n[o].note.toLowerCase() === a && (s = u[n[o].acc]);
								for (var c = u[r] - s, l = h[(t + 49) % 7], d = 0, f = 0; f < i.accidentals.length; f++)
									i.accidentals[f].note.toLowerCase() === l && (d = u[i.accidentals[f].acc]);
								var p = c + d;
								return (
									p < -2 && (t--, (p += 'c' === l || 'f' === l ? 1 : 2)),
									p > 2 && (t++, (p -= 'b' === l || 'e' === l ? 1 : 2)),
									[t, p]
								);
							})(r, t.pitch, t.accidental, e.globalTransposeOrigKeySig, e.targetKey);
							(t.pitch = o[0]), (t.accidental = d[o[1]]), t.name && (t.name = f[o[1]] + t.name.replace(/[_^=]/g, ''));
						}
					}
				}),
					(e.exports = s);
			},
			867: function (e) {
				var t = {},
					r = [
						'C,,,',
						'D,,,',
						'E,,,',
						'F,,,',
						'G,,,',
						'A,,,',
						'B,,,',
						'C,,',
						'D,,',
						'E,,',
						'F,,',
						'G,,',
						'A,,',
						'B,,',
						'C,',
						'D,',
						'E,',
						'F,',
						'G,',
						'A,',
						'B,',
						'C',
						'D',
						'E',
						'F',
						'G',
						'A',
						'B',
						'c',
						'd',
						'e',
						'f',
						'g',
						'a',
						'b',
						"c'",
						"d'",
						"e'",
						"f'",
						"g'",
						"a'",
						"b'",
						"c''",
						"d''",
						"e''",
						"f''",
						"g''",
						"a''",
						"b''",
						"c'''",
						"d'''",
						"e'''",
						"f'''",
						"g'''",
						"a'''",
						"b'''"
					];
				(t.pitchIndex = function (e) {
					return r.indexOf(e);
				}),
					(t.noteName = function (e) {
						return r[e];
					}),
					(e.exports = t);
			},
			4208: function (e) {
				var t = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'],
					r = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'],
					n = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
					i = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
				e.exports = function (e, a, s, o) {
					if (!a || a % 12 == 0) return e;
					for (; a < 0; ) a += 12;
					a > 11 && (a %= 12);
					var c = e.match(/^([A-G][b#♭♯]?)([^\/]+)?\/?([A-G][b#♭♯]?)?(.+)?/);
					if (!c) return e;
					var l,
						h = c[1],
						u = c[2],
						d = c[3],
						f = c[4];
					return (
						(l = t.indexOf(h)) < 0 && (l = r.indexOf(h)),
						l < 0 && (l = n.indexOf(h)),
						l < 0 && (l = i.indexOf(h)),
						l < 0 ||
							((l += a),
							(l %= 12),
							(e = s ? (o ? i[l] : r[l]) : o ? n[l] : t[l]),
							u && (e += u),
							d &&
								((l = t.indexOf(d)) < 0 && (l = r.indexOf(d)),
								l < 0 && (l = n.indexOf(d)),
								l < 0 && (l = i.indexOf(d)),
								(e += '/'),
								l >= 0 ? ((l += a), (l %= 12), (e += s ? (o ? i[l] : r[l]) : o ? n[l] : t[l])) : (e += d)),
							f && (e += f)),
						e
					);
				};
			},
			575: function (e, t, r) {
				var n = r(9708),
					i = r(5008);
				e.exports = function (e) {
					var t = this;
					function r(e, t) {
						for (var r = t - 1; r > 0 && 'bar' !== e[r].el_type; r--);
						return r;
					}
					(this.setVisualTranspose = function (t) {
						t && (e.visualTranspose = t);
					}),
						(this.resolveOverlays = function () {
							for (var t = !1, n = [], a = 0; a < e.lines.length; a++) {
								var s = e.lines[a];
								if (s.staff)
									for (var o = 0; o < s.staff.length; o++) {
										for (var c = s.staff[o], l = [], h = 0; h < c.voices.length; h++) {
											var u = c.voices[h];
											l.push({ hasOverlay: !1, voice: [], snip: [] }), (n[a] = 0);
											for (var d = 0, f = !1, p = 0, m = -1, g = 0; g < u.length; g++) {
												var v = u[g];
												if ('overlay' !== v.el_type || f)
													'bar' === v.el_type
														? (f
																? ((f = !1), l[h].snip.push({ start: m, len: g - m }), l[h].voice.push(v))
																: (d > 0 &&
																		l[h].voice.push({
																			el_type: 'note',
																			duration: d,
																			rest: { type: 'invisible' },
																			startChar: v.startChar,
																			endChar: v.endChar
																		}),
																  l[h].voice.push(v)),
														  (d = 0))
														: 'note' === v.el_type
														? f
															? l[h].voice.push(v)
															: ((d += v.duration), (n[a] += v.duration))
														: ('scale' !== v.el_type &&
																'stem' !== v.el_type &&
																'overlay' !== v.el_type &&
																'style' !== v.el_type &&
																'transpose' !== v.el_type &&
																'color' !== v.el_type) ||
														  l[h].voice.push(v);
												else {
													(t = !0), (f = !0), (m = g), (l[h].hasOverlay = !0), 0 === p && (p = n[a]);
													for (var b = 0; b < a; b++)
														n[b] &&
															e.lines[b].staff &&
															c.voices.length >= e.lines[b].staff[0].voices.length &&
															e.lines[b].staff[0].voices.push([
																{
																	el_type: 'note',
																	duration: n[b],
																	rest: { type: 'invisible' },
																	startChar: v.startChar,
																	endChar: v.endChar
																}
															]);
												}
											}
											l[h].hasOverlay && 0 === l[h].snip.length && l[h].snip.push({ start: m, len: u.length - m });
										}
										for (h = 0; h < l.length; h++) {
											var y = l[h];
											if (y.hasOverlay) {
												y.voice.splice(0, 0, { el_type: 'stem', direction: 'down' }), c.voices.push(y.voice);
												for (var x = y.snip.length - 1; x >= 0; x--) {
													var w = y.snip[x];
													c.voices[h].splice(w.start, w.len),
														c.voices[h].splice(w.start + 1, 0, { el_type: 'stem', direction: 'auto' });
													var k = r(c.voices[h], w.start);
													c.voices[h].splice(k, 0, { el_type: 'stem', direction: 'up' });
												}
												for (x = 0; x < c.voices[c.voices.length - 1].length; x++) {
													c.voices[c.voices.length - 1][x] = i.clone(c.voices[c.voices.length - 1][x]);
													var C = c.voices[c.voices.length - 1][x];
													'bar' === C.el_type && C.startEnding && delete C.startEnding,
														'bar' === C.el_type && C.endEnding && delete C.endEnding;
												}
											}
										}
									}
							}
							return t;
						}),
						(this.cleanUp = function (t, r, a) {
							this.closeLine(),
								delete e.runningFonts,
								e.metaText.tempo &&
									e.metaText.tempo.bpm &&
									!e.metaText.tempo.duration &&
									(e.metaText.tempo.duration = [e.getBeatLength()]);
							var s,
								o,
								c,
								l = !1;
							for (s = 0; s < e.lines.length; s++)
								if (void 0 !== e.lines[s].staff) {
									var h = !1;
									for (o = 0; o < e.lines[s].staff.length; o++)
										if (void 0 === e.lines[s].staff[o]) (l = !0), (e.lines[s].staff[o] = null);
										else
											for (c = 0; c < e.lines[s].staff[o].voices.length; c++)
												void 0 === e.lines[s].staff[o].voices[c]
													? (e.lines[s].staff[o].voices[c] = [])
													: this.containsNotes(e.lines[s].staff[o].voices[c]) && (h = !0);
									h || ((e.lines[s] = null), (l = !0));
								}
							if (
								(l &&
									((e.lines = e.lines.filter(function (e) {
										return !!e;
									})),
									e.lines.forEach(function (e) {
										e.staff &&
											(e.staff = e.staff.filter(function (e) {
												return !!e;
											}));
									})),
								t)
							)
								for (; p(e.lines, t); );
							if (r) {
								for (l = !1, s = 0; s < e.lines.length; s++)
									if (void 0 !== e.lines[s].staff)
										for (o = 0; o < e.lines[s].staff.length; o++) {
											var u = !1;
											for (c = 0; c < e.lines[s].staff[o].voices.length; c++)
												this.containsNotesStrict(e.lines[s].staff[o].voices[c]) && (u = !0);
											u || ((l = !0), (e.lines[s].staff[o] = null));
										}
								l &&
									e.lines.forEach(function (e) {
										e.staff &&
											(e.staff = e.staff.filter(function (e) {
												return !!e;
											}));
									});
							}
							for (
								(function (e) {
									for (var t = !0, r = 0; r < e.length; r++) {
										var n = e[r];
										if (n.staff) {
											for (var i = 0; i < n.staff.length; i++) {
												var a = n.staff[i];
												if (a.title) {
													for (var s = !1, o = 0; o < a.title.length; o++)
														a.title[o]
															? ((a.title[o] = t ? a.title[o].name : a.title[o].subname),
															  a.title[o] ? (s = !0) : (a.title[o] = ''))
															: (a.title[o] = '');
													s || delete a.title;
												}
											}
											t = !1;
										}
									}
								})(e.lines),
									s = 0;
								s < e.lines.length;
								s++
							)
								if (e.lines[s].staff)
									for (o = 0; o < e.lines[s].staff.length; o++) delete e.lines[s].staff[o].workingClef;
							for (; this.resolveOverlays(); );
							function d(e, t, r) {
								var n;
								a[t] || (a[t] = []), a[t][r] || (a[t][r] = []);
								for (
									var i = function (e, i, s) {
											if (void 0 === a[t][r][s]) {
												for (n = 0; n < a[t][r].length; n++)
													if (void 0 !== a[t][r][n]) {
														s = n;
														break;
													}
												if (void 0 === a[t][r][s]) {
													var o = 100 * s + 1;
													e.endSlur.forEach(function (e) {
														o === e && --o;
													}),
														(a[t][r][s] = [o]);
												}
											}
											for (var c, l = 0; l < i; l++) (c = a[t][r][s].pop()), e.endSlur.push(c);
											return 0 === a[t][r][s].length && delete a[t][r][s], c;
										},
										s = function (e, n, i, s) {
											(e.startSlur = []), void 0 === a[t][r][i] && (a[t][r][i] = []);
											for (var o = 100 * i + 1, c = 0; c < n; c++)
												s &&
													(s.forEach(function (e) {
														o === e && ++o;
													}),
													s.forEach(function (e) {
														o === e && ++o;
													}),
													s.forEach(function (e) {
														o === e && ++o;
													})),
													a[t][r][i].forEach(function (e) {
														o === e && ++o;
													}),
													a[t][r][i].forEach(function (e) {
														o === e && ++o;
													}),
													a[t][r][i].push(o),
													e.startSlur.push({ label: o }),
													e.dottedSlur && ((e.startSlur[e.startSlur.length - 1].style = 'dotted'), delete e.dottedSlur),
													o++;
										},
										o = 0;
									o < e.length;
									o++
								) {
									var c = e[o];
									if ('note' === c.el_type) {
										if (c.gracenotes)
											for (var l = 0; l < c.gracenotes.length; l++) {
												if (c.gracenotes[l].endSlur) {
													var h = c.gracenotes[l].endSlur;
													c.gracenotes[l].endSlur = [];
													for (var u = 0; u < h; u++) i(c.gracenotes[l], 1, 20);
												}
												c.gracenotes[l].startSlur && ((n = c.gracenotes[l].startSlur), s(c.gracenotes[l], n, 20));
											}
										if (
											(c.endSlur && ((n = c.endSlur), (c.endSlur = []), i(c, n, 0)),
											c.startSlur && s(c, (n = c.startSlur), 0),
											c.pitches)
										) {
											for (var d = [], f = 0; f < c.pitches.length; f++)
												if (c.pitches[f].endSlur) {
													var p = c.pitches[f].endSlur;
													c.pitches[f].endSlur = [];
													for (var m = 0; m < p; m++) {
														var g = i(c.pitches[f], 1, f + 1);
														d.push(g);
													}
												}
											for (f = 0; f < c.pitches.length; f++)
												c.pitches[f].startSlur && ((n = c.pitches[f].startSlur), s(c.pitches[f], n, f + 1, d));
											c.gracenotes &&
												c.pitches[0].endSlur &&
												100 === c.pitches[0].endSlur[0] &&
												c.pitches[0].startSlur &&
												(c.gracenotes[0].endSlur
													? c.gracenotes[0].endSlur.push(c.pitches[0].startSlur[0].label)
													: (c.gracenotes[0].endSlur = [c.pitches[0].startSlur[0].label]),
												1 === c.pitches[0].endSlur.length
													? delete c.pitches[0].endSlur
													: 100 === c.pitches[0].endSlur[0]
													? c.pitches[0].endSlur.shift()
													: 100 === c.pitches[0].endSlur[c.pitches[0].endSlur.length - 1] && c.pitches[0].endSlur.pop(),
												1 === a[t][r][1].length ? delete a[t][r][1] : a[t][r][1].pop());
										}
									}
								}
							}
							function f(e) {
								n.fixClef(e);
							}
							function p(e, t) {
								for (s = 0; s < e.length; s++)
									if (void 0 !== e[s].staff)
										for (o = 0; o < e[s].staff.length; o++) {
											var r = [];
											for (c = 0; c < e[s].staff[o].voices.length; c++)
												for (var n = e[s].staff[o].voices[c], a = 0, l = 0; l < n.length; l++)
													if ('bar' === n[l].el_type) {
														if (++a >= t && l < n.length - 1) {
															var h = m(e, s);
															if (!h) {
																var u = JSON.parse(JSON.stringify(e[s]));
																e.push(i.clone(u)), (h = e[e.length - 1]);
																for (var d = 0; d < h.staff.length; d++)
																	for (var f = 0; f < h.staff[d].voices.length; f++) h.staff[d].voices[f] = [];
															}
															var p = l + 1,
																g = e[s].staff[o].voices[c].slice(p);
															return (
																(e[s].staff[o].voices[c] = e[s].staff[o].voices[c].slice(0, p)),
																(h.staff[o].voices[c] = r.concat(g.concat(h.staff[o].voices[c]))),
																!0
															);
														}
													} else n[l].duration || r.push(n[l]);
										}
								return !1;
							}
							function m(e, t) {
								for (t++; e.length > t; ) {
									if (e[t].staff) return e[t];
									t++;
								}
								return null;
							}
							for (e.lineNum = 0; e.lineNum < e.lines.length; e.lineNum++) {
								var g = e.lines[e.lineNum].staff;
								if (g)
									for (e.staffNum = 0; e.staffNum < g.length; e.staffNum++)
										for (
											g[e.staffNum].clef && f(g[e.staffNum].clef), e.voiceNum = 0;
											e.voiceNum < g[e.staffNum].voices.length;
											e.voiceNum++
										) {
											var v = g[e.staffNum].voices[e.voiceNum];
											d(v, e.staffNum, e.voiceNum);
											for (var b = 0; b < v.length; b++) 'clef' === v[b].el_type && f(v[b]);
											if (v.length > 0 && v[v.length - 1].barNumber) {
												var y = m(e.lines, e.lineNum);
												y && (y.staff[0].barNumber = v[v.length - 1].barNumber), delete v[v.length - 1].barNumber;
											}
										}
							}
							return (
								delete e.staffNum,
								delete e.voiceNum,
								delete e.lineNum,
								delete e.potentialStartBeam,
								delete e.potentialEndBeam,
								delete e.vskipPending,
								a
							);
						}),
						e.reset(),
						(this.getLastNote = function () {
							if (
								e.lines[e.lineNum] &&
								e.lines[e.lineNum].staff &&
								e.lines[e.lineNum].staff[e.staffNum] &&
								e.lines[e.lineNum].staff[e.staffNum].voices[e.voiceNum]
							)
								for (var t = e.lines[e.lineNum].staff[e.staffNum].voices[e.voiceNum].length - 1; t >= 0; t--) {
									var r = e.lines[e.lineNum].staff[e.staffNum].voices[e.voiceNum][t];
									if ('note' === r.el_type) return r;
								}
							return null;
						}),
						(this.addTieToLastNote = function (e) {
							var t = this.getLastNote();
							return (
								!!(t && t.pitches && t.pitches.length > 0) &&
								((t.pitches[0].startTie = {}), e && (t.pitches[0].startTie.style = 'dotted'), !0)
							);
						}),
						(this.getDuration = function (e) {
							return e.duration ? e.duration : 0;
						}),
						(this.closeLine = function () {
							e.potentialStartBeam &&
								e.potentialEndBeam &&
								((e.potentialStartBeam.startBeam = !0), (e.potentialEndBeam.endBeam = !0)),
								delete e.potentialStartBeam,
								delete e.potentialEndBeam;
						}),
						(this.appendElement = function (r, n, i, a) {
							var s = e;
							(a.el_type = r), null !== n && (a.startChar = n), null !== i && (a.endChar = i);
							var o = function () {
								void 0 !== s.potentialStartBeam &&
									void 0 !== s.potentialEndBeam &&
									((s.potentialStartBeam.startBeam = !0), (s.potentialEndBeam.endBeam = !0)),
									delete s.potentialStartBeam,
									delete s.potentialEndBeam;
							};
							'note' === r
								? t.getDuration(a) >= 0.25 || (a.force_end_beam_last && void 0 !== s.potentialStartBeam)
									? o()
									: a.end_beam && void 0 !== s.potentialStartBeam
									? void 0 === a.rest
										? ((s.potentialStartBeam.startBeam = !0),
										  (a.endBeam = !0),
										  delete s.potentialStartBeam,
										  delete s.potentialEndBeam)
										: o()
									: void 0 === a.rest &&
									  (void 0 === s.potentialStartBeam
											? a.end_beam || ((s.potentialStartBeam = a), delete s.potentialEndBeam)
											: (s.potentialEndBeam = a))
								: o(),
								delete a.end_beam,
								delete a.force_end_beam_last,
								(function (e) {
									var t = s.lines[s.lineNum].staff[s.staffNum];
									if (t) {
										if (void 0 !== e.pitches) {
											var r = t.workingClef.verticalPos;
											e.pitches.forEach(function (e) {
												e.verticalPos = e.pitch - r;
											});
										}
										if (void 0 !== e.gracenotes) {
											var n = t.workingClef.verticalPos;
											e.gracenotes.forEach(function (e) {
												e.verticalPos = e.pitch - n;
											});
										}
										t.voices[s.voiceNum].push(e);
									}
								})(a);
						}),
						(this.appendStartingElement = function (t, r, n, a) {
							var s;
							this.closeLine(),
								'key' === t && ((s = a.impliedNaturals), delete a.impliedNaturals, delete a.explicitAccidentals);
							var o = i.clone(a);
							if (e.lines[e.lineNum] && e.lines[e.lineNum].staff) {
								e.lines[e.lineNum].staff.length <= e.staffNum &&
									((e.lines[e.lineNum].staff[e.staffNum] = {}),
									(e.lines[e.lineNum].staff[e.staffNum].clef = i.clone(e.lines[e.lineNum].staff[0].clef)),
									(e.lines[e.lineNum].staff[e.staffNum].key = i.clone(e.lines[e.lineNum].staff[0].key)),
									e.lines[e.lineNum].staff[0].meter &&
										(e.lines[e.lineNum].staff[e.staffNum].meter = i.clone(e.lines[e.lineNum].staff[0].meter)),
									(e.lines[e.lineNum].staff[e.staffNum].workingClef = i.clone(e.lines[e.lineNum].staff[0].workingClef)),
									(e.lines[e.lineNum].staff[e.staffNum].voices = [[]])),
									'clef' === t && (e.lines[e.lineNum].staff[e.staffNum].workingClef = o);
								for (var c = e.lines[e.lineNum].staff[e.staffNum].voices[e.voiceNum], l = 0; l < c.length; l++) {
									if ('note' === c[l].el_type || 'bar' === c[l].el_type)
										return (
											(o.el_type = t),
											(o.startChar = r),
											(o.endChar = n),
											s && (o.accidentals = s.concat(o.accidentals)),
											void c.push(o)
										);
									if (c[l].el_type === t)
										return (
											(o.el_type = t),
											(o.startChar = r),
											(o.endChar = n),
											s && (o.accidentals = s.concat(o.accidentals)),
											void (c[l] = o)
										);
								}
								e.lines[e.lineNum].staff[e.staffNum][t] = a;
							}
						}),
						(this.pushLine = function (t) {
							e.vskipPending && ((t.vskip = e.vskipPending), delete e.vskipPending), e.lines.push(t);
						}),
						(this.addSubtitle = function (e, t) {
							this.pushLine({ subtitle: { text: e, startChar: t.startChar, endChar: t.endChar } });
						}),
						(this.addSpacing = function (t) {
							e.vskipPending = t;
						}),
						(this.addNewPage = function (e) {
							this.pushLine({ newpage: e });
						}),
						(this.addSeparator = function (e, t, r, n) {
							this.pushLine({
								separator: {
									spaceAbove: Math.round(e),
									spaceBelow: Math.round(t),
									lineLength: Math.round(r),
									startChar: n.startChar,
									endChar: n.endChar
								}
							});
						}),
						(this.addText = function (e, t) {
							this.pushLine({ text: { text: e, startChar: t.startChar, endChar: t.endChar } });
						}),
						(this.addCentered = function (e) {
							this.pushLine({ text: [{ text: e, center: !0 }] });
						}),
						(this.containsNotes = function (e) {
							for (var t = 0; t < e.length; t++) if ('note' === e[t].el_type || 'bar' === e[t].el_type) return !0;
							return !1;
						}),
						(this.containsNotesStrict = function (e) {
							for (var t = 0; t < e.length; t++)
								if ('note' === e[t].el_type && (void 0 === e[t].rest || void 0 !== e[t].chord)) return !0;
							return !1;
						}),
						(this.changeVoiceScale = function (e) {
							t.appendElement('scale', null, null, { size: e });
						}),
						(this.changeVoiceColor = function (e) {
							t.appendElement('color', null, null, { color: e });
						}),
						(this.startNewLine = function (r) {
							var n = e;
							this.closeLine();
							var i = function (e) {
									var r = n.lines[n.lineNum].staff[n.staffNum];
									if (
										((r.voices[n.voiceNum] = []),
										r.title || (r.title = []),
										(r.title[n.voiceNum] = { name: e.name, subname: e.subname }),
										e.style && t.appendElement('style', null, null, { head: e.style }),
										e.stem)
									)
										t.appendElement('stem', null, null, { direction: e.stem });
									else if (n.voiceNum > 0) {
										if (void 0 !== r.voices[0]) {
											for (var i = !1, a = 0; a < r.voices[0].length; a++) 'stem' === r.voices[0].el_type && (i = !0);
											i || r.voices[0].splice(0, 0, { el_type: 'stem', direction: 'up' });
										}
										t.appendElement('stem', null, null, { direction: 'down' });
									}
									e.scale && t.appendElement('scale', null, null, { size: e.scale }),
										e.color && t.appendElement('color', null, null, { color: e.color });
								},
								a = function (e) {
									e.key &&
										e.key.impliedNaturals &&
										((e.key.accidentals = e.key.accidentals.concat(e.key.impliedNaturals)),
										delete e.key.impliedNaturals),
										(n.lines[n.lineNum].staff[n.staffNum] = {
											voices: [],
											clef: e.clef,
											key: e.key,
											workingClef: e.clef
										}),
										void 0 !== e.stafflines &&
											((n.lines[n.lineNum].staff[n.staffNum].clef.stafflines = e.stafflines),
											(n.lines[n.lineNum].staff[n.staffNum].workingClef.stafflines = e.stafflines)),
										e.staffscale && (n.lines[n.lineNum].staff[n.staffNum].staffscale = e.staffscale),
										e.annotationfont && t.setLineFont('annotationfont', e.annotationfont),
										e.gchordfont && t.setLineFont('gchordfont', e.gchordfont),
										e.tripletfont && t.setLineFont('tripletfont', e.tripletfont),
										e.vocalfont && t.setLineFont('vocalfont', e.vocalfont),
										e.bracket && (n.lines[n.lineNum].staff[n.staffNum].bracket = e.bracket),
										e.brace && (n.lines[n.lineNum].staff[n.staffNum].brace = e.brace),
										e.connectBarLines && (n.lines[n.lineNum].staff[n.staffNum].connectBarLines = e.connectBarLines),
										e.barNumber && (n.lines[n.lineNum].staff[n.staffNum].barNumber = e.barNumber),
										i(e),
										e.part && t.appendElement('part', e.part.startChar, e.part.endChar, { title: e.part.title }),
										void 0 !== e.meter && (n.lines[n.lineNum].staff[n.staffNum].meter = e.meter),
										n.vskipPending && ((n.lines[n.lineNum].vskip = n.vskipPending), delete n.vskipPending);
								};
							void 0 === e.lines[e.lineNum]
								? (function (e) {
										(n.lines[n.lineNum] = { staff: [] }), a(e);
								  })(r)
								: void 0 === e.lines[e.lineNum].staff
								? (e.lineNum++, this.startNewLine(r))
								: void 0 === e.lines[e.lineNum].staff[e.staffNum]
								? a(r)
								: void 0 === e.lines[e.lineNum].staff[e.staffNum].voices[e.voiceNum]
								? i(r)
								: this.containsNotes(e.lines[e.lineNum].staff[e.staffNum].voices[e.voiceNum])
								? (e.lineNum++, this.startNewLine(r))
								: r.part && t.appendElement('part', r.part.startChar, r.part.endChar, { title: r.part.title });
						}),
						(this.setRunningFont = function (t, r) {
							e.runningFonts[t] = r;
						}),
						(this.setLineFont = function (t, r) {
							if (e.runningFonts[t]) {
								for (var n = !1, i = Object.keys(r), a = 0; a < i.length; a++)
									e.runningFonts[t][i[a]] !== r[i[a]] && (n = !0);
								n && (e.lines[e.lineNum].staff[e.staffNum][t] = r);
							}
							e.runningFonts[t] = r;
						}),
						(this.setBarNumberImmediate = function (e) {
							var t = this.getCurrentVoice();
							if (t && t.length > 0) {
								var r = t[t.length - 1];
								if ('bar' !== r.el_type) return e - 1;
								void 0 !== r.barNumber && (r.barNumber = e);
							}
							return e;
						}),
						(this.hasBeginMusic = function () {
							for (var t = 0; t < e.lines.length; t++) if (e.lines[t].staff) return !0;
							return !1;
						}),
						(this.isFirstLine = function (t) {
							for (var r = t - 1; r >= 0; r--) if (void 0 !== e.lines[r].staff) return !1;
							return !0;
						}),
						(this.getCurrentVoice = function () {
							var t = e.lines[e.lineNum];
							if (!t) return null;
							var r = t.staff[e.staffNum];
							return r && void 0 !== r.voices[e.voiceNum] ? r.voices[e.voiceNum] : null;
						}),
						(this.setCurrentVoice = function (t, r) {
							(e.staffNum = t), (e.voiceNum = r);
							for (var n = 0; n < e.lines.length; n++)
								if (
									e.lines[n].staff &&
									(void 0 === e.lines[n].staff[t] ||
										void 0 === e.lines[n].staff[t].voices[r] ||
										!this.containsNotes(e.lines[n].staff[t].voices[r]))
								)
									return void (e.lineNum = n);
							e.lineNum = n;
						}),
						(this.addMetaText = function (t, r, n) {
							void 0 === e.metaText[t]
								? ((e.metaText[t] = r), (e.metaTextInfo[t] = n))
								: ((e.metaText[t] += '\n' + r), (e.metaTextInfo[t].endChar = n.endChar));
						}),
						(this.addMetaTextArray = function (t, r, n) {
							void 0 === e.metaText[t]
								? ((e.metaText[t] = [r]), (e.metaTextInfo[t] = n))
								: (e.metaText[t].push(r), (e.metaTextInfo[t].endChar = n.endChar));
						}),
						(this.addMetaTextObj = function (t, r, n) {
							(e.metaText[t] = r), (e.metaTextInfo[t] = n);
						});
				};
			},
			1756: function (e) {
				function t(e, t) {
					for (var r = [], n = [], i = 0, a = 0; a < e.length; a++) {
						var s = e[a],
							o = i + s;
						o < t
							? (i = o)
							: t - i < o - t && i > 0
							? (r.push(a - 1), n.push(Math.round(i - s)), (i = s))
							: a < e.length - 1 && (r.push(a), n.push(Math.round(i)), (i = 0));
					}
					return n.push(Math.round(i)), { lineBreaks: r, totals: n };
				}
				function r(e) {
					for (var t = [], r = 0; r < e.length; r++) t.push(e[r]);
					return t;
				}
				function n(e, t, n, i, a, s, o, c, l, h, u) {
					for (var d = h; d < e.length; d++) {
						var f = e[d];
						(n += f), (i += f);
						var p = Math.abs(n - t[c]);
						if (Math.abs(p - s) < t[0] / 10)
							if (p < s) {
								var m = r(a),
									g = r(l);
								g.push(d - 1),
									m.push(i - f),
									u.push({
										accumulator: n,
										lineAccumulator: f,
										lineWidths: m,
										lastVariance: Math.abs(n - t[c + 1]),
										highestVariance: Math.max(o, s),
										currLine: c + 1,
										lineBreaks: g,
										startIndex: d + 1
									});
							} else
								p > s &&
									d < e.length - 1 &&
									((m = r(a)),
									(g = r(l)),
									u.push({
										accumulator: n,
										lineAccumulator: i,
										lineWidths: m,
										lastVariance: p,
										highestVariance: Math.max(o, p),
										currLine: c,
										lineBreaks: g,
										startIndex: d + 1
									}));
						p > s
							? (l.push(d - 1), c++, (o = Math.max(o, s)), (s = Math.abs(n - t[c])), a.push(i - f), (i = f))
							: (s = p);
					}
					a.push(i);
				}
				function i(e, t, r, i) {
					for (var a = Math.ceil(e.total / t), s = Math.floor(e.total / a), o = [], c = 0; c < a; c++)
						o.push(s * (c + 1));
					var l = [];
					l.push({
						accumulator: 0,
						lineAccumulator: 0,
						lineWidths: [],
						lastVariance: 999999,
						highestVariance: 0,
						currLine: 0,
						lineBreaks: [],
						startIndex: 0
					});
					for (var h = 0; h < l.length; )
						n(
							e.measureWidths,
							o,
							l[h].accumulator,
							l[h].lineAccumulator,
							l[h].lineWidths,
							l[h].lastVariance,
							l[h].highestVariance,
							l[h].currLine,
							l[h].lineBreaks,
							l[h].startIndex,
							l
						),
							h++;
					for (c = 0; c < l.length; c++) {
						var u = l[c];
						(u.variances = []), (u.aveVariance = 0);
						for (var d = 0; d < u.lineWidths.length; d++) {
							var f = u.lineWidths[d];
							u.variances.push(f - o[0]), (u.aveVariance += Math.abs(f - o[0]));
						}
						(u.aveVariance = u.aveVariance / u.lineWidths.length),
							i.attempts.push({
								type: 'optimizeLineWidths',
								lineBreaks: u.lineBreaks,
								variances: u.variances,
								aveVariance: u.aveVariance,
								widths: e.measureWidths
							});
					}
					var p = 9999999,
						m = -1;
					for (c = 0; c < l.length; c++) (u = l[c]).aveVariance < p && ((p = u.aveVariance), (m = c));
					return { failed: !1, lineBreaks: l[m].lineBreaks, variance: l[m].highestVariance };
				}
				function a(e, t, r) {
					for (var n = [], i = [], a = 0, s = !1, o = 0; o < e.length; o++)
						(a += e[o]) > t && (s = !0),
							o % r == r - 1 && (o !== e.length - 1 && n.push(o), i.push(Math.round(a)), (a = 0));
					return { failed: s, totals: i, lineBreaks: n };
				}
				e.exports = {
					wrapLines: function (e, t, r) {
						if (t && 0 !== e.lines.length) {
							var n = e.deline({ lineBreaks: !1 }),
								i = (function (e, t) {
									for (var r = [], n = 0, i = 0, a = 0, s = 0; s < e.length; s++) {
										var o = e[s];
										if (o.staff) {
											var c = i,
												l = t[n];
											n++;
											for (var h = 0; h < o.staff.length; h++)
												for (var u = o.staff[h], d = 0; d < u.voices.length; d++) {
													a = c;
													for (var f = 0, p = 0, m = u.voices[d], g = 0, v = 0; v < m.length; v++)
														'bar' === m[v].el_type &&
															(l[p] === f &&
																(r.push({ ogLine: s, line: a, staff: h, voice: d, start: g, end: v }),
																(g = v + 1),
																a++,
																(i = Math.max(i, a)),
																p++),
															f++);
													r.push({ ogLine: s, line: a, staff: h, voice: d, start: g, end: m.length }),
														a++,
														(i = Math.max(i, a));
												}
										} else r.push({ ogLine: s, line: a }), a++, (i = Math.max(i, a));
									}
									return r;
								})(n, t);
							(e.lines = (function (e, t, r) {
								for (var n = [], i = [], a = [], s = 1, o = 0; o < t.length; o++) {
									var c = t[o];
									if (e[c.ogLine].staff) {
										var l = e[c.ogLine].staff[c.staff];
										if ((n[c.line] || (n[c.line] = { staff: [] }), !n[c.line].staff[c.staff])) {
											(n[c.line].staff[c.staff] = { voices: [] }),
												void 0 !== r && 0 === c.staff && c.line > 0 && (n[c.line].staff[c.staff].barNumber = s);
											for (var h = Object.keys(l), u = 0; u < h.length; u++) {
												var d = 'voices' === h[u];
												'meter' === h[u] && 0 !== c.line && (d = !0), d || (n[c.line].staff[c.staff][h[u]] = l[h[u]]);
											}
											i[c.staff] && (n[c.line].staff[c.staff].key = i[c.staff]);
										}
										n[c.line].staff[c.staff].voices[c.voice] || (n[c.line].staff[c.staff].voices[c.voice] = []),
											(n[c.line].staff[c.staff].voices[c.voice] = e[c.ogLine].staff[c.staff].voices[c.voice].slice(
												c.start,
												c.end + 1
											)),
											a[10 * c.staff + c.voice] &&
												n[c.line].staff[c.staff].voices[c.voice].unshift({
													el_type: 'stem',
													direction: a[10 * c.staff + c.voice].direction
												});
										for (var f = n[c.line].staff[c.staff].voices[c.voice], p = f.length - 1; p >= 0; p--)
											if ('key' === f[p].el_type) {
												i[c.staff] = {
													root: f[p].root,
													acc: f[p].acc,
													mode: f[p].mode,
													accidentals: f[p].accidentals.filter(function (e) {
														return 'natural' !== e.acc;
													})
												};
												break;
											}
										for (p = f.length - 1; p >= 0; p--)
											if ('stem' === f[p].el_type) {
												a[10 * c.staff + c.voice] = { direction: f[p].direction };
												break;
											}
										if (void 0 !== r && 0 === c.staff && 0 === c.voice)
											for (p = 0; p < f.length; p++)
												'bar' === f[p].el_type &&
													(s++, p === f.length - 1 ? delete f[p].barNumber : (f[p].barNumber = s));
									} else n[c.line] = e[c.ogLine];
								}
								for (var m = 0; m < n.length; m++)
									n[m].staff &&
										(n[m].staff = n[m].staff.filter(function (e) {
											return null != e;
										}));
								return n;
							})(n, i, r)),
								(e.lineBreaks = i);
						}
					},
					calcLineWraps: function (e, r, n) {
						if (0 === r.length || n.staffwidth < r[0].left)
							return { reParse: !1, explanation: 'Staff width is narrower than the margin', revisedParams: n };
						var s = n.scale ? Math.max(n.scale, 0.1) : 1,
							o = n.wrap.minSpacing ? Math.max(parseFloat(n.wrap.minSpacing), 1) : 1,
							c = n.wrap.minSpacingLimit ? Math.max(parseFloat(n.wrap.minSpacingLimit), 1) : o - 0.1,
							l = n.wrap.maxSpacing ? Math.max(parseFloat(n.wrap.maxSpacing), 1) : void 0;
						n.wrap.lastLineLimit && !l && (l = Math.max(parseFloat(n.wrap.lastLineLimit), 1));
						for (
							var h = n.wrap.preferredMeasuresPerLine
									? Math.max(parseInt(n.wrap.preferredMeasuresPerLine, 10), 0)
									: void 0,
								u = [],
								d = [],
								f = 0;
							f < r.length;
							f++
						) {
							var p = r[f],
								m = n.staffwidth - p.left,
								g = m / o / s,
								v = m / c / s,
								b = {
									widths: p,
									lineBreakPoint: g,
									minLineSize: m / l / s,
									attempts: [],
									staffWidth: n.staffwidth,
									minWidth: Math.round(v)
								},
								y = null;
							if (h) {
								var x = a(p.measureWidths, g, h);
								b.attempts.push({
									type: 'Fixed Measures Per Line',
									preferredMeasuresPerLine: h,
									lineBreaks: x.lineBreaks,
									failed: x.failed,
									totals: x.totals
								}),
									x.failed || (y = x.lineBreaks);
							}
							if (!y) {
								var w = t(p.measureWidths, g);
								b.attempts.push({ type: 'Free Form', lineBreaks: w.lineBreaks, totals: w.totals }),
									(y = w.lineBreaks).length > 0 &&
										p.measureWidths.length < 25 &&
										((w = i(p, g, 0, b)),
										b.attempts.push({
											type: 'Optimize',
											failed: w.failed,
											reason: w.reason,
											lineBreaks: w.lineBreaks,
											totals: w.totals
										}),
										w.failed || (y = w.lineBreaks));
							}
							u.push(y), d.push(b);
						}
						var k = (function (e, t, r) {
							var n = { lineBreaks: e, staffwidth: t };
							for (var i in r) r.hasOwnProperty(i) && 'wrap' !== i && 'staffwidth' !== i && (n[i] = r[i]);
							return { revisedParams: n };
						})(u, n.staffwidth, n);
						return (k.explanation = d), (k.reParse = !0), k;
					}
				};
			},
			5633: function (e, t, r) {
				var n,
					i = r(9447),
					a = r(4914),
					s = a.relativeMajor,
					o = a.transposeKey,
					c = a.relativeMode,
					l = r(4208);
				!(function () {
					'use strict';
					function e(e, r, n) {
						var i = [],
							a = r.getKeySignature();
						if ('Hp' === a.root || 'HP' === a.root) return i;
						i = i.concat(
							(function (e, t) {
								for (var r = [], n = e.split('K:'), i = n[0].length, a = 1; a < n.length; a++) {
									var s = n[a],
										o = s.match(/^( *)([A-G])([#b]?)(\w*)/);
									if (o) {
										var c = i + 2 + o[1].length,
											l = o[2] + o[3] + o[4],
											h = f({ root: o[2], acc: o[3], mode: o[4] }, t),
											u = h.root + h.acc + h.mode;
										r.push({ start: c, end: c + l.length, note: u });
									}
									i += s.length + 2;
								}
								return r;
							})(e, n)
						);
						for (var s = 0; s < r.lines.length; s++) {
							var o = r.lines[s].staff;
							if (o)
								for (var c = 0; c < o.length; c++) {
									var l = o[c];
									'perc' !== l.clef.type && (i = i.concat(t(e, l.voices, l.key, n)));
								}
						}
						return i;
					}
					function t(e, t, n, i) {
						for (var a = [], s = f(n, i), o = 0; o < t.length; o++) a = a.concat(h(e, t[o], n.root, r(n), s, i));
						return a;
					}
					function r(e) {
						for (var t = {}, r = 0; r < e.accidentals.length; r++) {
							var n = e.accidentals[r];
							'flat' === n.acc ? (t[n.note.toUpperCase()] = '_') : 'sharp' === n.acc && (t[n.note.toUpperCase()] = '^');
						}
						return t;
					}
					function a(e, t, r) {
						var n = u.indexOf(e.root) - u.indexOf(t);
						return (
							'none' === t && (n = u.indexOf(e.root)),
							0 === n
								? r > 2
									? (n += 7)
									: -12 === r && (n -= 7)
								: r > 0 && n < 0
								? (n += 7)
								: r < 0 && n > 0 && (n -= 7),
							r > 12 ? (n += 7) : r < -12 && (n -= 7),
							n
						);
					}
					function h(e, t, n, i, s, o) {
						for (var c = [], h = a(s, n, o), u = {}, d = {}, m = 0; m < t.length; m++) {
							var g = t[m];
							if (g.chord)
								for (var v = 0; v < g.chord.length; v++) {
									var b = g.chord[v];
									if ('default' === b.position) {
										var C = s.accidentals.length && 'flat' === s.accidentals[0].acc,
											T = l(b.name, o, C, !0);
										(T = T.replace(/♭/g, 'b').replace(/♯/g, '#')) !== b.name && c.push(k(e, g.startChar, g.endChar, T));
									}
								}
							if ('note' === g.el_type && g.pitches) {
								for (var _ = 0; _ < g.pitches.length; _++) {
									var S = y(g.pitches[_].name, n, i, u);
									S.acc && (u[S.name.toUpperCase()] = S.acc);
									var E = p(S, s, h, d);
									E.acc && (d[E.upper] = E.acc), c.push(x(e, g.startChar, g.endChar, E.acc + E.name, _));
								}
								if (g.gracenotes)
									for (var M = 0; M < g.gracenotes.length; M++) {
										var N = y(g.gracenotes[M].name, n, i, u);
										N.acc && (u[N.name.toUpperCase()] = N.acc);
										var A = p(N, s, h, u);
										A.acc && (d[A.upper] = A.acc), c.push(w(e, g.startChar, g.endChar, A.acc + A.name, M));
									}
							} else
								'bar' === g.el_type
									? ((u = {}), (d = {}))
									: 'keySignature' === g.el_type && ((n = g.root), (i = r(g)), (h = a((s = f(g, o)), n, o)));
						}
						return c;
					}
					n = function (t, r, n) {
						if ('TEST' === r)
							return { keyAccidentals: i, relativeMajor: s, transposeKey: o, relativeMode: c, transposeChordName: l };
						n = parseInt(n, 10);
						var a,
							h = [];
						for (a = 0; a < r.length; a++) h = h.concat(e(t, r[a], n));
						h = h.sort(function (e, t) {
							return t.start - e.start;
						});
						var u = t.split('');
						for (a = 0; a < h.length; a++) {
							var d = h[a];
							u.splice(d.start, d.end - d.start, d.note);
						}
						return u.join('');
					};
					var u = 'CDEFGAB',
						d = [',,,,', ',,,', ',,', ',', '', "'", "''", "'''", "''''"];
					function f(e, t) {
						if ('none' === e.root) return { root: o('C', t), mode: '', acc: '', accidentals: [] };
						var r = s(e.root + e.acc + e.mode),
							n = o(r, t),
							a = c(n, e.mode),
							l = i(n);
						return { root: a[0], mode: e.mode, acc: a.length > 1 ? a[1] : '', accidentals: l };
					}
					function p(e, t, r, n) {
						for (var i = e.pitch, a = u.indexOf(e.name), s = (u.indexOf(t.root) + i) % 7, o = a + r, c = e.oct; o > 6; )
							c++, (o -= 7);
						for (; o < 0; ) c--, (o += 7);
						for (var l = u[s], h = '', d = e.adj, f = '=', m = 0; m < t.accidentals.length; m++)
							if (t.accidentals[m].note.toLowerCase() === l.toLowerCase()) {
								(d += 'flat' === t.accidentals[m].acc ? -1 : 1), (f = 'flat' === t.accidentals[m].acc ? '_' : '^');
								break;
							}
						switch (d) {
							case -2:
								h = '__';
								break;
							case -1:
								h = '_';
								break;
							case 0:
								h = '=';
								break;
							case 1:
								h = '^';
								break;
							case 2:
								h = '^^';
								break;
							case -3:
								return (
									((g = {}).pitch = e.pitch - 1),
									(g.oct = e.oct),
									(g.name = u[u.indexOf(e.name) - 1]),
									g.name || ((g.name = 'B'), g.oct--),
									'B' === g.name || 'E' === g.name ? (g.adj = e.adj + 1) : (g.adj = e.adj + 2),
									p(g, t, r + 1, n)
								);
							case 3:
								var g;
								return (
									((g = {}).pitch = e.pitch + 1),
									(g.oct = e.oct),
									(g.name = u[u.indexOf(e.name) + 1]),
									g.name || ((g.name = 'C'), g.oct++),
									'C' === g.name || 'F' === g.name ? (g.adj = e.adj - 1) : (g.adj = e.adj - 2),
									p(g, t, r + 1, n)
								);
						}
						switch (((n[l] !== h && (n[l] || h !== f)) || e.courtesy || (h = ''), c)) {
							case 0:
								l += ',,,';
								break;
							case 1:
								l += ',,';
								break;
							case 2:
								l += ',';
								break;
							case 4:
								l = l.toLowerCase();
								break;
							case 5:
								l = l.toLowerCase() + "'";
								break;
							case 6:
								l = l.toLowerCase() + "''";
								break;
							case 7:
								l = l.toLowerCase() + "'''";
								break;
							case 8:
								l = l.toLowerCase() + "''''";
						}
						return c > 4 && (l = l.toLowerCase()), { acc: h, name: l, upper: l.toUpperCase() };
					}
					var m = /([_^=]*)([A-Ga-g])([,']*)/,
						g = /([_^=]*[A-Ga-g][,']*)(\d*\/*\d*)([\>\<\-\)\.\s\\]*)/,
						v = /([_^=]*[A-Ga-g][,']*)?(\d*\/*\d*)?([\>\<\-\)]*)?/,
						b = /(\s*)$/;
					function y(e, t, r, n) {
						var i = 'none' === t ? 0 : u.indexOf(t),
							a = e.match(m),
							s = a[2].toUpperCase(),
							o = u.indexOf(s) - i;
						o < 0 && (o += 7);
						var c = d.indexOf(a[3]);
						s === a[2] && c--;
						var l = n[s] || r[s] || '=';
						return { acc: a[1], name: s, pitch: o, oct: c, adj: C(a[1], r[s], n[s]), courtesy: a[1] === l };
					}
					function x(e, t, r, n, i) {
						var a = e.substring(t, r),
							s = a.match(new RegExp(g.source + b.source), '');
						if (s) {
							var o = s[1].length,
								c = s[2].length + s[3].length + s[4].length;
							(t += r - t - o - c), (r -= c);
						} else if (
							(s = a.match(
								new RegExp(
									/([^\[]*)/.source +
										/\[/.source +
										v.source +
										v.source +
										v.source +
										v.source +
										v.source +
										v.source +
										v.source +
										v.source +
										/\-?](\d*\/*\d*)?([\>\<\-\)]*)/.source +
										b.source
								)
							))
						) {
							for (var l = 1 + s[1].length, h = 0; h < i; h++)
								s[3 * h + 2] && (l += s[3 * h + 2].length),
									s[3 * h + 3] && (l += s[3 * h + 3].length),
									s[3 * h + 4] && (l += s[3 * h + 4].length);
							r = (t += l) + (s[3 * i + 2] ? s[3 * i + 2].length : 0);
						}
						return { start: t, end: r, note: n };
					}
					function w(e, t, r, n, i) {
						var a = /(\/*)/,
							s = e
								.substring(t, r)
								.match(
									new RegExp(
										/([^\{]*)/.source +
											/\{/.source +
											a.source +
											v.source +
											a.source +
											v.source +
											a.source +
											v.source +
											a.source +
											v.source +
											a.source +
											v.source +
											a.source +
											v.source +
											a.source +
											v.source +
											a.source +
											v.source +
											/\}/.source
									)
								);
						if (s) {
							for (var o = 1 + s[1].length, c = 0; c < i; c++)
								s[3 * c + 2] && (o += s[3 * c + 2].length),
									s[3 * c + 3] && (o += s[3 * c + 3].length),
									s[3 * c + 4] && (o += s[3 * c + 4].length),
									s[3 * c + 5] && (o += s[3 * c + 5].length);
							s[3 * i + 2] && (o += s[3 * c + 2].length), (t += o);
							var l = s[3 * i + 3] ? s[3 * i + 3].length : 0;
							(l += s[3 * i + 4] ? s[3 * i + 4].length : 0), (r = t + (l += s[3 * i + 5] ? s[3 * i + 5].length : 0));
						}
						return { start: t, end: r, note: n };
					}
					function k(e, t, r, n) {
						var i = e.substring(t, r).match(/([^"]+)?(".+")+/);
						return i[1] && (t += i[1].length), { start: t + 1, end: (r = t + i[2].length) - 1, note: n };
					}
					function C(e, t, r) {
						if ((!e && r && (e = r), !e)) return 0;
						switch (t) {
							case void 0:
								switch (e) {
									case '__':
										return -2;
									case '_':
										return -1;
									case '=':
									default:
										return 0;
									case '^':
										return 1;
									case '^^':
										return 2;
								}
							case '_':
								switch (e) {
									case '__':
										return -1;
									case '_':
									default:
										return 0;
									case '=':
										return 1;
									case '^':
										return 2;
									case '^^':
										return 3;
								}
							case '^':
								switch (e) {
									case '__':
										return -3;
									case '_':
										return -2;
									case '=':
										return -1;
									case '^':
									default:
										return 0;
									case '^^':
										return 1;
								}
						}
						return 0;
					}
				})(),
					(e.exports = n);
			},
			9716: function (e, t, r) {
				var n,
					i = r(5008),
					a = r(5058);
				!(function () {
					'use strict';
					var e,
						t,
						r,
						s,
						o,
						c,
						l,
						h,
						u,
						d,
						f,
						p,
						m,
						g,
						v,
						b,
						y,
						x,
						w,
						k,
						C,
						T,
						_,
						S,
						E = 1,
						M = { num: 4, den: 4 },
						N = 0,
						A = 0,
						B = 128,
						P = 64,
						L = 48,
						H = !1,
						O = !1,
						z = !0,
						D = 105,
						F = 95,
						I = 85,
						j = 0.25,
						V = 0,
						G = {},
						Y = 0;
					function q(e) {
						for (var t = u.length - 1; t >= 0; t--) if ('program' === u[t].cmd) return void (u[t].channel = e);
					}
					function W() {
						for (var e = !0, t = 0; t < p.length && e; t++) 'note' === p[t].cmd && (e = !1);
						return e;
					}
					function R(e) {
						return e / 1e6;
					}
					function X(e) {
						return Math.round(e * E * 1e6) / 1e6;
					}
					function U(e) {
						switch (parseInt(e.den, 10)) {
							case 2:
								return 0.5;
							case 4:
								return 0.25;
							case 8:
								return e.num % 3 == 0 ? 0.375 : 0.125;
							case 16:
								return 0.125;
						}
						return 0.25;
					}
					n = function (n, i, a, B) {
						i || (i = {}),
							B || (B = {}),
							(e = []),
							(t = [0, 0, 0, 0, 0, 0, 0]),
							(s = []),
							(o = i.qpm),
							(c = void 0),
							(E = 1),
							(l = void 0),
							(h = void 0),
							(u = void 0),
							(d = void 0),
							(f = 0),
							(S = a),
							(M = { num: 4, den: 4 }),
							(p = []),
							(m = !1),
							(v = n.length),
							(g = !1),
							(b = []),
							(N = B.bassprog && 1 === B.bassprog.length ? B.bassprog[0] : 0),
							(A = B.chordprog && 1 === B.chordprog.length ? B.chordprog[0] : 0),
							(P = B.bassvol && 1 === B.bassvol.length ? B.bassvol[0] : 64),
							(L = B.chordvol && 1 === B.chordvol.length ? B.chordvol[0] : 48),
							(y = void 0),
							(x = void 0),
							(H = !!i.chordsOff),
							(O = !1),
							(z = !0),
							(D = 105),
							(F = 95),
							(I = 85),
							(j = 0.25),
							(k = void 0),
							(C = void 0),
							(V = 0),
							(T = []),
							(G = {}),
							(_ = 1),
							n.length > 0 && n[0].length > 0 && (Y = n[0][0].pickupLength),
							(function (e, t) {
								for (var r = 0; r < e.length; r++) {
									for (var n = e[r], i = {}, a = t.qpm, s = 0, o = 1, c = 0; c < n.length; c++) {
										var l = n[c];
										if ('tempo' !== l.el_type) {
											l.time = s;
											var h = l.duration ? l.duration : 0;
											if (((s += Math.round(h * o * 1e6)), l.pitches)) {
												for (var u = 0; u < l.pitches.length; u++) {
													var d = l.pitches[u];
													if (d)
														if (((d.duration = l.duration), d.startTie))
															void 0 === i[d.pitch]
																? (i[d.pitch] = { el: c, pitch: u })
																: ((n[i[d.pitch].el].pitches[i[d.pitch].pitch].duration += d.duration),
																  (l.pitches[u] = null));
														else if (d.endTie) {
															var f = i[d.pitch];
															if (f) {
																var p = d.duration;
																delete n[f.el].pitches[f.pitch].startTie,
																	(n[f.el].pitches[f.pitch].duration += p),
																	(l.pitches[u] = null),
																	delete i[d.pitch];
															} else delete d.endTie;
														}
												}
												delete l.duration;
											}
										} else a ? (o = l.qpm ? a / l.qpm : 1) : (a = l.qpm);
									}
									for (var m in i)
										if (i.hasOwnProperty(m)) {
											var g = i[m];
											delete n[g.el].pitches[g.pitch].startTie;
										}
								}
							})(n, i);
						for (var X = 0; X < n.length; X++) {
							r = 0;
							var K = n[X];
							(u = [{ cmd: 'program', channel: X, instrument: l }]), (d = void 0), (w = 0);
							var Q = !1;
							(!0 === i.voicesOff || (i.voicesOff && i.voicesOff.length && i.voicesOff.indexOf(X) >= 0)) && (Q = !0);
							for (var $ = 0; $ < K.length; $++) {
								var J = K[$];
								switch (J.el_type) {
									case 'name':
										d = { cmd: 'text', type: 'name', text: J.trackName };
										break;
									case 'note':
										Z(J, Q) && (m = X);
										break;
									case 'key':
										t = re(J);
										break;
									case 'meter':
										c || (c = J), (j = U((M = J))), fe();
										break;
									case 'tempo':
										o ? (E = J.qpm ? o / J.qpm : 1) : (o = J.qpm);
										break;
									case 'transpose':
										r = J.transpose;
										break;
									case 'bar':
										p.length > 0 && (!1 === m || X === m) && (ue(w, R(J.time)), (b = [])),
											(e = []),
											0 === X && pe(n.length + 1),
											(O = !1),
											(x = y),
											(w = R(J.time));
										break;
									case 'bagpipes':
										break;
									case 'instrument':
										if (
											(void 0 === l && (l = J.program),
											(h = J.program),
											u.length > 0 && 'program' === u[u.length - 1].cmd)
										)
											u[u.length - 1].instrument = J.program;
										else {
											var ee;
											for (ee = u.length - 1; ee >= 0 && 'program' !== u[ee].cmd; ee--);
											(ee < 0 || u[ee].instrument !== J.program) &&
												u.push({ cmd: 'program', channel: 0, instrument: J.program });
										}
										break;
									case 'channel':
										q(J.channel);
										break;
									case 'drum':
										(G = de(J.params)), fe();
										break;
									case 'gchord':
										i.chordsOff || (H = J.tacet);
										break;
									case 'beat':
										(D = J.beats[0]), (F = J.beats[1]), (I = J.beats[2]);
										break;
									case 'vol':
										k = J.volume;
										break;
									case 'volinc':
										C = J.volume;
										break;
									case 'beataccents':
										z = J.value;
										break;
									default:
										console.log('MIDI creation. Unknown el_type: ' + J.el_type + '\n');
								}
							}
							void 0 === u[0].instrument && (u[0].instrument = l || 0),
								d && u.unshift(d),
								s.push(u),
								W() || (g = !0),
								T.length;
						}
						return (
							i.detuneOctave &&
								(function (e, t) {
									for (var r = {}, n = 0; n < e.length; n++)
										for (var i = 0; i < e[n].length; i++) {
											var a = e[n][i];
											'note' === a.cmd &&
												(void 0 === r[a.start] && (r[a.start] = []),
												r[a.start].push({ track: n, event: i, pitch: a.pitch }));
										}
									var s = Object.keys(r);
									for (n = 0; n < s.length; n++) {
										var o = r[s[n]];
										if (o.length > 1) {
											var c = (o = o.sort(function (e, t) {
													return e.pitch - t.pitch;
												}))[o.length - 1],
												l = c.pitch % 12,
												h = !1;
											for (i = 0; !h && i < o.length - 1; i++) o[i].pitch % 12 === l && (h = !0);
											if (h) {
												var u = e[c.track][c.event];
												u.cents || (u.cents = 0), (u.cents += t);
											}
										}
									}
								})(s, parseInt(i.detuneOctave, 10)),
							W() || s.push(p),
							T.length > 0 && s.push(T),
							{ tempo: o, instrument: l, tracks: s, totalDuration: f }
						);
					};
					var K = ['break', '(break)', 'no chord', 'n.c.', 'tacet'];
					function Q(e, t, r) {
						return (r - e) / t;
					}
					function $(e) {
						var t = !1,
							n = (function (e) {
								if (H) return 'break';
								if (g || !e.chord || 0 === e.chord.length) return null;
								for (var t = 0; t < e.chord.length; t++) {
									var r = e.chord[t];
									if ('default' === r.position) return r.name;
									if (K.indexOf(r.name.toLowerCase()) >= 0) return 'break';
								}
								return null;
							})(e);
						if (n) {
							var i = (function (e) {
								if (0 !== e.length) {
									if ('break' === e) return { chick: [] };
									var t = e.substring(0, 1);
									if ('(' === t) {
										if (0 === (e = e.substring(1, e.length - 2)).length) return;
										t = e.substring(0, 1);
									}
									var n = ae[t];
									if (n) {
										for (var i = r; i < -8; ) i += 12;
										for (; i > 8; ) i -= 12;
										var a,
											s = (n += i) - 5;
										1 === e.length && (a = oe(n, ''));
										var o = e.substring(1),
											c = o.substring(0, 1);
										'b' === c || '♭' === c
											? (n--, s--, (o = o.substring(1)))
											: ('#' !== c && '♯' !== c) || (n++, s++, (o = o.substring(1)));
										var l = o.split('/');
										if (
											((a = oe(n, l[0])).length >= 3 && (s = s + (a[2] - a[0]) - 7),
											2 === l.length && ae[l[1].substring(0, 1)])
										) {
											var h = { '#': 1, '♯': 1, b: -1, '♭': -1 }[l[1].substring(1)] || 0;
											s = n = ae[l[1].substring(0, 1)] + h + i;
										}
										return { boom: n, boom2: s, chick: a };
									}
								}
							})(n);
							if (i) {
								0 === p.length && ((t = !0), p.push({ cmd: 'program', channel: v, instrument: A })), (y = i);
								var a = Q(w, U(M), R(e.time));
								b.push({ chord: y, beat: a, start: R(e.time) });
							}
						}
						return t;
					}
					function J(e, t) {
						var r = t.start,
							n = t.duration,
							i = X(1 / 32);
						switch (e) {
							case 'trill':
								for (var a = 1; n > 0; )
									u.push({
										cmd: 'note',
										pitch: t.pitch + a,
										volume: t.volume,
										start: r,
										duration: i,
										gap: 0,
										instrument: h,
										style: 'decoration'
									}),
										(a = 1 === a ? 0 : 1),
										(n -= i),
										(r += i);
								break;
							case 'mordent':
								u.push({
									cmd: 'note',
									pitch: t.pitch,
									volume: t.volume,
									start: r,
									duration: i,
									gap: 0,
									instrument: h,
									style: 'decoration'
								}),
									(n -= i),
									(r += i),
									u.push({
										cmd: 'note',
										pitch: t.pitch + 1,
										volume: t.volume,
										start: r,
										duration: i,
										gap: 0,
										instrument: h,
										style: 'decoration'
									}),
									(n -= i),
									(r += i),
									u.push({
										cmd: 'note',
										pitch: t.pitch,
										volume: t.volume,
										start: r,
										duration: n,
										gap: 0,
										instrument: h
									});
								break;
							case 'lowermordent':
								u.push({
									cmd: 'note',
									pitch: t.pitch,
									volume: t.volume,
									start: r,
									duration: i,
									gap: 0,
									instrument: h,
									style: 'decoration'
								}),
									(n -= i),
									(r += i),
									u.push({
										cmd: 'note',
										pitch: t.pitch - 1,
										volume: t.volume,
										start: r,
										duration: i,
										gap: 0,
										instrument: h,
										style: 'decoration'
									}),
									(n -= i),
									(r += i),
									u.push({
										cmd: 'note',
										pitch: t.pitch,
										volume: t.volume,
										start: r,
										duration: n,
										gap: 0,
										instrument: h
									});
								break;
							case 'turn':
								(i = t.duration / 5),
									u.push({
										cmd: 'note',
										pitch: t.pitch,
										volume: t.volume,
										start: r,
										duration: i,
										gap: 0,
										instrument: h,
										style: 'decoration'
									}),
									u.push({
										cmd: 'note',
										pitch: t.pitch + 1,
										volume: t.volume,
										start: r + i,
										duration: i,
										gap: 0,
										instrument: h,
										style: 'decoration'
									}),
									u.push({
										cmd: 'note',
										pitch: t.pitch,
										volume: t.volume,
										start: r + 2 * i,
										duration: i,
										gap: 0,
										instrument: h,
										style: 'decoration'
									}),
									u.push({
										cmd: 'note',
										pitch: t.pitch + 1,
										volume: t.volume,
										start: r + 3 * i,
										duration: i,
										gap: 0,
										instrument: h,
										style: 'decoration'
									}),
									u.push({
										cmd: 'note',
										pitch: t.pitch,
										volume: t.volume,
										start: r + 4 * i,
										duration: i,
										gap: 0,
										instrument: h
									});
								break;
							case 'roll':
								for (; n > 0; )
									u.push({
										cmd: 'note',
										pitch: t.pitch,
										volume: t.volume,
										start: r,
										duration: i,
										gap: 0,
										instrument: h,
										style: 'decoration'
									}),
										(n -= 2 * i),
										(r += 2 * i);
						}
					}
					function Z(e, t) {
						u.length;
						var r,
							n = (function (e, t) {
								if (t) return 0;
								var r;
								if (k) (r = k), (k = void 0);
								else if (z)
									if (Y > e) r = I;
									else {
										M.num, M.den;
										var n = Q(w, U(M), e);
										r = 0 === n ? D : parseInt(n, 10) === n ? F : I;
									}
								else r = F;
								return C && ((r += C), (C = void 0)), r < 0 && (r = 0), r > 127 && (r = 127), t ? 0 : r;
							})(R(e.time), t),
							s = $(e);
						if (
							(e.gracenotes &&
								e.pitches &&
								e.pitches.length > 0 &&
								e.pitches[0] &&
								((r = (function (e, t) {
									for (var r, n = 0, i = [], s = 0; s < e.length; s++) n += (r = e[s]).duration;
									var o = t / 2 / n;
									for (s = 0; s < e.length; s++) {
										var c = te((r = e[s]));
										if (h === B && S) {
											var l = a(r);
											l && S[l] && (c = S[l].sound);
										}
										var u = { pitch: c, duration: r.duration * o };
										(u = ne(u)), i.push(u);
									}
									return i;
								})(e.gracenotes, e.pitches[0].duration)),
								e.elem &&
									(e.elem.midiGraceNotePitches = (function (e, t, r, n) {
										var i = [];
										r = Math.round(r);
										for (var a = 0; a < e.length; a++) {
											var s = e[a];
											u.push({
												cmd: 'note',
												pitch: s.pitch,
												volume: r,
												start: t,
												duration: s.duration,
												gap: 0,
												instrument: n,
												style: 'grace'
											}),
												i.push({ pitch: s.pitch, durationInMeasures: s.duration, volume: r, instrument: n }),
												(t += s.duration);
										}
										return i;
									})(r, R(e.time), (2 * n) / 3, h))),
							e.elem)
						) {
							var c = R(e.time),
								l = (c / j / o) * 60 * 1e3;
							if (void 0 === e.elem.currentTrackMilliseconds)
								(e.elem.currentTrackMilliseconds = l), (e.elem.currentTrackWholeNotes = c);
							else if (void 0 === e.elem.currentTrackMilliseconds.length)
								e.elem.currentTrackMilliseconds !== l &&
									((e.elem.currentTrackMilliseconds = [e.elem.currentTrackMilliseconds, l]),
									(e.elem.currentTrackWholeNotes = [e.elem.currentTrackWholeNotes, c]));
							else {
								for (var d = !1, p = 0; p < e.elem.currentTrackMilliseconds.length; p++)
									e.elem.currentTrackMilliseconds[p] === l && (d = !0);
								d || (e.elem.currentTrackMilliseconds.push(l), e.elem.currentTrackWholeNotes.push(c));
							}
						}
						if (e.pitches) {
							var m = '',
								g = (function (e, t) {
									var r = {};
									if (e.decoration)
										for (var n = 0; n < e.decoration.length; n++)
											'staccato' === e.decoration[n]
												? (r.thisBreakBetweenNotes = 'staccato')
												: 'tenuto' === e.decoration[n]
												? (r.thisBreakBetweenNotes = 'tenuto')
												: 'accent' === e.decoration[n]
												? (r.velocity = Math.min(127, 1.5 * t))
												: 'trill' === e.decoration[n]
												? (r.noteModification = 'trill')
												: 'lowermordent' === e.decoration[n]
												? (r.noteModification = 'lowermordent')
												: 'uppermordent' === e.decoration[n] || 'mordent' === e.decoration[n]
												? (r.noteModification = 'mordent')
												: 'turn' === e.decoration[n]
												? (r.noteModification = 'turn')
												: 'roll' === e.decoration[n] && (r.noteModification = 'roll');
									return r;
								})(e, n);
							g.thisBreakBetweenNotes && (m = g.thisBreakBetweenNotes), g.velocity && (n = g.velocity);
							var v = e.pitches;
							if ('rhythm' === e.style && ((O = !0), y && y.chick)) {
								v = [];
								for (var b = 0; b < y.chick.length; b++) {
									var x = i.clone(e.pitches[0]);
									(x.actualPitch = y.chick[b]), v.push(x);
								}
							}
							e.elem && (e.elem.midiPitches = []);
							for (var T = 0; T < v.length; T++) {
								var _ = v[T];
								if (_) {
									_.startSlur && (V += _.startSlur.length), _.endSlur && (V -= _.endSlur.length);
									var E = _.actualPitch ? _.actualPitch : te(_);
									if (h === B && S) {
										var N = a(_);
										N && S[N] && (E = S[N].sound);
									}
									var A = {
										cmd: 'note',
										pitch: E,
										volume: n,
										start: R(e.time),
										duration: X(_.duration),
										instrument: h,
										startChar: e.elem.startChar,
										endChar: e.elem.endChar
									};
									if (
										((A = ne(A)),
										e.gracenotes && ((A.duration = A.duration / 2), (A.start = A.start + A.duration)),
										e.elem && e.elem.midiPitches.push(A),
										g.noteModification)
									)
										J(g.noteModification, A);
									else {
										switch ((V > 0 ? (A.endType = 'tenuto') : m && (A.endType = m), A.endType)) {
											case 'tenuto':
												A.gap = -0.001;
												break;
											case 'staccato':
												var P = 0.4 * A.duration;
												A.gap = (o / 60) * P;
												break;
											default:
												A.gap = 0;
										}
										u.push(A);
									}
								}
							}
							u.length;
						}
						var L = (function (e) {
							return e.pitches && e.pitches.length > 0 && e.pitches[0]
								? e.pitches[0].duration
								: e.elem
								? e.elem.duration
								: e.duration;
						})(e);
						return (f = Math.max(f, R(e.time) + X(L))), s;
					}
					var ee = [0, 2, 4, 5, 7, 9, 11];
					function te(n) {
						if (void 0 !== n.midipitch) return n.midipitch;
						var i = n.pitch;
						if (n.accidental)
							switch (n.accidental) {
								case 'sharp':
									e[i] = 1;
									break;
								case 'flat':
									e[i] = -1;
									break;
								case 'natural':
									e[i] = 0;
									break;
								case 'dblsharp':
									e[i] = 2;
									break;
								case 'dblflat':
									e[i] = -2;
									break;
								case 'quartersharp':
									e[i] = 0.25;
									break;
								case 'quarterflat':
									e[i] = -0.25;
							}
						var a =
							12 *
								(function (e) {
									return Math.floor(e / 7);
								})(i) +
							ee[ie(i)] +
							60;
						return void 0 !== e[i] ? (a += e[i]) : (a += t[ie(i)]), (a += r);
					}
					function re(e) {
						var t = [0, 0, 0, 0, 0, 0, 0];
						if (!e.accidentals) return t;
						for (var r = 0; r < e.accidentals.length; r++) {
							var n,
								i = e.accidentals[r];
							switch (i.acc) {
								case 'flat':
									n = -1;
									break;
								case 'quarterflat':
									n = -0.25;
									break;
								case 'sharp':
									n = 1;
									break;
								case 'quartersharp':
									n = 0.25;
									break;
								default:
									n = 0;
							}
							t[ie(i.note.toLowerCase().charCodeAt(0) - 'c'.charCodeAt(0))] += n;
						}
						return t;
					}
					function ne(e) {
						var t = '' + e.pitch;
						return (
							t.indexOf('.75') >= 0
								? ((e.pitch = Math.round(e.pitch)), (e.cents = -50))
								: t.indexOf('.25') >= 0 && ((e.pitch = Math.round(e.pitch)), (e.cents = 50)),
							e
						);
					}
					function ie(e) {
						return (e %= 7) < 0 && (e += 7), e;
					}
					var ae = { A: 33, B: 35, C: 36, D: 38, E: 40, F: 41, G: 43 },
						se = {
							dim: [0, 3, 6],
							'°': [0, 3, 6],
							'˚': [0, 3, 6],
							dim7: [0, 3, 6, 9],
							'°7': [0, 3, 6, 9],
							'˚7': [0, 3, 6, 9],
							ø7: [0, 3, 6, 10],
							'm7(b5)': [0, 3, 6, 10],
							m7b5: [0, 3, 6, 10],
							'm7♭5': [0, 3, 6, 10],
							'-7(b5)': [0, 3, 6, 10],
							'-7b5': [0, 3, 6, 10],
							'7b5': [0, 4, 6, 10],
							'7(b5)': [0, 4, 6, 10],
							'7♭5': [0, 4, 6, 10],
							'7(b9,b5)': [0, 4, 6, 10, 13],
							'7b9,b5': [0, 4, 6, 10, 13],
							'7(#9,b5)': [0, 4, 6, 10, 15],
							'7#9b5': [0, 4, 6, 10, 15],
							'maj7(b5)': [0, 4, 6, 11],
							maj7b5: [0, 4, 6, 11],
							'13(b5)': [0, 4, 6, 10, 14, 21],
							'13b5': [0, 4, 6, 10, 14, 21],
							m: [0, 3, 7],
							'-': [0, 3, 7],
							m6: [0, 3, 7, 9],
							'-6': [0, 3, 7, 9],
							m7: [0, 3, 7, 10],
							'-7': [0, 3, 7, 10],
							'-(b6)': [0, 3, 7, 8],
							'-b6': [0, 3, 7, 8],
							'-6/9': [0, 3, 7, 9, 14],
							'-7(b9)': [0, 3, 7, 10, 13],
							'-7b9': [0, 3, 7, 10, 13],
							'-maj7': [0, 3, 7, 11],
							'-9+7': [0, 3, 7, 11, 13],
							'-11': [0, 3, 7, 11, 14, 17],
							m11: [0, 3, 7, 11, 14, 17],
							'-maj9': [0, 3, 7, 11, 14],
							'-∆9': [0, 3, 7, 11, 14],
							mM9: [0, 3, 7, 11, 14],
							M: [0, 4, 7],
							6: [0, 4, 7, 9],
							'6/9': [0, 4, 7, 9, 14],
							'6add9': [0, 4, 7, 9, 14],
							69: [0, 4, 7, 9, 14],
							7: [0, 4, 7, 10],
							9: [0, 4, 7, 10, 14],
							11: [0, 7, 10, 14, 17],
							13: [0, 4, 7, 10, 14, 21],
							'7b9': [0, 4, 7, 10, 13],
							'7♭9': [0, 4, 7, 10, 13],
							'7(b9)': [0, 4, 7, 10, 13],
							'7(#9)': [0, 4, 7, 10, 15],
							'7#9': [0, 4, 7, 10, 15],
							'(13)': [0, 4, 7, 10, 14, 21],
							'7(9,13)': [0, 4, 7, 10, 14, 21],
							'7(#9,b13)': [0, 4, 7, 10, 15, 20],
							'7(#11)': [0, 4, 7, 10, 14, 18],
							'7#11': [0, 4, 7, 10, 14, 18],
							'7(b13)': [0, 4, 7, 10, 20],
							'7b13': [0, 4, 7, 10, 20],
							'9(#11)': [0, 4, 7, 10, 14, 18],
							'9#11': [0, 4, 7, 10, 14, 18],
							'13(#11)': [0, 4, 7, 10, 18, 21],
							'13#11': [0, 4, 7, 10, 18, 21],
							maj7: [0, 4, 7, 11],
							'∆7': [0, 4, 7, 11],
							Δ7: [0, 4, 7, 11],
							maj9: [0, 4, 7, 11, 14],
							'maj7(9)': [0, 4, 7, 11, 14],
							'maj7(11)': [0, 4, 7, 11, 17],
							'maj7(#11)': [0, 4, 7, 11, 18],
							'maj7(13)': [0, 4, 7, 14, 21],
							'maj7(9,13)': [0, 4, 7, 11, 14, 21],
							'7sus4': [0, 5, 7, 10],
							m7sus4: [0, 3, 7, 10, 17],
							sus4: [0, 5, 7],
							sus2: [0, 2, 7],
							'7sus2': [0, 2, 7, 10],
							'9sus4': [0, 5, 7, 10, 14],
							'13sus4': [0, 5, 7, 10, 14, 21],
							aug7: [0, 4, 8, 10],
							'+7': [0, 4, 8, 10],
							'+': [0, 4, 8],
							'7#5': [0, 4, 8, 10],
							'7♯5': [0, 4, 8, 10],
							'7+5': [0, 4, 8, 10],
							'9#5': [0, 4, 8, 10, 14],
							'9♯5': [0, 4, 8, 10, 14],
							'9+5': [0, 4, 8, 10, 14],
							'-7(#5)': [0, 3, 8, 10],
							'-7#5': [0, 3, 8, 10],
							'7(#5)': [0, 4, 8, 10],
							'7(b9,#5)': [0, 4, 8, 10, 13],
							'7b9#5': [0, 4, 8, 10, 13],
							'maj7(#5)': [0, 4, 8, 11],
							'maj7#5': [0, 4, 8, 11],
							'maj7(#5,#11)': [0, 4, 8, 11, 18],
							'maj7#5#11': [0, 4, 8, 11, 18],
							'9(#5)': [0, 4, 8, 10, 14],
							'13(#5)': [0, 4, 8, 10, 14, 21],
							'13#5': [0, 4, 8, 10, 14, 21]
						};
					function oe(e, t) {
						var r = se[t];
						r ||
							(r =
								'ma' === t.slice(0, 2).toLowerCase() || 'M' === t[0]
									? se.M
									: 'm' === t[0] || '-' === t[0]
									? se.m
									: se.M),
							(e += 12);
						for (var n = [], i = 0; i < r.length; i++) n.push(e + r[i]);
						return n;
					}
					function ce(e, t, r, n, i) {
						void 0 !== e &&
							p.push({ cmd: 'note', pitch: e, volume: r, start: w + n * X(t), duration: X(i), gap: 0, instrument: N });
					}
					function le(e, t, r, n, i) {
						for (var a = 0; a < e.length; a++)
							p.push({
								cmd: 'note',
								pitch: e[a],
								volume: r,
								start: w + n * X(t),
								duration: X(i),
								gap: 0,
								instrument: A
							});
					}
					var he = {
						'2/2': ['boom', 'chick'],
						'2/4': ['boom', 'chick'],
						'3/4': ['boom', 'chick', 'chick'],
						'4/4': ['boom', 'chick', 'boom2', 'chick'],
						'5/4': ['boom', 'chick', 'chick', 'boom2', 'chick'],
						'6/8': ['boom', '', 'chick', 'boom2', '', 'chick'],
						'9/8': ['boom', '', 'chick', 'boom2', '', 'chick', 'boom2', '', 'chick'],
						'12/8': ['boom', '', 'chick', 'boom2', '', 'chick', 'boom', '', 'chick', 'boom2', '', 'chick']
					};
					function ue(e, t) {
						var r = M.num,
							n = M.den,
							i = 1 / n,
							a = i / 2,
							s = he[r + '/' + n],
							o = parseInt(r, 10) / parseInt(n, 10) - (t - e) / E;
						if ((Math.abs(o) < 1e-5 && (o = !1), !s || o)) {
							s = [];
							for (var c = (t - e) / E / i, l = 0; l < c; l++) s.push('chick');
						}
						if (
							(0 === b.length && b.push({ beat: 0, chord: y }),
							0 !== b[0].beat && y && x && b.unshift({ beat: 0, chord: x }),
							1 !== b.length)
						) {
							for (var h = 0.125 === i ? 3 : 1, u = {}, d = 0; d < b.length; d++) {
								var f = b[d];
								u['' + Math.round(f.beat * h)] = f;
							}
							for (var p = 0; p < s.length; p++) {
								var m, g;
								if ((u['' + p] && (m = u['' + p]), !O && m))
									switch (s[p]) {
										case 'boom':
											u['' + (p + 1)]
												? le(m.chord.chick, i, L, p, a)
												: (ce(m.chord.boom, i, P, p, a), (g = m.chord.boom));
											break;
										case 'boom2':
											u['' + (p + 1)]
												? le(m.chord.chick, i, L, p, a)
												: g === m.chord.boom
												? (ce(m.chord.boom2, i, P, p, a), (g = void 0))
												: (ce(m.chord.boom, i, P, p, a), (g = m.chord.boom));
											break;
										case 'chick':
											le(m.chord.chick, i, L, p, a);
											break;
										case '':
											u['' + p] && le(m.chord.chick, i, L, p, a);
									}
							}
						} else
							for (var v = b[0].beat; v < s.length; v++)
								if (!O)
									switch (s[v]) {
										case 'boom':
											ce(b[0].chord.boom, i, P, v, a);
											break;
										case 'boom2':
											ce(b[0].chord.boom2, i, P, v, a);
											break;
										case 'chick':
											le(b[0].chord.chick, i, L, v, a);
									}
					}
					function de(e) {
						if (0 === e.pattern.length || !1 === e.on) return { on: !1 };
						for (var t = e.pattern[0], r = [], n = '', i = 0, a = 0; a < t.length; a++)
							if (('d' === t[a] && i++, 'd' === t[a] || 'z' === t[a]))
								0 !== n.length ? (r.push(n), (n = t[a])) : (n += t[a]);
							else {
								if (0 === n.length) return { on: !1 };
								n += t[a];
							}
						if ((0 !== n.length && r.push(n), e.pattern.length !== 2 * i + 1)) return { on: !1 };
						for (var s = { on: !0, bars: e.bars, pattern: [] }, o = U(M), c = 0, l = 0; l < r.length; l++) {
							n = r[l];
							for (var h = 1, u = !1, d = 0, f = 1; f < n.length; f++)
								switch (n[f]) {
									case '/':
										0 !== d && (h *= d), (d = 0), (u = !0);
										break;
									case '1':
									case '2':
									case '3':
									case '4':
									case '5':
									case '6':
									case '7':
									case '8':
									case '9':
										d = 10 * d + n[f];
										break;
									default:
										return { on: !1 };
								}
							u ? (0 === d && (d = 2), (h /= d)) : d && (h *= d),
								'd' === n[0]
									? (s.pattern.push({ len: h * o, pitch: e.pattern[1 + c], velocity: e.pattern[1 + c + i] }), c++)
									: s.pattern.push({ len: h * o, pitch: null });
						}
						return (_ = e.bars ? e.bars : 1), s;
					}
					function fe() {
						if (G && G.pattern) {
							for (var e = G, t = 0, r = M.num / M.den, n = 0; n < e.pattern.length; n++) t += e.pattern[n].len;
							var i = t / _ / r;
							for (n = 0; n < e.pattern.length; n++) e.pattern[n].len = e.pattern[n].len / i;
							G = e;
						}
					}
					function pe(e) {
						if (0 !== T.length || G.on) {
							var t = M.num / M.den;
							if (0 === T.length) {
								if (f < t) return;
								T.push({ cmd: 'program', channel: e, instrument: B });
							}
							if (G.on)
								for (var r = w, n = 0; n < G.pattern.length; n++) {
									var i = X(G.pattern[n].len);
									G.pattern[n].pitch &&
										T.push({
											cmd: 'note',
											pitch: G.pattern[n].pitch,
											volume: G.pattern[n].velocity,
											start: r,
											duration: i,
											gap: 0,
											instrument: B
										}),
										(r += i);
								}
						}
					}
				})(),
					(e.exports = n);
			},
			9991: function (e, t, r) {
				var n,
					i = r(2710);
				!(function () {
					'use strict';
					function e(e, t) {
						for (var r in t) t.hasOwnProperty(r) && e.setAttribute(r, t[r]);
						return e;
					}
					function t() {
						(this.trackstrings = ''),
							(this.trackcount = 0),
							(this.noteOnAndChannel = '%90'),
							(this.noteOffAndChannel = '%80');
					}
					function r(e, t) {
						for (var r = '', n = 0; n < e.length; n++) r += a(e.charCodeAt(n), 2);
						return '%00%FF' + t + a(r.length / 3, 2) + r;
					}
					function a(e, t) {
						var r = e.toString(16);
						for (r = r.split('.')[0]; r.length < t; ) r = '0' + r;
						return (
							r.length > t && (r = r.substring(0, t)),
							(function (e) {
								for (var t = '', r = 0; r < e.length; r += 2) (t += '%'), (t += e.substr(r, 2));
								return t;
							})(r)
						);
					}
					function s(e) {
						var t = (e = Math.round(e)) % 128;
						return a(2 * (e - t) + t, 4);
					}
					function o(e) {
						var t = 0,
							r = [];
						for (e = Math.round(e); 0 !== e; ) r.push(127 & e), (e >>= 7);
						for (var n = r.length - 1; n >= 0; n--) {
							t <<= 8;
							var i = r[n];
							0 !== n && (i |= 128), (t |= i);
						}
						var s = t.toString(16).length;
						return a(t, (s += s % 2));
					}
					(t.prototype.setTempo = function (e) {
						0 === this.trackcount &&
							(this.startTrack(), (this.track += '%00%FF%51%03' + a(Math.round(6e7 / e), 6)), this.endTrack());
					}),
						(t.prototype.setGlobalInfo = function (e, t, n, i) {
							if (0 === this.trackcount) {
								this.startTrack();
								var s = Math.round(6e7 / e);
								(this.track += '%00%FF%51%03' + a(s, 6)),
									n &&
										(this.track += (function (e) {
											if (!e || !e.accidentals) return '';
											for (var t = '%00%FF%59%02', r = 0, n = 256, i = 0; i < e.accidentals.length; i++)
												'sharp' === e.accidentals[i].acc ? r++ : 'flat' === e.accidentals[i].acc && n--;
											var s = a(256 !== n ? n : r, 2),
												o = 'm' === e.mode ? '%01' : '%00';
											return t + s + o;
										})(n)),
									i &&
										(this.track += (function (e) {
											var t,
												r = '%00%FF%58%04' + a(e.num, 2),
												n = { 1: 0, 2: 1, 4: 2, 8: 3, 16: 4, 32: 5 }[e.den];
											if (!n) return '';
											switch (((r += a(n, 2)), e.num + '/' + e.den)) {
												case '2/4':
												case '3/4':
												case '4/4':
												case '5/4':
													t = 24;
													break;
												case '6/4':
													t = 72;
													break;
												case '2/2':
												case '3/2':
												case '4/2':
													t = 48;
													break;
												case '3/8':
												case '6/8':
												case '9/8':
												case '12/8':
													t = 36;
											}
											return t ? (r += a(t, 2)) + '%08' : '';
										})(i)),
									t && (this.track += r(t, '%01')),
									this.endTrack();
							}
						}),
						(t.prototype.startTrack = function () {
							(this.noteWarped = {}),
								(this.track = ''),
								(this.trackName = ''),
								(this.trackInstrument = ''),
								(this.silencelength = 0),
								this.trackcount++,
								this.instrument && this.setInstrument(this.instrument);
						}),
						(t.prototype.endTrack = function () {
							this.track = this.trackName + this.trackInstrument + this.track;
							var e = a(this.track.length / 3 + 4, 8);
							(this.track = 'MTrk' + e + this.track + '%00%FF%2F%00'), (this.trackstrings += this.track);
						}),
						(t.prototype.setText = function (e, t) {
							'name' === e && (this.trackName = r(t, '%03'));
						}),
						(t.prototype.setInstrument = function (e) {
							(this.trackInstrument = '%00%C0' + a(e, 2)), (this.instrument = e);
						}),
						(t.prototype.setChannel = function (e, t) {
							this.channel = e;
							var r = '%00%B' + this.channel.toString(16);
							(this.track += r + '%79%00'),
								(this.track += r + '%40%00'),
								(this.track += r + '%5B%30'),
								t || (t = 0),
								(t = Math.round(64 * (t + 1))),
								(this.track += r + '%0A' + a(t, 2)),
								(this.track += r + '%07%64'),
								(this.noteOnAndChannel = '%9' + this.channel.toString(16)),
								(this.noteOffAndChannel = '%8' + this.channel.toString(16));
						}),
						(t.prototype.startNote = function (e, t, r) {
							if (((this.track += o(this.silencelength)), (this.silencelength = 0), r)) {
								this.track += '%e' + this.channel.toString(16);
								var n = Math.round(4096 * i(r));
								(this.track += s(8192 + n)), (this.track += o(0)), (this.noteWarped[e] = !0);
							}
							(this.track += this.noteOnAndChannel), (this.track += '%' + e.toString(16) + a(t, 2));
						}),
						(t.prototype.endNote = function (e) {
							(this.track += o(this.silencelength)),
								(this.silencelength = 0),
								this.noteWarped[e] &&
									((this.track += '%e' + this.channel.toString(16)),
									(this.track += s(8192)),
									(this.track += o(0)),
									(this.noteWarped[e] = !1)),
								(this.track += this.noteOffAndChannel),
								(this.track += '%' + e.toString(16) + '%00');
						}),
						(t.prototype.addRest = function (e) {
							(this.silencelength += e), this.silencelength < 0 && (this.silencelength = 0);
						}),
						(t.prototype.getData = function () {
							return 'data:audio/midi,MThd%00%00%00%06%00%01' + a(this.trackcount, 4) + '%01%e0' + this.trackstrings;
						}),
						(t.prototype.embed = function (t, r) {
							var n = this.getData(),
								i = e(document.createElement('a'), { href: n });
							if (((i.innerHTML = 'download midi'), t.insertBefore(i, t.firstChild), !r)) {
								var a = e(document.createElement('embed'), {
									src: n,
									type: 'video/quicktime',
									controller: 'true',
									autoplay: 'false',
									loop: 'false',
									enablejavascript: 'true',
									style: 'display:block; height: 20px;'
								});
								t.insertBefore(a, t.firstChild);
							}
						}),
						(n = function () {
							return new t();
						});
				})(),
					(e.exports = n);
			},
			1028: function (e, t, r) {
				var n,
					i = r(5008);
				!(function () {
					'use strict';
					var e = 1,
						t = 128;
					function r(e, t, r) {
						for (var n = 0, i = t + 1; i < e.length; i++)
							if (('note' === e[i].el_type && n++, e[i].decoration && e[i].decoration.indexOf(r) >= 0)) return n;
						return n;
					}
					function a(e, t, r) {
						for (var n = Math.min(e.length, t + 3), i = t; i < n; i++)
							if ('note' === e[i].el_type && e[i].decoration)
								for (var a = 0; a < e[i].decoration.length; a++)
									if (r.indexOf(e[i].decoration[a]) >= 0) return e[i].decoration[a];
						return null;
					}
					function s(e) {
						for (var t = 0; t < e.length; t++)
							for (var r = e[t], n = r.length - 1; n >= 0 && 'bar' !== r[n].el_type; ) (r[n].noChordVoice = !0), n--;
					}
					function o(e, t) {
						if (e && !(e.length <= t) && e[t].title) return e[t].title.join(' ');
					}
					function c(e, t) {
						var r = 1 / 4;
						e.duration && (r = e.duration[0]);
						var n = 60;
						return e.bpm && (n = e.bpm), (r * n) / t;
					}
					function l(t) {
						var r;
						switch (t.type) {
							case 'common_time':
								r = { el_type: 'meter', num: 4, den: 4 };
								break;
							case 'cut_time':
								r = { el_type: 'meter', num: 2, den: 2 };
								break;
							case 'specified':
								r = { el_type: 'meter', num: t.value[0].num, den: t.value[0].den };
								break;
							default:
								r = { el_type: 'meter' };
						}
						return (e = r.num / r.den), r;
					}
					function h(e) {
						for (var t = [], r = 0; r < e.length; r++) 'natural' !== e[r].acc && t.push(e[r]);
						return t;
					}
					function u(e, t) {
						f(
							e,
							'HP' === t.root
								? {
										el_type: 'key',
										accidentals: [
											{ acc: 'natural', note: 'g' },
											{ acc: 'sharp', note: 'f' },
											{ acc: 'sharp', note: 'c' }
										]
								  }
								: { el_type: 'key', accidentals: h(t.accidentals) }
						);
					}
					function d(e, t) {
						f(e, l(t));
					}
					function f(e, t) {
						for (var r = e.length - 1; r >= 0; r--)
							if (e[r].el_type === t.el_type) return void (JSON.stringify(e[r]) !== JSON.stringify(t) && e.push(t));
						e.push(t);
					}
					n = function (n, h) {
						var p,
							m = (h = h || {}).program || 0,
							g = h.midiTranspose || 0;
						n.visualTranspose && (g -= n.visualTranspose);
						var v = h.channel || 0,
							b = !1,
							y = h.drum || '',
							x = h.drumBars || 1,
							w = h.drumIntro || 0,
							k = '' !== y,
							C = [];
						(m = parseInt(m, 10)),
							(g = parseInt(g, 10)),
							10 === (v = parseInt(v, 10)) && (m = t),
							(y = y.split(' ')),
							(x = parseInt(x, 10)),
							(w = parseInt(w, 10));
						var T = n.formatting.bagpipes;
						T && (m = 71);
						var _ = [];
						if (n.formatting.midi) {
							var S = n.formatting.midi;
							S.program &&
								S.program.length > 0 &&
								((m = S.program[0]), S.program.length > 1 && ((m = S.program[1]), (v = S.program[0])), (b = !0)),
								S.transpose && (g = S.transpose[0]),
								S.channel && ((v = S.channel[0]), (b = !0)),
								S.drum && (y = S.drum),
								S.drumbars && (x = S.drumbars[0]),
								S.drumon && (k = !0),
								10 === v && (m = t),
								S.beat && _.push({ el_type: 'beat', beats: S.beat }),
								S.nobeataccents && _.push({ el_type: 'beataccents', value: !1 });
						}
						p = h.qpm
							? parseInt(h.qpm, 10)
							: n.metaText.tempo
							? c(n.metaText.tempo, n.getBeatLength())
							: h.defaultQpm
							? h.defaultQpm
							: 180;
						var E = [];
						T && E.push({ el_type: 'bagpipes' }),
							E.push({ el_type: 'instrument', program: m }),
							v && E.push({ el_type: 'channel', channel: v }),
							g && E.push({ el_type: 'transpose', transpose: g }),
							E.push({ el_type: 'tempo', qpm: p });
						for (var M = 0; M < _.length; M++) E.push(_[M]);
						var N,
							A = [],
							B = [],
							P = [],
							L = [0],
							H = {};
						H[0] = { el_type: 'tempo', qpm: p, timing: 0 };
						for (var O = [], z = [], D = !1, F = n.lines, I = 0; I < F.length; I++) {
							var j = F[I];
							if (j.staff)
								for (
									var V = function (e) {
											var t,
												n = {
													pppp: [15, 10, 5, 1],
													ppp: [30, 20, 10, 1],
													pp: [45, 35, 20, 1],
													p: [60, 50, 35, 1],
													mp: [75, 65, 50, 1],
													mf: [90, 80, 65, 1],
													f: [105, 95, 80, 1],
													ff: [120, 110, 95, 1],
													fff: [127, 125, 110, 1],
													ffff: [127, 125, 110, 1]
												};
											if (e.decoration)
												if (
													(e.decoration.indexOf('pppp') >= 0
														? (t = 'pppp')
														: e.decoration.indexOf('ppp') >= 0
														? (t = 'ppp')
														: e.decoration.indexOf('pp') >= 0
														? (t = 'pp')
														: e.decoration.indexOf('p') >= 0
														? (t = 'p')
														: e.decoration.indexOf('mp') >= 0
														? (t = 'mp')
														: e.decoration.indexOf('mf') >= 0
														? (t = 'mf')
														: e.decoration.indexOf('f') >= 0
														? (t = 'f')
														: e.decoration.indexOf('ff') >= 0
														? (t = 'ff')
														: e.decoration.indexOf('fff') >= 0
														? (t = 'fff')
														: e.decoration.indexOf('ffff') >= 0 && (t = 'ffff'),
													t &&
														((N = n[t].slice(0)),
														A[Y].push({ el_type: 'beat', beats: N.slice(0) }),
														(B[R] = !1),
														(P[R] = !1)),
													e.decoration.indexOf('crescendo(') >= 0)
												) {
													var i = r(X, ee, 'crescendo)'),
														s = Math.min(127, N[0] + 50),
														o = a(X, ee + i + 1, Object.keys(n));
													o && (s = n[o][0]), (B[R] = i > 0 && Math.floor((s - N[0]) / i)), (P[R] = !1);
												} else if (e.decoration.indexOf('crescendo)') >= 0) B[R] = !1;
												else if (e.decoration.indexOf('diminuendo(') >= 0) {
													var c = r(X, ee, 'diminuendo)'),
														l = Math.max(15, N[0] - 50),
														h = a(X, ee + c + 1, Object.keys(n));
													h && (l = n[h][0]), (B[R] = !1), (P[R] = c > 0 && Math.floor((l - N[0]) / c));
												} else e.decoration.indexOf('diminuendo)') >= 0 && (P[R] = !1);
										},
										G = j.staff,
										Y = 0,
										q = 0;
									q < G.length;
									q++
								) {
									var W = G[q];
									if (!W.clef || 'TAB' !== W.clef.type)
										for (var R = 0; R < W.voices.length; R++) {
											var X = W.voices[R];
											if (!A[Y]) {
												A[Y] = [].concat(JSON.parse(JSON.stringify(E)));
												var U = o(j.staff, Y);
												U && A[Y].unshift({ el_type: 'name', trackName: U });
											}
											if (
												(g && 'perc' === W.clef.type && A[Y].push({ el_type: 'transpose', transpose: 0 }),
												W.clef && 'perc' === W.clef.type && !b)
											)
												for (var K = 0; K < A[Y].length; K++) 'instrument' === A[Y][K].el_type && (A[Y][K].program = t);
											else W.key && u(A[Y], W.key);
											W.meter && d(A[Y], W.meter),
												!D &&
													k &&
													(A[Y].push({ el_type: 'drum', params: { pattern: y, bars: x, on: k, intro: w } }), (D = !0)),
												W.clef &&
													'perc' !== W.clef.type &&
													W.clef.transpose &&
													((W.clef.el_type = 'clef'), A[Y].push({ el_type: 'transpose', transpose: W.clef.transpose })),
												W.clef &&
													W.clef.type &&
													(W.clef.type.indexOf('-8') >= 0
														? A[Y].push({ el_type: 'transpose', transpose: -12 })
														: W.clef.type.indexOf('+8') >= 0 && A[Y].push({ el_type: 'transpose', transpose: 12 })),
												n.formatting.midi &&
													n.formatting.midi.drumoff &&
													(A[Y].push({ el_type: 'bar' }),
													A[Y].push({ el_type: 'drum', params: { pattern: '', on: !1 } }));
											var Q = 0,
												$ = 0,
												J = 0,
												Z = 0;
											N = [105, 95, 85, 1];
											for (var ee = 0; ee < X.length; ee++) {
												var te = X[ee];
												switch (te.el_type) {
													case 'note':
														if (
															(B[R] &&
																((N[0] += B[R]),
																(N[1] += B[R]),
																(N[2] += B[R]),
																A[Y].push({ el_type: 'beat', beats: N.slice(0) })),
															P[R] &&
																((N[0] += P[R]),
																(N[1] += P[R]),
																(N[2] += P[R]),
																A[Y].push({ el_type: 'beat', beats: N.slice(0) })),
															V(te),
															!te.rest || 'spacer' !== te.rest.type)
														) {
															var re = { elem: te, el_type: 'note', timing: L[Y] };
															if (
																(te.style ? (re.style = te.style) : C[Y] && (re.style = C[Y]),
																(re.duration = 0 === te.duration ? 0.25 : te.duration),
																te.startTriplet)
															) {
																if (
																	(($ = te.tripletMultiplier),
																	(J = te.startTriplet * $ * te.duration),
																	te.startTriplet !== te.tripletR && ee + te.tripletR <= X.length)
																) {
																	for (var ne = 0, ie = ee; ie < ee + te.tripletR; ie++) ne += X[ie].duration;
																	J = $ * ne;
																}
																(re.duration = re.duration * $),
																	(re.duration = Math.round(1e6 * re.duration) / 1e6),
																	(Z = re.duration);
															} else
																$ &&
																	(te.endTriplet
																		? (($ = 0), (re.duration = Math.round(1e6 * (J - Z)) / 1e6))
																		: ((re.duration = re.duration * $),
																		  (re.duration = Math.round(1e6 * re.duration) / 1e6),
																		  (Z += re.duration)));
															te.rest && (re.rest = te.rest),
																te.decoration && (re.decoration = te.decoration.slice(0)),
																te.pitches && (re.pitches = i.cloneArray(te.pitches)),
																te.gracenotes && (re.gracenotes = i.cloneArray(te.gracenotes)),
																te.chord && (re.chord = i.cloneArray(te.chord)),
																A[Y].push(re),
																'rhythm' === te.style && s(A),
																Q++,
																(L[Y] += re.duration);
														}
														break;
													case 'key':
													case 'keySignature':
														u(A[Y], te);
														break;
													case 'meter':
														d(A[Y], te);
														break;
													case 'clef':
														te.transpose && A[Y].push({ el_type: 'transpose', transpose: te.transpose }),
															te.type &&
																(te.type.indexOf('-8') >= 0
																	? A[Y].push({ el_type: 'transpose', transpose: -12 })
																	: te.type.indexOf('+8') >= 0 && A[Y].push({ el_type: 'transpose', transpose: 12 }));
														break;
													case 'tempo':
														(p = c(te, n.getBeatLength())),
															A[Y].push({ el_type: 'tempo', qpm: p, timing: L[Y] }),
															(H['' + L[Y]] = { el_type: 'tempo', qpm: p, timing: L[Y] });
														break;
													case 'bar':
														Q > 0 && A[Y].push({ el_type: 'bar' }), V(te), (Q = 0);
														var ae = 'bar_right_repeat' === te.type || 'bar_dbl_repeat' === te.type,
															se = '1' === te.startEnding,
															oe =
																'bar_left_repeat' === te.type ||
																'bar_dbl_repeat' === te.type ||
																'bar_right_repeat' === te.type;
														if (ae) {
															var ce = O[Y];
															ce || (ce = 0);
															var le = z[Y];
															le || (le = A[Y].length);
															for (var he = ce; he < le; he++) {
																var ue = i.clone(A[Y][he]);
																ue.pitches && (ue.pitches = i.cloneArray(ue.pitches)), A[Y].push(ue);
															}
															(z[Y] = void 0), (O[Y] = void 0);
														}
														se && (z[Y] = A[Y].length), oe && (O[Y] = A[Y].length);
														break;
													case 'style':
														C[Y] = te.head;
														break;
													case 'timeSignature':
														A[Y].push(l(te));
														break;
													case 'part':
													case 'stem':
													case 'scale':
													case 'break':
													case 'font':
														break;
													case 'midi':
														var de = !1;
														switch (te.cmd) {
															case 'drumon':
																(k = !0), (de = !0);
																break;
															case 'drumoff':
																(k = !1), (de = !0);
																break;
															case 'drum':
																(y = te.params), (de = !0);
																break;
															case 'drumbars':
																(x = te.params[0]), (de = !0);
																break;
															case 'drummap':
																break;
															case 'channel':
																10 === te.params[0] && A[Y].push({ el_type: 'instrument', program: t });
																break;
															case 'program':
																f(A[Y], { el_type: 'instrument', program: te.params[0] }), (b = !0);
																break;
															case 'transpose':
																A[Y].push({ el_type: 'transpose', transpose: te.params[0] });
																break;
															case 'gchordoff':
																A[Y].push({ el_type: 'gchord', tacet: !0 });
																break;
															case 'gchordon':
																A[Y].push({ el_type: 'gchord', tacet: !1 });
																break;
															case 'beat':
																A[Y].push({ el_type: 'beat', beats: te.params });
																break;
															case 'nobeataccents':
																A[Y].push({ el_type: 'beataccents', value: !1 });
																break;
															case 'beataccents':
																A[Y].push({ el_type: 'beataccents', value: !0 });
																break;
															case 'vol':
																A[Y].push({ el_type: 'vol', volume: te.params[0] });
																break;
															case 'volinc':
																A[Y].push({ el_type: 'volinc', volume: te.params[0] });
																break;
															default:
																console.log('MIDI seq: midi cmd not handled: ', te.cmd, te);
														}
														de &&
															(A[0].push({ el_type: 'drum', params: { pattern: y, bars: x, intro: w, on: k } }),
															(D = !0));
														break;
													default:
														console.log('MIDI: element type ' + te.el_type + ' not handled.');
												}
											}
											L[++Y] || (L[Y] = 0);
										}
								}
						}
						if (
							((function (e, t) {
								if (t && 0 !== t.length)
									for (var r = Object.keys(t), n = 0; n < e.length; n++)
										for (var i = e[n], a = t[0] ? t[0].qpm : 0, s = 0; s < i.length; s++) {
											var o = i[s];
											'tempo' === o.el_type && (a = o.qpm),
												r.indexOf('' + o.timing) >= 0 &&
													a !== t['' + o.timing].qpm &&
													((a = t['' + o.timing].qpm),
													'tempo' === o.el_type
														? ((o.qpm = t['' + o.timing].qpm), s++)
														: (e[n].splice(s, 0, { el_type: 'tempo', qpm: t['' + o.timing].qpm, timing: o.timing }),
														  (s += 2)));
										}
							})(A, H),
							w)
						)
							for (var fe = n.getPickupLength(), pe = 0; pe < A.length; pe++) {
								for (var me = 0; 'note' !== A[pe][me].el_type && A[pe].length > me; ) me++;
								if (A[pe].length > me)
									for (ie = 0; ie < w; ie++)
										0 === fe || ie < w - 1
											? A[pe].splice(
													me,
													0,
													{ el_type: 'note', rest: { type: 'rest' }, duration: e },
													{ el_type: 'bar' }
											  )
											: A[pe].splice(me, 0, { el_type: 'note', rest: { type: 'rest' }, duration: e - fe });
							}
						return A.length > 0 && A[0].length > 0 && (A[0][0].pickupLength = n.getPickupLength()), A;
					};
				})(),
					(e.exports = n);
			},
			8702: function (e, t, r) {
				var n = r(5281);
				e.exports = function () {
					return window.abcjsAudioContext || n(), window.abcjsAudioContext;
				};
			},
			2710: function (e) {
				e.exports = function (e) {
					return Math.pow(2, e / 1200);
				};
			},
			9143: function (e, t, r) {
				var n = r(8471);
				e.exports = function (e) {
					for (var t = [], r = 0; r < e.tracks.length; r++) t.push([]);
					var i = n[0];
					return (
						e.tracks.forEach(function (e, r) {
							e.forEach(function (e) {
								switch (e.cmd) {
									case 'note':
										if (e.duration > 0) {
											var a = e.gap ? e.gap : 0,
												s = e.duration;
											a = Math.min(a, (2 * s) / 3);
											var o = {
												pitch: e.pitch,
												instrument: i,
												start: Math.round(1e6 * e.start) / 1e6,
												end: Math.round(1e6 * (e.start + s - a)) / 1e6,
												volume: e.volume
											};
											e.startChar && (o.startChar = e.startChar),
												e.endChar && (o.endChar = e.endChar),
												e.style && (o.style = e.style),
												e.cents && (o.cents = e.cents),
												t[r].push(o);
										}
										break;
									case 'program':
										i = n[e.instrument];
										break;
									case 'text':
										break;
									default:
										console.log('Unhandled midi event', e);
								}
							});
						}),
						t
					);
				};
			},
			6313: function (e, t, r) {
				var n = r(5049),
					i = r(5281),
					a = r(8702),
					s = r(5008),
					o = r(1225),
					c = r(9733),
					l = r(5075),
					h = r(5343),
					u = r(6987);
				function d(e, t, r, s, o) {
					var c = !0;
					if ((a() ? (c = 'suspended' === a().state) : i(), !n()))
						throw { status: 'NotSupported', message: 'This browser does not support audio.' };
					(c || o) && r && r.classList.add('abcjs-loading'),
						c
							? a()
									.resume()
									.then(function () {
										s
											? s().then(function (n) {
													f(e, t, r, o);
											  })
											: f(e, t, r, o);
									})
							: f(e, t, r, o);
				}
				function f(e, t, r, n) {
					n
						? e(t).then(function () {
								r && r.classList.remove('abcjs-loading');
						  })
						: (e(t), r && r.classList.remove('abcjs-loading'));
				}
				e.exports = function (e, t) {
					var r = this;
					if ('string' == typeof e) {
						var n = e;
						if (!(e = document.querySelector(n))) throw new Error('Cannot find element "' + n + '" in the DOM.');
					} else if (!(e instanceof HTMLElement))
						throw new Error('The first parameter must be a valid element or selector in the DOM.');
					if (
						((r.parent = e),
						(r.options = {}),
						t && (r.options = s.clone(t)),
						r.options.ac && i(r.options.ac),
						(function (e, t) {
							var r = !!t.loopHandler,
								n = !!t.restartHandler,
								i = !!t.playHandler || !!t.playPromiseHandler,
								a = !!t.progressHandler,
								s = !!t.warpHandler,
								d = !1 !== t.hasClock,
								f = '<div class="abcjs-inline-audio">\n';
							if (r) {
								var p = t.repeatTitle ? t.repeatTitle : 'Click to toggle play once/repeat.';
								f +=
									'<button type="button" class="abcjs-midi-loop abcjs-btn" title="' +
									p +
									'" aria-label="' +
									(t.repeatAria ? t.repeatAria : p) +
									'">' +
									o +
									'</button>\n';
							}
							if (n) {
								var m = t.restartTitle ? t.restartTitle : 'Click to go to beginning.';
								f +=
									'<button type="button" class="abcjs-midi-reset abcjs-btn" title="' +
									m +
									'" aria-label="' +
									(t.restartAria ? t.restartAria : m) +
									'">' +
									u +
									'</button>\n';
							}
							if (i) {
								var g = t.playTitle ? t.playTitle : 'Click to play/pause.';
								f +=
									'<button type="button" class="abcjs-midi-start abcjs-btn" title="' +
									g +
									'" aria-label="' +
									(t.playAria ? t.playAria : g) +
									'">' +
									c +
									l +
									h +
									'</button>\n';
							}
							if (a) {
								var v = t.randomTitle ? t.randomTitle : 'Click to change the playback position.';
								f +=
									'<button type="button" class="abcjs-midi-progress-background" title="' +
									v +
									'" aria-label="' +
									(t.randomAria ? t.randomAria : v) +
									'"><span class="abcjs-midi-progress-indicator"></span></button>\n';
							}
							if ((d && (f += '<span class="abcjs-midi-clock"></span>\n'), s)) {
								var b = t.warpTitle ? t.warpTitle : 'Change the playback speed.';
								f +=
									'<span class="abcjs-tempo-wrapper"><label><input class="abcjs-midi-tempo" type="number" min="1" max="300" value="100" title="' +
									b +
									'" aria-label="' +
									(t.warpAria ? t.warpAria : b) +
									'">%</label><span>&nbsp;(<span class="abcjs-midi-current-tempo"></span> ' +
									(t.bpm ? t.bpm : 'BPM') +
									')</span></span>\n';
							}
							(f +=
								'<div class="abcjs-css-warning" style="font-size: 12px;color:red;border: 1px solid red;text-align: center;width: 300px;margin-top: 4px;font-weight: bold;border-radius: 4px;">CSS required: load abcjs-audio.css</div>'),
								(f += '</div>\n'),
								(e.innerHTML = f);
						})(r.parent, r.options),
						(function (e) {
							var t = !!e.options.loopHandler,
								r = !!e.options.restartHandler,
								n = !!e.options.playHandler || !!e.options.playPromiseHandler,
								i = !!e.options.progressHandler,
								a = !!e.options.warpHandler,
								s = e.parent.querySelector('.abcjs-midi-start');
							t &&
								e.parent.querySelector('.abcjs-midi-loop').addEventListener('click', function (t) {
									d(e.options.loopHandler, t, s, e.options.afterResume);
								}),
								r &&
									e.parent.querySelector('.abcjs-midi-reset').addEventListener('click', function (t) {
										d(e.options.restartHandler, t, s, e.options.afterResume);
									}),
								n &&
									s.addEventListener('click', function (t) {
										d(
											e.options.playPromiseHandler || e.options.playHandler,
											t,
											s,
											e.options.afterResume,
											!!e.options.playPromiseHandler
										);
									}),
								i &&
									e.parent.querySelector('.abcjs-midi-progress-background').addEventListener('click', function (t) {
										d(e.options.progressHandler, t, s, e.options.afterResume);
									}),
								a &&
									e.parent.querySelector('.abcjs-midi-tempo').addEventListener('change', function (t) {
										d(e.options.warpHandler, t, s, e.options.afterResume);
									});
						})(r),
						(r.disable = function (e) {
							var t = r.parent.querySelector('.abcjs-inline-audio');
							e ? t.classList.add('abcjs-disabled') : t.classList.remove('abcjs-disabled');
						}),
						(r.setWarp = function (e, t) {
							(r.parent.querySelector('.abcjs-midi-tempo').value = Math.round(t)), r.setTempo(e);
						}),
						(r.setTempo = function (e) {
							var t = r.parent.querySelector('.abcjs-midi-current-tempo');
							t && (t.innerHTML = Math.round(e));
						}),
						(r.resetAll = function () {
							for (var e = r.parent.querySelectorAll('.abcjs-pushed'), t = 0; t < e.length; t++)
								e[t].classList.remove('abcjs-pushed');
						}),
						(r.pushPlay = function (e) {
							var t = r.parent.querySelector('.abcjs-midi-start');
							t && (e ? t.classList.add('abcjs-pushed') : t.classList.remove('abcjs-pushed'));
						}),
						(r.pushLoop = function (e) {
							var t = r.parent.querySelector('.abcjs-midi-loop');
							t && (e ? t.classList.add('abcjs-pushed') : t.classList.remove('abcjs-pushed'));
						}),
						(r.setProgress = function (e, t) {
							var n = r.parent.querySelector('.abcjs-midi-progress-background'),
								i = r.parent.querySelector('.abcjs-midi-progress-indicator');
							if (n && i) {
								var a = n.clientWidth * e;
								i.style.left = a + 'px';
								var s = r.parent.querySelector('.abcjs-midi-clock');
								if (s) {
									var o = (t * e) / 1e3,
										c = Math.floor(o / 60),
										l = Math.floor(o % 60),
										h = l < 10 ? '0' + l : l;
									s.innerHTML = c + ':' + h;
								}
							}
						}),
						r.options.afterResume)
					) {
						var f = !1;
						r.options.ac ? (f = 'suspended' !== r.options.ac.state) : a() && (f = 'suspended' !== a().state),
							f && r.options.afterResume();
					}
				};
			},
			5594: function (e, t, r) {
				var n = r(2228),
					i = r(9143),
					a = r(5281),
					s = r(8702),
					o = r(5049),
					c = r(522),
					l = r(8471),
					h = r(873),
					u = r(4586),
					d = r(4771),
					f = 'MIDI is not supported in this browser.',
					p = 'https://paulrosen.github.io/midi-js-soundfonts/abcjs/',
					m = 'https://paulrosen.github.io/midi-js-soundfonts/FluidR3_GM/';
				e.exports = function () {
					var e = this;
					(e.audioBufferPossible = void 0),
						(e.directSource = []),
						(e.startTimeSec = void 0),
						(e.pausedTimeSec = void 0),
						(e.audioBuffers = []),
						(e.duration = void 0),
						(e.isRunning = !1),
						(e.init = function (t) {
							t || (t = {}), a(t.audioContext);
							var r = s().currentTime;
							if (
								((e.debugCallback = t.debugCallback),
								e.debugCallback && e.debugCallback('init called'),
								(e.audioBufferPossible = e._deviceCapable()),
								!e.audioBufferPossible)
							)
								return Promise.reject({ status: 'NotSupported', message: f });
							var n = t.options ? t.options : {};
							(e.soundFontUrl = n.soundFontUrl ? n.soundFontUrl : m),
								'/' !== e.soundFontUrl[e.soundFontUrl.length - 1] && (e.soundFontUrl += '/'),
								n.soundFontVolumeMultiplier || 0 === n.soundFontVolumeMultiplier
									? (e.soundFontVolumeMultiplier = n.soundFontVolumeMultiplier)
									: e.soundFontUrl === m ||
									  'https://paulrosen.github.io/midi-js-soundfonts/MusyngKite/' === e.soundFontUrl
									? (e.soundFontVolumeMultiplier = 3)
									: e.soundFontUrl === p
									? (e.soundFontVolumeMultiplier = 0.4)
									: (e.soundFontVolumeMultiplier = 1),
								n.programOffsets
									? (e.programOffsets = n.programOffsets)
									: e.soundFontUrl === p
									? (e.programOffsets = {
											bright_acoustic_piano: 20,
											honkytonk_piano: 20,
											electric_piano_1: 30,
											electric_piano_2: 30,
											harpsichord: 40,
											clavinet: 20,
											celesta: 20,
											glockenspiel: 40,
											vibraphone: 30,
											marimba: 35,
											xylophone: 30,
											tubular_bells: 35,
											dulcimer: 30,
											drawbar_organ: 20,
											percussive_organ: 25,
											rock_organ: 20,
											church_organ: 40,
											reed_organ: 40,
											accordion: 40,
											harmonica: 40,
											acoustic_guitar_nylon: 20,
											acoustic_guitar_steel: 30,
											electric_guitar_jazz: 25,
											electric_guitar_clean: 15,
											electric_guitar_muted: 35,
											overdriven_guitar: 25,
											distortion_guitar: 20,
											guitar_harmonics: 30,
											electric_bass_finger: 15,
											electric_bass_pick: 30,
											fretless_bass: 40,
											violin: 105,
											viola: 50,
											cello: 40,
											contrabass: 60,
											trumpet: 10,
											trombone: 90,
											alto_sax: 20,
											tenor_sax: 20,
											clarinet: 20,
											flute: 50,
											banjo: 50,
											woodblock: 20
									  })
									: (e.programOffsets = {});
							var i = void 0 !== n.fadeLength ? parseInt(n.fadeLength, 10) : NaN;
							if (
								((e.fadeLength = isNaN(i) ? 200 : i),
								(i = void 0 !== n.noteEnd ? parseInt(n.noteEnd, 10) : NaN),
								(e.noteEnd = isNaN(i) ? 0 : i),
								(e.pan = n.pan),
								(e.meterSize = 1),
								t.visualObj)
							)
								(e.flattened = t.visualObj.setUpAudio(n)),
									t.visualObj.getMeterFraction().den &&
										(e.meterSize = t.visualObj.getMeterFraction().num / t.visualObj.getMeterFraction().den);
							else {
								if (!t.sequence) return Promise.reject(new Error('Must pass in either a visualObj or a sequence'));
								e.flattened = t.sequence;
							}
							(e.millisecondsPerMeasure = t.millisecondsPerMeasure
								? t.millisecondsPerMeasure
								: t.visualObj
								? t.visualObj.millisecondsPerMeasure(e.flattened.tempo)
								: 1e3),
								(e.beatsPerMeasure = t.visualObj ? t.visualObj.getBeatsPerMeasure() : 4),
								(e.sequenceCallback = n.sequenceCallback),
								(e.callbackContext = n.callbackContext),
								(e.onEnded = n.onEnded);
							var o = {},
								h = [],
								u = [],
								g = l[0];
							e.flattened.tracks.forEach(function (e) {
								e.forEach(function (e) {
									if (('program' === e.cmd && l[e.instrument] && (g = l[e.instrument]), void 0 !== e.pitch)) {
										var t = e.pitch,
											r = c[t];
										if (r)
											if ((o[g] || (o[g] = {}), d[g] && d[g][r])) {
												var n = g + ':' + r;
												h.indexOf(n) < 0 && h.push(n);
											} else o[g][r] = !0;
										else {
											var i = g + ':' + r;
											console.log("Can't find note: ", t, i), u.indexOf(i) < 0 && u.push(i);
										}
									}
								});
							}),
								e.debugCallback &&
									e.debugCallback('note gathering time = ' + Math.floor(1e3 * (s().currentTime - r)) + 'ms'),
								(r = s().currentTime);
							var v = [];
							Object.keys(o).forEach(function (e) {
								Object.keys(o[e]).forEach(function (t) {
									v.push({ instrument: e, note: t });
								});
							}),
								e.debugCallback && e.debugCallback('notes ' + JSON.stringify(v));
							for (var b = [], y = 0; y < v.length; y += 256) b.push(v.slice(y, y + 256));
							return new Promise(function (t, n) {
								var i = { cached: h, error: u, loaded: [] },
									a = 0;
								!(function o() {
									e.debugCallback && e.debugCallback('loadBatch idx=' + a + ' len=' + b.length),
										a < b.length
											? e._loadBatch(b[a], e.soundFontUrl, r).then(function (t) {
													e.debugCallback && e.debugCallback('loadBatch then'),
														(r = s().currentTime),
														t &&
															(t.error && (i.error = i.error.concat(t.error)),
															t.loaded && (i.loaded = i.loaded.concat(t.loaded))),
														a++,
														o();
											  }, n)
											: (e.debugCallback && e.debugCallback('resolve init'), t(i));
								})();
							});
						}),
						(e._loadBatch = function (t, r, i, a) {
							var o = [];
							return (
								t.forEach(function (t) {
									e.debugCallback && e.debugCallback('getNote ' + t.instrument + ':' + t.note),
										o.push(n(r, t.instrument, t.note, s()));
								}),
								Promise.all(o)
									.then(function (n) {
										e.debugCallback &&
											e.debugCallback('mp3 load time = ' + Math.floor(1e3 * (s().currentTime - i)) + 'ms');
										for (var o = [], c = [], l = [], h = [], u = 0; u < n.length; u++) {
											var d = n[u],
												f = d.instrument + ':' + d.name;
											'loaded' === d.status
												? o.push(f)
												: 'pending' === d.status
												? l.push(f)
												: 'cached' === d.status
												? c.push(f)
												: h.push(f + ' ' + d.message);
										}
										if (l.length > 0) {
											if (
												(e.debugCallback && e.debugCallback('pending ' + JSON.stringify(l)),
												a ? (a *= 2) : (a = 50),
												a < 9e4)
											)
												return new Promise(function (t, n) {
													setTimeout(function () {
														var s = [];
														for (u = 0; u < l.length; u++)
															(f = l[u].split(':')), s.push({ instrument: f[0], note: f[1] });
														e.debugCallback && e.debugCallback('retry ' + JSON.stringify(s)),
															e
																._loadBatch(s, r, i, a)
																.then(function (e) {
																	t(e);
																})
																.catch(function (e) {
																	n(e);
																});
													}, a);
												});
											for (var p = [], m = 0; m < t.length; m++) p.push(t[m].instrument + '/' + t[m].note);
											return (
												e.debugCallback && e.debugCallback('loadBatch timeout'),
												Promise.reject(new Error('timeout attempting to load: ' + p.join(', ')))
											);
										}
										return (
											e.debugCallback && e.debugCallback('loadBatch resolve'),
											Promise.resolve({ loaded: o, cached: c, error: h })
										);
									})
									.catch(function (t) {
										e.debugCallback && e.debugCallback('loadBatch catch ' + t.message);
									})
							);
						}),
						(e.prime = function () {
							var t = e.fadeLength / 1e3;
							return (
								(e.isRunning = !1),
								e.audioBufferPossible
									? (e.debugCallback && e.debugCallback('prime called'),
									  new Promise(function (r) {
											var n = s().currentTime,
												a = e.millisecondsPerMeasure / 1e3 / e.meterSize;
											if (((e.duration = e.flattened.totalDuration * a), e.duration <= 0))
												return (e.audioBuffers = []), r({ status: 'empty', seconds: 0 });
											e.duration += t;
											var o = Math.floor(s().sampleRate * e.duration);
											e.stop();
											var c = i(e.flattened);
											e.sequenceCallback && e.sequenceCallback(c, e.callbackContext);
											var l = (function (e, t) {
													if (null == t) return null;
													var r = [];
													if (t.length) {
														for (var n = 0; n < e; n++)
															if (n < t.length) {
																var i = parseFloat(t[n]);
																i < -1 ? (i = -1) : i > 1 && (i = 1), r.push(i);
															} else r.push(0);
														return r;
													}
													var a = parseFloat(t);
													if (a * (e - 1) > 2) return null;
													for (var s = e % 2 == 0, o = s ? 0 - a / 2 : 0, c = o + a, l = 0; l < e; l++)
														(s = l % 2 == 0) ? (r.push(o), (o -= a)) : (r.push(c), (c += a));
													return r;
												})(c.length, e.pan),
												h = {};
											c.forEach(function (t, r) {
												var n = l && l.length > r ? l[r] : 0;
												t.forEach(function (t) {
													var r =
														t.instrument +
														':' +
														t.pitch +
														':' +
														t.volume +
														':' +
														Math.round(1e3 * (t.end - t.start)) / 1e3 +
														':' +
														n +
														':' +
														a +
														':' +
														(t.cents ? t.cents : 0);
													e.debugCallback && e.debugCallback('noteMapTrack ' + r),
														h[r] || (h[r] = []),
														h[r].push(t.start);
												});
											});
											for (
												var d = [], f = s().createBuffer(2, o, s().sampleRate), p = 0;
												p < Object.keys(h).length;
												p++
											) {
												var m = Object.keys(h)[p],
													g = m.split(':'),
													v = void 0 !== g[6] ? parseFloat(g[6]) : 0;
												(g = {
													instrument: g[0],
													pitch: parseInt(g[1], 10),
													volume: parseInt(g[2], 10),
													len: parseFloat(g[3]),
													pan: parseFloat(g[4]),
													tempoMultiplier: parseFloat(g[5]),
													cents: v
												}),
													d.push(
														u(
															f,
															s().sampleRate,
															g,
															h[m],
															e.soundFontVolumeMultiplier,
															e.programOffsets[g.instrument],
															t,
															e.noteEnd / 1e3,
															e.debugCallback
														)
													);
											}
											function b(e) {
												var t = e && e.audioBuffers && e.audioBuffers.length > 0 ? e.audioBuffers[0].duration : 0;
												return { status: s().state, duration: t };
											}
											(e.audioBuffers = [f]),
												e.debugCallback &&
													(e.debugCallback('sampleRate = ' + s().sampleRate),
													e.debugCallback('totalSamples = ' + o),
													e.debugCallback('creationTime = ' + Math.floor(1e3 * (s().currentTime - n)) + 'ms')),
												Promise.all(d).then(function () {
													'suspended' === s().state
														? s()
																.resume()
																.then(function () {
																	r(b(e));
																})
														: 'interrupted' === s().state
														? s()
																.suspend()
																.then(function () {
																	s()
																		.resume()
																		.then(function () {
																			r(b(e));
																		});
																})
														: r(b(e));
												});
									  }))
									: Promise.reject(new Error(f))
							);
						}),
						(e.start = function () {
							if (!e.audioBufferPossible) throw new Error(f);
							e.debugCallback && e.debugCallback('start called');
							var t = e.pausedTimeSec ? e.pausedTimeSec : 0;
							e._kickOffSound(t),
								(e.startTimeSec = s().currentTime - t),
								(e.pausedTimeSec = void 0),
								e.debugCallback && e.debugCallback('MIDI STARTED', e.startTimeSec);
						}),
						(e.pause = function () {
							if (!e.audioBufferPossible) throw new Error(f);
							return e.debugCallback && e.debugCallback('pause called'), (e.pausedTimeSec = e.stop()), e.pausedTimeSec;
						}),
						(e.resume = function () {
							e.start();
						}),
						(e.seek = function (t, r) {
							var n;
							switch (r) {
								case 'seconds':
									n = t;
									break;
								case 'beats':
									n = (t * e.millisecondsPerMeasure) / e.beatsPerMeasure / 1e3;
									break;
								default:
									n = (e.duration - e.fadeLength / 1e3) * t;
							}
							if (!e.audioBufferPossible) throw new Error(f);
							e.debugCallback && e.debugCallback('seek called sec=' + n),
								e.isRunning ? (e.stop(), e._kickOffSound(n)) : (e.pausedTimeSec = n),
								(e.pausedTimeSec = n);
						}),
						(e.stop = function () {
							return (
								(e.isRunning = !1),
								(e.pausedTimeSec = void 0),
								e.directSource.forEach(function (e) {
									try {
										e.stop();
									} catch (e) {
										console.log("direct source didn't stop:", e);
									}
								}),
								(e.directSource = []),
								s().currentTime - e.startTimeSec
							);
						}),
						(e.finished = function () {
							(e.startTimeSec = void 0), (e.pausedTimeSec = void 0), (e.isRunning = !1);
						}),
						(e.download = function () {
							return h(e);
						}),
						(e.getAudioBuffer = function () {
							return e.audioBuffers[0];
						}),
						(e._deviceCapable = function () {
							return !!o() || (console.warn(f), e.debugCallback && e.debugCallback(f), !1);
						}),
						(e._kickOffSound = function (t) {
							(e.isRunning = !0),
								(e.directSource = []),
								e.audioBuffers.forEach(function (t, r) {
									(e.directSource[r] = s().createBufferSource()),
										(e.directSource[r].buffer = t),
										e.directSource[r].connect(s().destination);
								}),
								e.directSource.forEach(function (e) {
									e.start(0, t);
								}),
								e.onEnded &&
									(e.directSource[0].onended = function () {
										e.onEnded(e.callbackContext);
									});
						});
				};
			},
			873: function (e) {
				e.exports = function (e) {
					return window.URL.createObjectURL(
						(function (e) {
							var t,
								r,
								n = e[0],
								i = n.numberOfChannels,
								a = n.length * i * 2 + 44,
								s = new ArrayBuffer(a),
								o = new DataView(s),
								c = [],
								l = 0,
								h = 0;
							for (
								d(1179011410),
									d(a - 8),
									d(1163280727),
									d(544501094),
									d(16),
									u(1),
									u(i),
									d(n.sampleRate),
									d(2 * n.sampleRate * i),
									u(2 * i),
									u(16),
									d(1635017060),
									d(a - h - 4),
									t = 0;
								t < i;
								t++
							)
								c.push(n.getChannelData(t));
							for (; h < a; ) {
								for (t = 0; t < c.length; t++)
									(r = 0 | (0.5 + (r = Math.max(-1, Math.min(1, c[t][l]))) < 0 ? 32768 * r : 32767 * r)),
										o.setInt16(h, r, !0),
										(h += 2);
								l++;
							}
							return new Blob([s], { type: 'audio/wav' });
							function u(e) {
								o.setUint16(h, e, !0), (h += 2);
							}
							function d(e) {
								o.setUint32(h, e, !0), (h += 4);
							}
						})(e.audioBuffers)
					);
				};
			},
			562: function (e, t, r) {
				var n = r(1592),
					i = r(3284),
					a = function (e, t, r, n) {
						var i = ['abcjs-download-midi', 'abcjs-midi-' + n];
						t.downloadClass && i.push(t.downloadClass);
						var a = '<div class="' + i.join(' ') + '">';
						t.preTextDownload && (a += t.preTextDownload);
						var s,
							o,
							c = e.metaText && e.metaText.title ? e.metaText.title : 'Untitled';
						return (
							(s =
								t.downloadLabel && (o = t.downloadLabel) && '[object Function]' === {}.toString.call(o)
									? t.downloadLabel(e, n)
									: t.downloadLabel
									? t.downloadLabel.replace(/%T/, c)
									: 'Download MIDI for "' + c + '"'),
							(c = c.toLowerCase().replace(/'/g, '').replace(/\W/g, '_').replace(/__/g, '_')),
							(a += '<a download="' + (t.fileName ? t.fileName : c + '.midi') + '" href="' + r + '">' + s + '</a>'),
							t.postTextDownload && (a += t.postTextDownload),
							a + '</div>'
						);
					};
				e.exports = function (e, t) {
					var r = {};
					if (t) for (var s in t) t.hasOwnProperty(s) && (r[s] = t[s]);
					function o(e, t, n) {
						var s = i(t, r);
						switch (r.midiOutputType) {
							case 'encoded':
								return s;
							case 'binary':
								var o = s.replace('data:audio/midi,', '');
								o = (o = o.replace(/MThd/g, '%4d%54%68%64')).replace(/MTrk/g, '%4d%54%72%6b');
								for (var c = new ArrayBuffer(o.length / 3), l = new Uint8Array(c), h = 0; h < o.length / 3; h++) {
									var u = 3 * h + 1,
										d = parseInt(o.substring(u, u + 2), 16);
									l[h] = d;
								}
								return l;
							default:
								return a(t, r, s, n);
						}
					}
					return (r.generateInline = !1), 'string' == typeof e ? n.renderEngine(o, '*', e, r) : o(0, e, 0);
				};
			},
			5343: function (e) {
				e.exports =
					'\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="abcjs-loading-svg">\n    <circle cx="50" cy="50" fill="none" stroke-width="20" r="35" stroke-dasharray="160 55"></circle>\n</svg>\n';
			},
			1225: function (e) {
				e.exports =
					'\n<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700" preserveAspectRatio="xMidYMid meet">\n\t<g transform="translate(0,700) scale(0.1,-0.1)" >\n\t<path d="M3111 6981 c-20 -37 -90 -55 -364 -96 -120 -18 -190 -33 -244 -55\n\t-42 -17 -124 -42 -182 -56 -78 -18 -119 -34 -157 -60 -28 -19 -86 -46 -128\n\t-60 -43 -13 -107 -42 -144 -64 -37 -23 -84 -46 -106 -52 -21 -7 -56 -29 -79\n\t-50 -22 -22 -61 -50 -86 -63 -26 -13 -67 -40 -91 -60 -24 -20 -65 -47 -90 -60\n\t-25 -13 -53 -31 -61 -41 -8 -9 -32 -30 -54 -46 -75 -54 -486 -460 -512 -507\n\t-15 -25 -48 -69 -75 -98 -26 -28 -48 -57 -48 -63 0 -6 -18 -29 -39 -53 -21\n\t-23 -56 -71 -77 -107 -20 -36 -50 -80 -65 -97 -16 -18 -33 -52 -40 -75 -12\n\t-47 -47 -115 -84 -166 -13 -18 -30 -56 -38 -83 -8 -27 -34 -80 -56 -118 -33\n\t-53 -46 -91 -62 -167 -12 -63 -34 -127 -59 -179 -42 -84 -60 -166 -60 -270 0\n\t-90 26 -122 125 -154 54 -17 96 -19 430 -20 305 -1 381 2 430 14 82 22 140 51\n\t153 78 6 12 22 47 37 77 14 30 38 77 54 103 15 27 34 73 40 103 7 30 28 78 48\n\t107 19 28 44 74 55 101 10 28 34 67 53 87 18 20 49 61 68 90 19 30 44 63 57\n\t74 13 11 36 40 52 65 59 94 232 270 306 313 20 11 57 37 82 58 25 20 70 52\n\t100 72 30 19 66 47 79 61 13 14 49 35 80 46 30 12 80 37 111 56 31 19 95 45\n\t143 58 48 12 110 37 139 55 63 40 127 55 323 76 83 9 208 28 279 41 156 29\n\t165 29 330 4 453 -71 514 -84 606 -130 31 -16 83 -36 116 -45 32 -9 84 -34\n\t115 -56 31 -21 82 -48 113 -60 32 -11 72 -33 89 -48 18 -16 59 -45 92 -65 33\n\t-21 74 -51 90 -66 17 -15 49 -40 73 -54 52 -32 65 -61 50 -113 -8 -31 -61 -90\n\t-277 -308 -300 -303 -361 -382 -369 -481 -2 -29 0 -66 6 -81 13 -40 88 -138\n\t115 -151 12 -6 54 -26 92 -44 l70 -33 945 -2 c520 -1 975 2 1012 7 64 8 191\n\t50 231 76 11 7 33 34 50 60 22 34 42 51 65 58 l32 9 0 1101 0 1102 -32 9 c-21\n\t7 -44 26 -64 55 -60 84 -77 97 -140 110 -44 9 -76 10 -127 2 -59 -9 -77 -17\n\t-134 -62 -37 -28 -172 -155 -301 -281 -129 -127 -249 -237 -267 -245 -25 -10\n\t-41 -11 -71 -2 -58 15 -112 45 -124 69 -6 11 -35 35 -64 54 -28 18 -58 41 -66\n\t50 -8 9 -41 35 -75 58 -33 22 -77 56 -99 75 -21 18 -64 46 -95 61 -31 14 -73\n\t39 -93 55 -20 15 -70 40 -110 55 -40 15 -97 44 -127 64 -29 21 -78 44 -107 53\n\t-30 8 -77 31 -105 51 -42 28 -73 39 -173 60 -68 14 -154 39 -196 58 -95 43\n\t-131 51 -343 76 -209 24 -242 32 -279 70 l-30 29 -328 0 c-312 0 -330 -1 -339\n\t-19z"></path>\n\t<path d="M254 2875 c-89 -16 -107 -26 -145 -78 -32 -44 -62 -66 -91 -67 -17 0\n\t-18 -61 -18 -1140 l0 -1140 24 0 c16 0 41 -17 72 -50 40 -42 61 -55 117 -72\n\tl69 -21 82 23 c44 12 96 30 114 39 18 9 148 132 290 272 141 141 267 261 279\n\t268 51 26 86 14 176 -61 32 -26 62 -48 66 -48 5 0 36 -25 70 -55 34 -30 74\n\t-61 89 -69 15 -8 37 -28 50 -45 12 -17 50 -45 84 -62 34 -17 78 -44 98 -60 19\n\t-16 61 -37 93 -48 32 -11 81 -37 107 -56 27 -20 76 -45 109 -56 33 -12 75 -31\n\t93 -44 62 -45 93 -58 191 -82 54 -12 130 -37 168 -54 68 -29 180 -58 226 -59\n\t62 0 183 -64 183 -96 0 -12 88 -14 639 -14 l639 0 12 30 c18 44 76 66 233 89\n\t89 14 160 30 200 47 34 15 106 42 159 60 54 18 112 44 130 57 47 35 85 52 146\n\t67 29 7 76 28 105 48 29 20 77 48 107 63 30 15 66 39 80 54 14 15 50 40 81 56\n\t31 15 78 46 104 69 26 22 61 46 79 54 17 7 43 26 56 42 14 16 41 41 60 56 64\n\t48 380 362 408 405 15 23 40 51 55 63 15 12 36 38 46 58 11 21 37 57 58 82 22\n\t25 49 62 62 83 13 20 38 56 57 78 19 23 50 74 69 113 19 39 46 86 59 104 14\n\t18 34 62 46 98 12 36 32 77 45 92 31 38 60 97 80 167 9 33 26 76 37 95 29 50\n\t47 103 68 206 10 52 32 117 51 155 29 56 33 74 34 140 0 94 -10 108 -101 138\n\t-61 20 -83 21 -463 21 -226 0 -421 -4 -451 -10 -63 -12 -86 -30 -110 -85 -10\n\t-22 -33 -63 -52 -92 -21 -31 -42 -80 -53 -123 -11 -44 -32 -93 -56 -128 -20\n\t-32 -47 -83 -59 -115 -12 -32 -37 -77 -56 -100 -19 -23 -50 -65 -69 -94 -19\n\t-29 -44 -57 -54 -63 -11 -5 -29 -27 -42 -47 -52 -85 -234 -277 -300 -315 -25\n\t-15 -53 -38 -62 -51 -9 -14 -42 -39 -74 -57 -32 -18 -75 -48 -95 -66 -21 -18\n\t-59 -44 -85 -58 -26 -13 -72 -40 -100 -59 -35 -24 -78 -41 -128 -52 -47 -11\n\t-99 -31 -139 -56 -69 -42 -94 -49 -391 -110 -245 -51 -425 -66 -595 -50 -168\n\t16 -230 27 -330 61 -47 16 -123 35 -170 44 -98 17 -123 25 -172 58 -20 14 -71\n\t37 -114 53 -44 15 -95 40 -115 56 -20 16 -70 42 -110 59 -40 16 -88 45 -108\n\t63 -20 19 -55 46 -78 61 -24 14 -49 35 -55 47 -7 11 -34 33 -60 49 -50 31 -65\n\t61 -53 102 4 13 130 147 281 298 236 238 277 283 299 335 15 32 35 71 46 86\n\t12 18 19 44 19 76 0 42 -8 63 -53 138 -92 151 11 139 -1207 141 -798 2 -1030\n\t0 -1086 -11z"></path>\n\t</g>\n</svg>\n';
			},
			5075: function (e) {
				e.exports =
					'\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="abcjs-pause-svg">\n  <g>\n    <rect width="8.23" height="25"/>\n    <rect width="8.23" height="25" x="17"/>\n  </g>\n</svg>\n';
			},
			9733: function (e) {
				e.exports =
					'\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="abcjs-play-svg">\n    <g>\n    <polygon points="4 0 23 12.5 4 25"/>\n    </g>\n</svg>\n';
			},
			6987: function (e) {
				e.exports =
					'\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">\n  <g>\n    <polygon points="5 12.5 24 0 24 25"/>\n    <rect width="3" height="25" x="0" y="0"/>\n  </g>\n</svg>\n';
			},
			8471: function (e) {
				e.exports = [
					'acoustic_grand_piano',
					'bright_acoustic_piano',
					'electric_grand_piano',
					'honkytonk_piano',
					'electric_piano_1',
					'electric_piano_2',
					'harpsichord',
					'clavinet',
					'celesta',
					'glockenspiel',
					'music_box',
					'vibraphone',
					'marimba',
					'xylophone',
					'tubular_bells',
					'dulcimer',
					'drawbar_organ',
					'percussive_organ',
					'rock_organ',
					'church_organ',
					'reed_organ',
					'accordion',
					'harmonica',
					'tango_accordion',
					'acoustic_guitar_nylon',
					'acoustic_guitar_steel',
					'electric_guitar_jazz',
					'electric_guitar_clean',
					'electric_guitar_muted',
					'overdriven_guitar',
					'distortion_guitar',
					'guitar_harmonics',
					'acoustic_bass',
					'electric_bass_finger',
					'electric_bass_pick',
					'fretless_bass',
					'slap_bass_1',
					'slap_bass_2',
					'synth_bass_1',
					'synth_bass_2',
					'violin',
					'viola',
					'cello',
					'contrabass',
					'tremolo_strings',
					'pizzicato_strings',
					'orchestral_harp',
					'timpani',
					'string_ensemble_1',
					'string_ensemble_2',
					'synth_strings_1',
					'synth_strings_2',
					'choir_aahs',
					'voice_oohs',
					'synth_choir',
					'orchestra_hit',
					'trumpet',
					'trombone',
					'tuba',
					'muted_trumpet',
					'french_horn',
					'brass_section',
					'synth_brass_1',
					'synth_brass_2',
					'soprano_sax',
					'alto_sax',
					'tenor_sax',
					'baritone_sax',
					'oboe',
					'english_horn',
					'bassoon',
					'clarinet',
					'piccolo',
					'flute',
					'recorder',
					'pan_flute',
					'blown_bottle',
					'shakuhachi',
					'whistle',
					'ocarina',
					'lead_1_square',
					'lead_2_sawtooth',
					'lead_3_calliope',
					'lead_4_chiff',
					'lead_5_charang',
					'lead_6_voice',
					'lead_7_fifths',
					'lead_8_bass_lead',
					'pad_1_new_age',
					'pad_2_warm',
					'pad_3_polysynth',
					'pad_4_choir',
					'pad_5_bowed',
					'pad_6_metallic',
					'pad_7_halo',
					'pad_8_sweep',
					'fx_1_rain',
					'fx_2_soundtrack',
					'fx_3_crystal',
					'fx_4_atmosphere',
					'fx_5_brightness',
					'fx_6_goblins',
					'fx_7_echoes',
					'fx_8_scifi',
					'sitar',
					'banjo',
					'shamisen',
					'koto',
					'kalimba',
					'bagpipe',
					'fiddle',
					'shanai',
					'tinkle_bell',
					'agogo',
					'steel_drums',
					'woodblock',
					'taiko_drum',
					'melodic_tom',
					'synth_drum',
					'reverse_cymbal',
					'guitar_fret_noise',
					'breath_noise',
					'seashore',
					'bird_tweet',
					'telephone_ring',
					'helicopter',
					'applause',
					'gunshot',
					'percussion'
				];
			},
			2228: function (e, t, r) {
				var n = r(4771);
				e.exports = function (e, t, r, i) {
					n[t] || (n[t] = {});
					var a = n[t];
					return (
						a[r] ||
							(a[r] = new Promise(function (n, a) {
								var s = new XMLHttpRequest(),
									o = e + t + '-mp3/' + r + '.mp3';
								s.open('GET', o, !0),
									(s.responseType = 'arraybuffer'),
									(s.onload = function () {
										if (200 === s.status) {
											var e = i.decodeAudioData(
												s.response,
												function (e) {
													n({ instrument: t, name: r, status: 'loaded', audioBuffer: e });
												},
												function () {
													a(Error("Can't decode sound at " + o));
												}
											);
											e && 'function' == typeof e.catch && e.catch(a);
										} else a(Error("Can't load sound at " + o + ' status=' + s.status));
									}),
									(s.onerror = function () {
										a(Error("Can't load sound at " + o));
									}),
									s.send();
							}).catch(function (e) {
								throw (console.error("Didn't load note", t, r, ':', e.message), e);
							})),
						a[r]
					);
				};
			},
			2842: function (e) {
				var t = { __: -2, _: -1, '_/': -0.5, '=': 0, '': 0, '^/': 0.5, '^': 1, '^^': 2 },
					r = [
						'C',
						'-',
						'D',
						'-',
						'E',
						'F',
						'-',
						'G',
						'-',
						'A',
						'-',
						'B',
						'c',
						'-',
						'd',
						'-',
						'e',
						'f',
						'-',
						'g',
						'-',
						'a',
						'-',
						'b'
					];
				e.exports = {
					noteToMidi: function (e) {
						var n = e.match(/([_^\/]*)([ABCDEFGabcdefg])(,*)('*)/);
						if (n && 5 === n.length) {
							var i = t[n[1]];
							return 48 + r.indexOf(n[2]) + i + 12 * (n[4].length - n[3].length);
						}
						return 0;
					},
					midiToNote: function (e) {
						e = parseInt(e, 10);
						var t = Math.floor(e / 12),
							n = e % 12,
							i = r[n];
						if (('-' === i && (i = '^' + r[n - 1]), t > 4)) for (i = i.toLowerCase(), t -= 5; t > 0; ) (i += "'"), t--;
						else for (; t < 4; ) (i += ','), t++;
						return i;
					}
				};
			},
			522: function (e) {
				e.exports = {
					21: 'A0',
					22: 'Bb0',
					23: 'B0',
					24: 'C1',
					25: 'Db1',
					26: 'D1',
					27: 'Eb1',
					28: 'E1',
					29: 'F1',
					30: 'Gb1',
					31: 'G1',
					32: 'Ab1',
					33: 'A1',
					34: 'Bb1',
					35: 'B1',
					36: 'C2',
					37: 'Db2',
					38: 'D2',
					39: 'Eb2',
					40: 'E2',
					41: 'F2',
					42: 'Gb2',
					43: 'G2',
					44: 'Ab2',
					45: 'A2',
					46: 'Bb2',
					47: 'B2',
					48: 'C3',
					49: 'Db3',
					50: 'D3',
					51: 'Eb3',
					52: 'E3',
					53: 'F3',
					54: 'Gb3',
					55: 'G3',
					56: 'Ab3',
					57: 'A3',
					58: 'Bb3',
					59: 'B3',
					60: 'C4',
					61: 'Db4',
					62: 'D4',
					63: 'Eb4',
					64: 'E4',
					65: 'F4',
					66: 'Gb4',
					67: 'G4',
					68: 'Ab4',
					69: 'A4',
					70: 'Bb4',
					71: 'B4',
					72: 'C5',
					73: 'Db5',
					74: 'D5',
					75: 'Eb5',
					76: 'E5',
					77: 'F5',
					78: 'Gb5',
					79: 'G5',
					80: 'Ab5',
					81: 'A5',
					82: 'Bb5',
					83: 'B5',
					84: 'C6',
					85: 'Db6',
					86: 'D6',
					87: 'Eb6',
					88: 'E6',
					89: 'F6',
					90: 'Gb6',
					91: 'G6',
					92: 'Ab6',
					93: 'A6',
					94: 'Bb6',
					95: 'B6',
					96: 'C7',
					97: 'Db7',
					98: 'D7',
					99: 'Eb7',
					100: 'E7',
					101: 'F7',
					102: 'Gb7',
					103: 'G7',
					104: 'Ab7',
					105: 'A7',
					106: 'Bb7',
					107: 'B7',
					108: 'C8',
					109: 'Db8',
					110: 'D8',
					111: 'Eb8',
					112: 'E8',
					113: 'F8',
					114: 'Gb8',
					115: 'G8',
					116: 'Ab8',
					117: 'A8',
					118: 'Bb8',
					119: 'B8',
					120: 'C9',
					121: 'Db9'
				};
			},
			5058: function (e) {
				var t = {
					f0: '_C',
					n0: '=C',
					s0: '^C',
					x0: 'C',
					f1: '_D',
					n1: '=D',
					s1: '^D',
					x1: 'D',
					f2: '_E',
					n2: '=E',
					s2: '^E',
					x2: 'E',
					f3: '_F',
					n3: '=F',
					s3: '^F',
					x3: 'F',
					f4: '_G',
					n4: '=G',
					s4: '^G',
					x4: 'G',
					f5: '_A',
					n5: '=A',
					s5: '^A',
					x5: 'A',
					f6: '_B',
					n6: '=B',
					s6: '^B',
					x6: 'B',
					f7: '_c',
					n7: '=c',
					s7: '^c',
					x7: 'c',
					f8: '_d',
					n8: '=d',
					s8: '^d',
					x8: 'd',
					f9: '_e',
					n9: '=e',
					s9: '^e',
					x9: 'e',
					f10: '_f',
					n10: '=f',
					s10: '^f',
					x10: 'f',
					f11: '_g',
					n11: '=g',
					s11: '^g',
					x11: 'g',
					f12: '_a',
					n12: '=a',
					s12: '^a',
					x12: 'a',
					f13: '_b',
					n13: '=b',
					s13: '^b',
					x13: 'b',
					f14: "_c'",
					n14: "=c'",
					s14: "^c'",
					x14: "c'",
					f15: "_d'",
					n15: "=d'",
					s15: "^d'",
					x15: "d'",
					f16: "_e'",
					n16: "=e'",
					s16: "^e'",
					x16: "e'"
				};
				e.exports = function (e) {
					var r = (e.accidental ? e.accidental[0] : 'x') + e.verticalPos;
					return t[r];
				};
			},
			4586: function (e, t, r) {
				var n = r(4771),
					i = r(522),
					a = r(2710),
					s = function (e, t, r) {
						for (var n = 0; n < 2; n++)
							for (var i = t.getChannelData(n), a = e.getChannelData(n), s = 0; s < i.length; s++) a[s + r] += i[s];
					};
				e.exports = function (e, t, r, o, c, l, h, u, d) {
					var f = window.OfflineAudioContext || window.webkitOfflineAudioContext,
						p = r.len * r.tempoMultiplier;
					l && (p += l / 1e3), (p -= u) < 0 && (p = 0.005);
					var m = new f(2, Math.floor((p + h) * t), t),
						g = i[r.pitch],
						v = n[r.instrument][g];
					return v
						? v
								.then(function (n) {
									var i = m.createBufferSource();
									i.buffer = n.audioBuffer;
									var u,
										f = (r.volume / 96) * c;
									return (
										(i.gainNode = m.createGain()),
										r.pan &&
											m.createStereoPanner &&
											((i.panNode = m.createStereoPanner()), i.panNode.pan.setValueAtTime(r.pan, 0)),
										(i.gainNode.gain.value = f),
										i.gainNode.gain.linearRampToValueAtTime(i.gainNode.gain.value, p),
										i.gainNode.gain.linearRampToValueAtTime(0, p + h),
										r.cents && (i.playbackRate.value = a(r.cents)),
										i.panNode
											? (i.panNode.connect(m.destination), i.gainNode.connect(i.panNode))
											: i.gainNode.connect(m.destination),
										i.connect(i.gainNode),
										i.start(0),
										i.noteOff ? i.noteOff(p + h) : i.stop(p + h),
										(m.oncomplete = function (n) {
											if (n.renderedBuffer && n.renderedBuffer.getChannelData)
												for (var i = 0; i < o.length; i++) {
													var a = o[i] * r.tempoMultiplier;
													l && (a -= l / 1e3), a < 0 && (a = 0), (a = Math.floor(a * t)), s(e, n.renderedBuffer, a);
												}
											d && d('placeNote: ' + r.instrument + ':' + g), u();
										}),
										m.startRendering(),
										new Promise(function (e) {
											u = e;
										})
									);
								})
								.catch(function (e) {
									return d && d('placeNote catch: ' + e.message), Promise.resolve();
								})
						: (d && d('placeNote skipped: ' + r.instrument + ':' + g), Promise.resolve());
				};
			},
			4718: function (e, t, r) {
				var n = r(2029),
					i = r(5594),
					a = r(8702);
				function s(e, t) {
					var r = new i();
					return r
						.init({ sequence: e, millisecondsPerMeasure: t })
						.then(function () {
							return r.prime();
						})
						.then(function () {
							return r.start(), Promise.resolve();
						});
				}
				e.exports = function (e, t, r) {
					for (var i = new n(), o = 0; o < e.length; o++) {
						var c = e[o],
							l = i.addTrack();
						if ((i.setInstrument(l, c.instrument), 0 === o && t))
							for (var h = 0; h < t.length; h++) {
								var u = t[h];
								i.appendNote(l, u.pitch, 1 / 64, u.volume, u.cents);
							}
						i.appendNote(l, c.pitch, c.duration, c.volume, c.cents);
					}
					var d = a();
					return 'suspended' === d.state
						? d.resume().then(function () {
								return s(i, r);
						  })
						: s(i, r);
				};
			},
			5281: function (e) {
				e.exports = function (e) {
					if (e) window.abcjsAudioContext = e;
					else if (!window.abcjsAudioContext) {
						var t = window.AudioContext || window.webkitAudioContext;
						if (!t) return !1;
						window.abcjsAudioContext = new t();
					}
					return 'suspended' !== window.abcjsAudioContext.state;
				};
			},
			4771: function (e) {
				e.exports = {};
			},
			5049: function (e, t, r) {
				var n = r(8702);
				e.exports = function () {
					if (!window.Promise) return !1;
					if (
						!(window.AudioContext || window.webkitAudioContext || navigator.mozAudioContext || navigator.msAudioContext)
					)
						return !1;
					var e = n();
					return e ? void 0 !== e.resume : void 0;
				};
			},
			3450: function (e, t, r) {
				var n = r(6313),
					i = r(5594),
					a = r(5681),
					s = r(8702);
				e.exports = function () {
					var e = this;
					(e.warp = 100),
						(e.cursorControl = null),
						(e.visualObj = null),
						(e.timer = null),
						(e.midiBuffer = null),
						(e.options = null),
						(e.currentTempo = null),
						(e.control = null),
						(e.isLooping = !1),
						(e.isStarted = !1),
						(e.isLoaded = !1),
						(e.isLoading = !1),
						(e.load = function (t, r, i) {
							i || (i = {}),
								(e.control = new n(t, {
									loopHandler: i.displayLoop ? e.toggleLoop : void 0,
									restartHandler: i.displayRestart ? e.restart : void 0,
									playPromiseHandler: i.displayPlay ? e.play : void 0,
									progressHandler: i.displayProgress ? e.randomAccess : void 0,
									warpHandler: i.displayWarp ? e.onWarp : void 0,
									afterResume: e.init
								})),
								(e.cursorControl = r),
								e.disable(!0);
						}),
						(e.disable = function (t) {
							e.control && e.control.disable(t);
						}),
						(e.setTune = function (t, r, n) {
							return (
								(e.visualObj = t),
								e.disable(!1),
								(e.options = n),
								e.control && (e.pause(), e.setProgress(0, 1), e.control.resetAll(), e.restart(), (e.isStarted = !1)),
								(e.isLooping = !1),
								r ? e.go() : Promise.resolve({ status: 'no-audio-context' })
							);
						}),
						(e.go = function () {
							e.isLoading = !0;
							var t,
								r = (100 * e.visualObj.millisecondsPerMeasure()) / e.warp;
							return (
								(e.currentTempo = Math.round((e.visualObj.getBeatsPerMeasure() / r) * 6e4)),
								e.control && e.control.setTempo(e.currentTempo),
								(e.percent = 0),
								e.midiBuffer || (e.midiBuffer = new i()),
								s()
									.resume()
									.then(function (t) {
										return e.midiBuffer.init({ visualObj: e.visualObj, options: e.options, millisecondsPerMeasure: r });
									})
									.then(function (r) {
										return (t = r), e.midiBuffer.prime();
									})
									.then(function () {
										var r = 16;
										return (
											e.cursorControl &&
												void 0 !== e.cursorControl.beatSubdivisions &&
												parseInt(e.cursorControl.beatSubdivisions, 10) >= 1 &&
												parseInt(e.cursorControl.beatSubdivisions, 10) <= 64 &&
												(r = parseInt(e.cursorControl.beatSubdivisions, 10)),
											(e.timer = new a(e.visualObj, {
												beatCallback: e.beatCallback,
												eventCallback: e.eventCallback,
												lineEndCallback: e.lineEndCallback,
												qpm: e.currentTempo,
												extraMeasuresAtBeginning: e.cursorControl ? e.cursorControl.extraMeasuresAtBeginning : void 0,
												lineEndAnticipation: e.cursorControl ? e.cursorControl.lineEndAnticipation : 0,
												beatSubdivisions: r
											})),
											e.cursorControl &&
												e.cursorControl.onReady &&
												'function' == typeof e.cursorControl.onReady &&
												e.cursorControl.onReady(e),
											(e.isLoaded = !0),
											(e.isLoading = !1),
											Promise.resolve({ status: 'created', notesStatus: t })
										);
									})
							);
						}),
						(e.destroy = function () {
							e.timer && (e.timer.reset(), e.timer.stop(), (e.timer = null)),
								e.midiBuffer && (e.midiBuffer.stop(), (e.midiBuffer = null)),
								e.setProgress(0, 1),
								e.control && e.control.resetAll();
						}),
						(e.play = function () {
							return e.runWhenReady(e._play, void 0);
						}),
						(e.runWhenReady = function (t, r) {
							return e.visualObj
								? e.isLoading
									? ((n = 500),
									  new Promise(function (e) {
											setTimeout(e, n);
									  })).then(function () {
											return e.isLoading ? e.runWhenReady(t, r) : t(r);
									  })
									: e.isLoaded
									? t(r)
									: e.go().then(function () {
											return t(r);
									  })
								: Promise.resolve({ status: 'loading' });
							var n;
						}),
						(e._play = function () {
							return s()
								.resume()
								.then(function () {
									return (
										(e.isStarted = !e.isStarted),
										e.isStarted
											? (e.cursorControl &&
													e.cursorControl.onStart &&
													'function' == typeof e.cursorControl.onStart &&
													e.cursorControl.onStart(),
											  e.midiBuffer.start(),
											  e.timer.start(e.percent),
											  e.control && e.control.pushPlay(!0))
											: e.pause(),
										Promise.resolve({ status: 'ok' })
									);
								});
						}),
						(e.pause = function () {
							e.timer && (e.timer.pause(), e.midiBuffer.pause(), e.control && e.control.pushPlay(!1));
						}),
						(e.toggleLoop = function () {
							(e.isLooping = !e.isLooping), e.control && e.control.pushLoop(e.isLooping);
						}),
						(e.restart = function () {
							e.timer && (e.timer.setProgress(0), e.midiBuffer.seek(0));
						}),
						(e.randomAccess = function (t) {
							return e.runWhenReady(e._randomAccess, t);
						}),
						(e._randomAccess = function (t) {
							var r = t.target.classList.contains('abcjs-midi-progress-indicator') ? t.target.parentNode : t.target,
								n = (t.x - r.offsetLeft) / r.offsetWidth;
							return n < 0 && (n = 0), n > 1 && (n = 1), e.seek(n), Promise.resolve({ status: 'ok' });
						}),
						(e.seek = function (t, r) {
							e.timer && e.midiBuffer && (e.timer.setProgress(t, r), e.midiBuffer.seek(t, r));
						}),
						(e.setWarp = function (t) {
							if (parseInt(t, 10) > 0) {
								e.warp = parseInt(t, 10);
								var r = e.isStarted,
									n = e.percent;
								return (
									e.destroy(),
									(e.isStarted = !1),
									e.go().then(function () {
										return (
											e.setProgress(n, 1e3 * e.midiBuffer.duration),
											e.control && e.control.setWarp(e.currentTempo, e.warp),
											r
												? e.play().then(function () {
														return e.seek(n), Promise.resolve();
												  })
												: (e.seek(n), Promise.resolve())
										);
									})
								);
							}
							return Promise.resolve();
						}),
						(e.onWarp = function (t) {
							var r = t.target.value;
							return e.setWarp(r);
						}),
						(e.setProgress = function (t, r) {
							(e.percent = t), e.control && e.control.setProgress(t, r);
						}),
						(e.finished = function () {
							if ((e.timer.reset(), e.isLooping))
								return e.timer.start(0), e.midiBuffer.finished(), e.midiBuffer.start(), 'continue';
							e.timer.stop(),
								e.isStarted &&
									(e.control && e.control.pushPlay(!1),
									(e.isStarted = !1),
									e.midiBuffer.finished(),
									e.cursorControl &&
										e.cursorControl.onFinished &&
										'function' == typeof e.cursorControl.onFinished &&
										e.cursorControl.onFinished(),
									e.setProgress(0, 1));
						}),
						(e.beatCallback = function (t, r, n, i) {
							var a = t / r;
							e.setProgress(a, n),
								e.cursorControl &&
									e.cursorControl.onBeat &&
									'function' == typeof e.cursorControl.onBeat &&
									e.cursorControl.onBeat(t, r, n, i);
						}),
						(e.eventCallback = function (t) {
							if (!t) return e.finished();
							e.cursorControl &&
								e.cursorControl.onEvent &&
								'function' == typeof e.cursorControl.onEvent &&
								e.cursorControl.onEvent(t);
						}),
						(e.lineEndCallback = function (t, r) {
							e.cursorControl &&
								e.cursorControl.onLineEnd &&
								'function' == typeof e.cursorControl.onLineEnd &&
								e.cursorControl.onLineEnd(t, r);
						}),
						(e.getUrl = function () {
							return e.midiBuffer.download();
						}),
						(e.download = function (t) {
							var r = e.getUrl(),
								n = document.createElement('a');
							document.body.appendChild(n),
								n.setAttribute('style', 'display: none;'),
								(n.href = r),
								(n.download = t || 'output.wav'),
								n.click(),
								window.URL.revokeObjectURL(r),
								document.body.removeChild(n);
						});
				};
			},
			2029: function (e) {
				e.exports = function () {
					var e = this;
					(e.tracks = []),
						(e.totalDuration = 0),
						(e.currentInstrument = []),
						(e.starts = []),
						(e.addTrack = function () {
							return e.tracks.push([]), e.currentInstrument.push(0), e.starts.push(0), e.tracks.length - 1;
						}),
						(e.setInstrument = function (t, r) {
							e.tracks[t].push({ channel: 0, cmd: 'program', instrument: r }), (e.currentInstrument[t] = r);
						}),
						(e.appendNote = function (t, r, n, i, a) {
							var s = {
								cmd: 'note',
								duration: n,
								gap: 0,
								instrument: e.currentInstrument[t],
								pitch: r,
								start: e.starts[t],
								volume: i
							};
							a && (s.cents = a),
								e.tracks[t].push(s),
								(e.starts[t] += n),
								(e.totalDuration = Math.max(e.totalDuration, e.starts[t]));
						});
				};
			},
			1484: function (e, t, r) {
				var n = r(1921);
				function i(e) {
					(this.tuning = e._super.params.tuning),
						this.tuning || (this.tuning = ['E,', 'A,', 'D', 'G', 'B', 'e']),
						(e.tuning = this.tuning),
						(this.strings = new n(e));
				}
				(i.prototype.notesToNumber = function (e, t) {
					return this.strings.notesToNumber(e, t);
				}),
					(i.prototype.stringToPitch = function (e) {
						return this.strings.stringToPitch(e);
					}),
					(e.exports = i);
			},
			5952: function (e, t, r) {
				var n = r(8918),
					i = r(8660),
					a = r(676),
					s = r(1484);
				function o() {}
				(o.prototype.init = function (e, t, r) {
					var a = new i(e, t, r);
					(this._super = a),
						(this.abcTune = e),
						(this.linePitch = 3),
						(this.nbLines = 6),
						(this.isTabBig = !0),
						(this.capo = r.capo),
						(this.transpose = r.visualTranspose),
						(this.tablature = new n(this.nbLines, this.linePitch));
					var o = new s(this);
					this.semantics = o;
				}),
					(o.prototype.render = function (e, t, r) {
						this._super.inError || this.tablature.bypass(t) || new a(this, e, t, r).doLayout();
					}),
					(e.exports = function () {
						return { name: 'GuitarTab', tablature: o };
					});
			},
			1921: function (e, t, r) {
				var n = r(2842).noteToMidi,
					i = r(6776),
					a = r(6629);
				function s(e, t) {
					for (var r = [], n = 0; n < t.length; n++)
						if (!t[n].endTie) {
							var a = new i.TabNote(t[n].name, e.clefTranspose);
							a.checkKeyAccidentals(e.accidentals, e.measureAccidentals);
							var s = c(e, a);
							r.push(s);
						}
					return (
						(function (e, t) {
							for (var r = 0; r < t.length - 1; r++) {
								var n = t[r],
									i = t[r + 1];
								if (n.str == i.str) {
									if (n.str == e.strings.length - 1) return (n.num = '?'), void (i.num = '?');
									i.num < n.num
										? (i.str++, (i = o(e, i.note, i.str, e.secondPos, e.strings[i.str].length)))
										: (n.str++, (n = o(e, n.note, n.str, e.secondPos, e.strings[n.str].length))),
										(t[r] = n),
										(t[r + 1] = i);
								}
							}
						})(e, r),
						r
					);
				}
				function o(e, t, r, n, i) {
					var a = e.strings;
					t.checkKeyAccidentals(e.accidentals, e.measureAccidentals), n && (a = n);
					var s = t.emitNoAccidentals(),
						o = a[r].indexOf(s),
						c = t.acc;
					if (-1 != o) {
						if ((n && (o += i), (t.isFlat || -1 == t.acc) && 0 == o)) {
							var l = t.getAccidentalEquiv();
							(o = a[++r].indexOf(l.emit())), (c = 0);
						}
						return { num: o + c, str: r, note: t };
					}
					return null;
				}
				function c(e, t) {
					var r;
					(t.isAltered || t.natural) &&
						(t.isFlat
							? (r = t.isDouble ? '__' : '_')
							: t.isSharp
							? (r = t.isDouble ? '^^' : '^')
							: t.natural && (r = '='),
						(e.measureAccidentals[t.name.toUpperCase()] = r));
					for (var n = e.stringPitches.length - 1; n >= 0; n--)
						if (t.pitch + t.pitchAltered >= e.stringPitches[n]) {
							var i = t.pitch + t.pitchAltered - e.stringPitches[n];
							return (
								'^' === t.quarter ? (i -= 0.5) : 'v' === t.quarter && (i += 0.5),
								{ num: Math.round(i), str: e.stringPitches.length - 1 - n, note: t }
							);
						}
					return { num: '?', str: e.stringPitches.length - 1, note: t };
				}
				function l(e, t) {
					var r = { num: '?', str: 0, note: t };
					e.push(r), (e.error = t.emit() + ': unexpected note for instrument');
				}
				function h(e) {
					var t = e.tuning,
						r = e.capo,
						s = e._super.params.highestNote;
					(this.linePitch = e.linePitch),
						(this.highestNote = "a'"),
						s && (this.highestNote = s),
						(this.measureAccidentals = {}),
						(this.capo = 0),
						r && (this.capo = parseInt(r, 10)),
						(this.transpose = e.transpose ? e.transpose : 0),
						(this.tuning = t),
						(this.stringPitches = []);
					for (var o = 0; o < this.tuning.length; o++) {
						var c = n(this.tuning[o]) + this.capo;
						this.stringPitches.push(c);
					}
					if (
						(this.capo > 0 &&
							(this.capoTuning = (function (e) {
								var t = null,
									r = e.tuning;
								if (e.capo > 0) {
									t = [];
									for (var n = 0; n < r.length; n++) {
										for (var a = new i.TabNote(r[n]), s = 0; s < e.capo; s++) a = a.nextNote();
										t[n] = a.emit();
									}
								}
								return t;
							})(this)),
						(this.strings = (function (e) {
							var t = [],
								r = e.tuning;
							e.capo > 0 && (r = e.capoTuning);
							for (var n = r.length - 1, i = 0; i < r.length; i++) {
								var s = e.highestNote;
								i != r.length - 1 && (s = r[i + 1]);
								var o = new a(r[i], s).build();
								if (o.error) return o;
								t[n--] = o;
							}
							return t;
						})(this)),
						this.strings.error)
					)
						return e._super.setError(this.strings.error), void (e.inError = !0);
					this.secondPos = (function (e) {
						var t = [];
						t[0] = [];
						for (var r = e.strings, n = 1; n < r.length; n++) t[n] = r[n - 1];
						return t;
					})(this);
				}
				(h.prototype.stringToPitch = function (e) {
					return 5.3 + (this.strings.length - 1 - e) * this.linePitch;
				}),
					(h.prototype.notesToNumber = function (e, t) {
						var r,
							n,
							a = null,
							o = null;
						if (
							(e &&
								((o = []),
								e.length > 1
									? (o = s(this, e)).error && (a = o.error)
									: e[0].endTie ||
									  ((r = new i.TabNote(e[0].name, this.clefTranspose)).checkKeyAccidentals(
											this.accidentals,
											this.measureAccidentals
									  ),
									  (n = c(this, r)) ? o.push(n) : (l(o, r), (a = o.error)))),
							a)
						)
							return o;
						var h = null;
						if (t) {
							h = [];
							for (var u = 0; u < t.length; u++)
								(r = new i.TabNote(t[u].name, this.clefTranspose)).checkKeyAccidentals(
									this.accidentals,
									this.measureAccidentals
								),
									(n = c(this, r)) ? h.push(n) : (l(h, r), (a = o.error));
						}
						return { notes: o, graces: h, error: a };
					}),
					(h.prototype.toString = function () {
						for (var e = [], t = 0; t < this.tuning.length; t++) {
							var r = this.tuning[t].replaceAll(',', '').replaceAll("'", '').toUpperCase();
							'_' === r[0] ? (r = r[1] + 'b ') : '^' === r[0] && (r = r[1] + '# '), e.push(r);
						}
						return e.join('');
					}),
					(h.prototype.tabInfos = function (e) {
						var t = e._super.params.label;
						if (t) {
							var r = '';
							return (
								-1 != t.indexOf('%T') &&
									((r = this.toString()), e.capo > 0 && (r += ' capo:' + e.capo), (t = t.replace('%T', r))),
								t
							);
						}
						return '';
					}),
					(e.exports = h);
			},
			8918: function (e) {
				function t(e, t) {
					(this.numLines = e),
						(this.lineSpace = t),
						(this.verticalSize = this.numLines * this.lineSpace),
						(this.bar = { pitch: 3, pitch2: t * e, height: 5 });
				}
				(t.prototype.bypass = function (e) {
					var t = e.staffGroup.voices;
					return !!(t.length > 0 && t[0].isPercussion);
				}),
					(t.prototype.setRelative = function (e, t, r) {
						switch (e.type) {
							case 'bar':
								(t.pitch = this.bar.pitch), (t.pitch2 = this.bar.pitch2), (t.height = this.height);
								break;
							case 'symbol':
								var n = this.bar.pitch2 / 2;
								if ('dots.dot' == e.name) return r ? ((t.pitch = n), !1) : ((t.pitch = n + this.lineSpace), !0);
						}
						return r;
					}),
					(e.exports = t);
			},
			6776: function (e, t, r) {
				var n = r(2842),
					i = n.noteToMidi,
					a = n.midiToNote;
				function s(e, t) {
					var r = i(e);
					t && (r += t);
					var n,
						s = a(r),
						o = !1,
						c = !1,
						l = null,
						h = null,
						u = !1,
						d = 0;
					e.startsWith('_')
						? ((o = !0), (d = -1), '/' == e[1] ? ((o = !1), (h = 'v'), (d = 0)) : '_' == e[1] && ((u = !0), (d -= 1)))
						: e.startsWith('^')
						? ((c = !0), (d = 1), '/' == e[1] ? ((c = !1), (h = '^'), (d = 0)) : '^' == e[1] && ((u = !0), (d += 1)))
						: e.startsWith('=') && ((l = !0), (d = 0)),
						((n = o || c || null != h) || l) && (s = null != h || u ? e.slice(2) : e.slice(1));
					var f = (s.match(/,/g) || []).length,
						p = (s.match(/'/g) || []).length;
					(this.pitch = r),
						(this.pitchAltered = 0),
						(this.name = s),
						(this.acc = d),
						(this.isSharp = c),
						(this.isKeySharp = !1),
						(this.isDouble = u),
						(this.isAltered = n),
						(this.isFlat = o),
						(this.isKeyFlat = !1),
						(this.natural = l),
						(this.quarter = h),
						(this.isLower = this.name == this.name.toLowerCase()),
						(this.name = this.name[0].toUpperCase()),
						(this.hasComma = f),
						(this.isQuoted = p);
				}
				(s.prototype.sameNoteAs = function (e) {
					return e.pitch === this.pitch;
				}),
					(s.prototype.isLowerThan = function (e) {
						return e.pitch > this.pitch;
					}),
					(s.prototype.checkKeyAccidentals = function (e, t) {
						if (!this.isAltered && !this.natural)
							if (t[this.name.toUpperCase()])
								switch (t[this.name.toUpperCase()]) {
									case '__':
										return (this.acc = -2), void (this.pitchAltered = -2);
									case '_':
										return (this.acc = -1), void (this.pitchAltered = -1);
									case '=':
										return (this.acc = 0), void (this.pitchAltered = 0);
									case '^':
										return (this.acc = 1), void (this.pitchAltered = 1);
									case '^^':
										return (this.acc = 2), void (this.pitchAltered = 2);
								}
							else if (e)
								for (var r = this.name, n = 0; n < e.length; n++) {
									var i = e[n];
									r == i.note.toUpperCase() &&
										('flat' == i.acc && ((this.acc = -1), (this.isKeyFlat = !0), (this.pitchAltered = -1)),
										'sharp' == i.acc && ((this.acc = 1), (this.isKeySharp = !0), (this.pitchAltered = 1)));
								}
					}),
					(s.prototype.getAccidentalEquiv = function () {
						var e,
							t,
							r =
								(((t = new s((e = this).name)).pitch = e.pitch),
								(t.hasComma = e.hasComma),
								(t.isLower = e.isLower),
								(t.isQuoted = e.isQuoted),
								(t.isSharp = e.isSharp),
								(t.isKeySharp = e.isKeySharp),
								(t.isFlat = e.isFlat),
								(t.isKeyFlat = e.isKeyFlat),
								t);
						return (
							r.isSharp || r.isKeySharp
								? (((r = r.nextNote()).isFlat = !0), (r.isSharp = !1), (r.isKeySharp = !1))
								: (r.isFlat || r.isKeyFlat) && (((r = r.prevNote()).isSharp = !0), (r.isFlat = !1), (r.isKeyFlat = !1)),
							r
						);
					}),
					(s.prototype.nextNote = function () {
						return new s(a(this.pitch + 1 + this.pitchAltered));
					}),
					(s.prototype.prevNote = function () {
						return new s(a(this.pitch - 1 + this.pitchAltered));
					}),
					(s.prototype.emitNoAccidentals = function () {
						var e = this.name;
						this.isLower && (e = e.toLowerCase());
						for (var t = 0; t < this.isQuoted; t++) e += "'";
						for (var r = 0; r < this.hasComma; r++) e += ',';
						return e;
					}),
					(s.prototype.emit = function () {
						var e = this.name;
						(this.isSharp || this.isKeySharp) && ((e = '^' + e), this.isDouble && (e = '^' + e)),
							(this.isFlat || this.isKeyFlat) && ((e = '_' + e), this.isDouble && (e = '_' + e)),
							this.quarter && (e = '^' == this.quarter ? '^/' + e : '_/' + e),
							this.natural && (e = '=' + e);
						for (var t = 1; t <= this.hasComma; t++) e += ',';
						if (this.isLower) {
							e = e.toLowerCase();
							for (var r = 1; r <= this.isQuoted; r++) e += "'";
						}
						return e;
					}),
					(e.exports = { TabNote: s, notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] });
			},
			6629: function (e, t, r) {
				var n = r(6776),
					i = n.notes;
				function a(e, t) {
					(this.fromN = new n.TabNote(e)), (this.toN = new n.TabNote(t));
				}
				(a.prototype.build = function () {
					var e = this.fromN,
						t = this.toN;
					if (t.isLowerThan(e)) {
						var r = e.emit();
						return { error: 'Invalid string Instrument tuning : ' + t.emit() + ' string lower than ' + r + ' string' };
					}
					var n = [],
						a = i.indexOf(e.name),
						s = i.indexOf(t.name);
					if (-1 == a || -1 == s) return n;
					for (var o = !1; !o; ) n.push(e.emit()), (e = e.nextNote()).sameNoteAs(t) && (o = !0);
					return n;
				}),
					(e.exports = a);
			},
			4916: function (e, t, r) {
				var n = r(8918),
					i = r(8660),
					a = r(676),
					s = r(7658);
				function o() {}
				(o.prototype.init = function (e, t, r) {
					var a = new i(e, t, r);
					(this.abcTune = e),
						(this._super = a),
						(this.linePitch = 3),
						(this.nbLines = 4),
						(this.isTabBig = !1),
						(this.capo = r.capo),
						(this.transpose = r.visualTranspose),
						(this.tablature = new n(this.nbLines, this.linePitch));
					var o = new s(this);
					this.semantics = o;
				}),
					(o.prototype.render = function (e, t, r) {
						this._super.inError || this.tablature.bypass(t) || new a(this, e, t, r).doLayout();
					}),
					(e.exports = function () {
						return { name: 'ViolinTab', tablature: o };
					});
			},
			7658: function (e, t, r) {
				var n = r(1921);
				function i(e) {
					(this.tuning = e._super.params.tuning),
						this.tuning || (this.tuning = ['G,', 'D', 'A', 'e']),
						(e.tuning = this.tuning),
						(this.strings = new n(e));
				}
				(i.prototype.notesToNumber = function (e, t) {
					return this.strings.notesToNumber(e, t);
				}),
					(i.prototype.stringToPitch = function (e) {
						return this.strings.stringToPitch(e);
					}),
					(e.exports = i);
			},
			1696: function (e, t, r) {
				var n = r(1409),
					i = r(6658);
				function a(e, t) {
					for (var r in t)
						t.hasOwnProperty(r) &&
							(Array.isArray(t[r]) || (null != (n = t[r]) && n.constructor === Object) || (e[r] = t[r]));
					var n;
				}
				function s(e) {
					var t = new n('', 0, 0, '', 0);
					return (
						a(t, e),
						(t.top = 0),
						(t.bottom = -1),
						e.abcelem &&
							((t.abcelem = {}),
							a(t.abcelem, e.abcelem),
							'note' === t.abcelem.el_type && (t.abcelem.el_type = 'tabNumber')),
						(e.cloned = t),
						t
					);
				}
				function o(e, t) {
					var r = s(e);
					if (t)
						for (var n = e.children, o = !0, c = 0; c < n.length; c++) {
							var l = n[c],
								h = new i('', 0, 0, 0, '');
							a(h, l), (o = t.tablature.setRelative(l, h, o)), r.children.push(h);
						}
					return r;
				}
				function c(e, t, r) {
					var a = 'tab.tiny',
						s = 7.5;
					e.isTabBig && ((a = 'tab.big'), (s = 10));
					var o = new n({ el_type: 'tab', icon: a, Ypos: s }, 0, 0, 'symbol', 0);
					o.x = t;
					var c = new i(a, 0, 0, 7.5, 'tab');
					return (c.x = r), o.children.push(c), 'tab' == o.abcelem.el_type && (c.pitch = s), o;
				}
				function l(e) {
					if (e.extra)
						for (var t = 0; t < e.extra.length; t++) {
							var r = e.extra[t];
							if ('lyric' == r.type) return { bottom: r.bottom, height: r.height };
						}
					return null;
				}
				function h() {
					this.accidentals = null;
				}
				function u(e, t, r, n, a) {
					var s = n.num;
					null != n.note.quarter && ((s = s.toString()), (s += n.note.quarter));
					var o = e.semantics.stringToPitch(n.str);
					r.notes.push({ num: s, str: n.str, pitch: n.note.emit() });
					var c = new i(s, 0, 0, o + 0.3, { type: 'tabNumber' });
					return (c.x = t), (c.isGrace = a), (c.isAltered = n.note.isAltered), c;
				}
				function d(e, t) {
					var r = 0;
					if (e.extra)
						for (var n = 0; n < e.extra.length; n++)
							if (e.extra[n].c.indexOf('noteheads') >= 0) {
								if (r === t) return e.extra[n].x + e.extra[n].w / 2;
								r++;
							}
					return -1;
				}
				function f(e) {
					if (e.abcelem) {
						var t = e.abcelem;
						if (t.rest) return t.gracenotes;
					}
					return null;
				}
				function p(e, t, r) {
					var n = e.semantics.notesToNumber(t, r);
					if (n.error) return e._super.setError(n.error), n;
					if (n.graces && n.notes) {
						var i = n.notes.length - 1;
						n.notes[i].graces = n.graces;
					}
					return n;
				}
				function m(e, t, r, n, i) {
					for (var a = 0; a < n.length; a++) {
						var s = {
								el_type: 'note',
								startChar: r.abcelem.startChar,
								endChar: r.abcelem.endChar,
								notes: [],
								grace: !0
							},
							o = u(e, d(r, a), s, n[a], !0);
						t.children.push(o), i.push(s);
					}
				}
				(h.prototype.build = function (e, t, r, n, i, a) {
					var h = (function (e) {
							for (var t = 0, r = 0; r < e.length; r++) e[r].tabNameInfos || t++;
							return t;
						})(t),
						g = t[i + n],
						v = t[h + i + n],
						b = null,
						y = null;
					'clef' != g.children[0].abcelem.el_type && 'none' != a && g.children.splice(0, 0, a);
					for (var x = 0; x < g.children.length; x++) {
						var w = g.children[x],
							k = w.x,
							C = k;
						switch (
							(w.isClef &&
								(v.children.push(c(e, k, C)),
								w.abcelem.type.indexOf('-8') >= 0 && (e.semantics.strings.clefTranspose = -12),
								w.abcelem.type.indexOf('+8') >= 0 && (e.semantics.strings.clefTranspose = 12)),
							w.type)
						) {
							case 'staff-extra key-signature':
								(this.accidentals = w.abcelem.accidentals), (e.semantics.strings.accidentals = this.accidentals);
								break;
							case 'bar':
								e.semantics.strings.measureAccidentals = {};
								var T = !1;
								x === g.children.length - 1 && (T = !0);
								var _ = o(w, e);
								if (_.abcelem.barNumber) {
									delete _.abcelem.barNumber;
									for (var S = 0; S < _.children.length; S++)
										if ('barNumber' === _.children[S].type) {
											_.children.splice(S, 1);
											break;
										}
								}
								(_.abcelem.lastBar = T),
									v.children.push(_),
									r.push({
										el_type: w.abcelem.el_type,
										type: w.abcelem.type,
										endChar: w.abcelem.endChar,
										startChar: w.abcelem.startChar,
										abselem: _
									});
								break;
							case 'rest':
								var E = f(w);
								if (E) {
									if ((b = p(e, null, E)).error) return;
									(O = {
										el_type: 'note',
										startChar: w.abcelem.startChar,
										endChar: w.abcelem.endChar,
										notes: [],
										grace: !0
									}),
										m(e, M, w, b.graces, r);
								}
								break;
							case 'note':
								var M = s(w);
								(M.x = w.heads[0].x + w.heads[0].w / 2), (M.lyricDim = l(w));
								var N = w.abcelem.pitches,
									A = w.abcelem.gracenotes;
								if (((M.type = 'tabNumber'), (b = p(e, N, A)).error)) return;
								if (b.graces) {
									var B = b.notes.length - 1;
									b.notes[B].graces = b.graces;
								}
								y = { el_type: 'note', startChar: w.abcelem.startChar, endChar: w.abcelem.endChar, notes: [] };
								for (var P = 0; P < b.notes.length; P++) {
									var L = b.notes[P];
									if (L.graces)
										for (var H = 0; H < L.graces.length; H++) {
											var O = {
													el_type: 'note',
													startChar: w.abcelem.startChar,
													endChar: w.abcelem.endChar,
													notes: [],
													grace: !0
												},
												z = u(e, d(w, H), O, L.graces[H], !0);
											M.children.push(z), r.push(O);
										}
									var D = u(e, M.x + w.heads[P].dx, y, L, !1);
									M.children.push(D);
								}
								y.notes.length > 0 && ((y.abselem = M), r.push(y), v.children.push(M));
						}
					}
				}),
					(e.exports = h);
			},
			8660: function (e) {
				function t(e, t, r) {
					(this.tune = e), (this.params = r), (this.tuneNumber = t), (this.inError = !1);
				}
				(t.prototype.setError = function (e) {
					var t = this.tune;
					e && ((this.error = e), (this.inError = !0), t.warnings ? t.warnings.push(e) : (t.warnings = [e]));
				}),
					(e.exports = t);
			},
			676: function (e, t, r) {
				var n = r(3197),
					i = r(1696),
					a = r(4331);
				function s(e, t, r, n) {
					(this.renderer = t),
						(this.plugin = e),
						(this.line = r),
						(this.absolutes = new i()),
						(this.staffIndex = n),
						(this.tabStaff = { clef: { type: 'TAB' } }),
						(this.tabSize = e.linePitch * e.nbLines);
				}
				function o(e, t) {
					return !(!t[e].isTabStaff || (e !== t.length - 1 && t[e + 1].isTabStaff));
				}
				function c(e, t) {
					for (var r = t; r >= 0; r--) if (!e[r].isTabStaff) return r;
					return -1;
				}
				function l(e, t) {
					return 'clef' === e[t].children[0].abcelem.el_type ? null : 0 == t ? 'none' : e[t - 1].children[0];
				}
				(s.prototype.doLayout = function () {
					var e = this.line.staff;
					if (e) {
						var t = e[0];
						if (t && t.clef && 0 == t.clef.stafflines)
							return void this.plugin._super.setError('No tablatures when stafflines=0');
						e.splice(e.length, 0, this.tabStaff);
					}
					var r = this.line.staffGroup,
						i = r.voices,
						s = (function (e) {
							for (var t = 0, r = 0; r < e.children.length; r++) {
								var n = e.children[r];
								n.specialY && n.specialY.lyricHeightBelow > t && (t = n.specialY.lyricHeightBelow);
							}
							return t;
						})(i[0]),
						h = this.staffIndex,
						u = r.staffs[h],
						d = this.tabSize + 3 - u.bottom - s;
					u.isTabStaff && (d = u.top);
					var f = {
							bottom: -1,
							isTabStaff: !0,
							specialY: {
								tempoHeightAbove: 0,
								partHeightAbove: 0,
								volumeHeightAbove: 0,
								dynamicHeightAbove: 0,
								endingHeightAbove: 0,
								chordHeightAbove: 0,
								lyricHeightAbove: 0,
								lyricHeightBelow: 0,
								chordHeightBelow: 0,
								volumeHeightBelow: 0,
								dynamicHeightBelow: 0
							},
							lines: this.plugin.nbLines,
							linePitch: this.plugin.linePitch,
							dy: 0.15,
							top: d
						},
						p = (function (e, t) {
							for (var r = e.staffIndex, n = 0, i = 0, a = 0; ; ) {
								if (!t[n]) return -1;
								if ((t[n].isTabStaff || (a = t[n].voices.length), t[n].isTabStaff)) {
									if ((i++, o(n, t) && i < a)) return n + 1;
								} else if (((i = 0), n >= r)) {
									if (n + 1 == t.length) return n + 1;
									if (!t[n + 1].isTabStaff) return n + 1;
								}
								if (++n > t.length) return -1;
							}
						})(this, r.staffs);
					if (-1 !== p) {
						(f.parentIndex = p - 1), r.staffs.splice(p, 0, f), (r.height += this.tabSize + 3);
						var m,
							g,
							v,
							b,
							y,
							x,
							w = (function (e, t) {
								for (var r = t; r >= 0; r--) if (!e[r].isTabStaff) return e[r];
								return null;
							})(r.staffs, p),
							k = 1;
						(function (e, t) {
							return (
								1 ===
									(function (e) {
										for (var t = 0, r = 0; r < e.length; r++) e[r].isTabStaff || t++;
										return t;
									})(e) && t.voices.length > 1
							);
						})(r.staffs, w) && (k = w.voices.length),
							(this.tabStaff.voices = []);
						for (var C = 0; C < k; C++) {
							var T = new n(0, 0);
							C > 0 && (T.duplicate = !0);
							var _ =
								((g = T),
								(v = void 0),
								(b = void 0),
								(y = void 0),
								(x = void 0),
								(v = (m = this).plugin.semantics.strings),
								(b = m.renderer.controller.getTextSize),
								(y = v.tabInfos(m.plugin)),
								(x = b.calc(y, 'tablabelfont', 'text instrumentname')),
								(g.tabNameInfos = { textSize: x, name: y }),
								x.height / a.STEP);
							(_ = Math.max(_, 1)),
								(r.staffs[this.staffIndex].top += _),
								(r.height += _ * a.STEP),
								(T.staff = f),
								i.splice(i.length, 0, T);
							var S = l(i, C + this.staffIndex);
							(this.tabStaff.voices[C] = []),
								this.absolutes.build(this.plugin, i, this.tabStaff.voices[C], C, this.staffIndex, S);
						}
						!(function (e) {
							for (var t = 0; t < e.length; t++)
								if (e[t].isTabStaff) {
									var r = c(e, t);
									(e[t].hasStaff = e[r]), e[r].hasTab || (e[r].hasTab = []), e[r].hasTab.push(e[t]);
								}
						})(r.staffs);
					}
				}),
					(e.exports = s);
			},
			1897: function (e, t, r) {
				var n = r(1409),
					i = r(8491),
					a = r(5224),
					s = r(9600),
					o = r(3923),
					c = r(2143),
					l = r(2525),
					h = r(8677),
					u = r(8256),
					d = r(6020),
					f = r(6658),
					p = r(4331),
					m = r(7398),
					g = r(1106),
					v = r(6183),
					b = r(2096),
					y = r(3197),
					x = r(2652),
					w = r(5058),
					k = r(5008),
					C = function (e) {
						var t = 0;
						return e.duration && (t = e.duration), t;
					},
					T = !1,
					_ = {
						rest: {
							0: 'rests.whole',
							1: 'rests.half',
							2: 'rests.quarter',
							3: 'rests.8th',
							4: 'rests.16th',
							5: 'rests.32nd',
							6: 'rests.64th',
							7: 'rests.128th',
							multi: 'rests.multimeasure'
						},
						note: {
							'-1': 'noteheads.dbl',
							0: 'noteheads.whole',
							1: 'noteheads.half',
							2: 'noteheads.quarter',
							3: 'noteheads.quarter',
							4: 'noteheads.quarter',
							5: 'noteheads.quarter',
							6: 'noteheads.quarter',
							7: 'noteheads.quarter',
							nostem: 'noteheads.quarter'
						},
						rhythm: {
							'-1': 'noteheads.slash.whole',
							0: 'noteheads.slash.whole',
							1: 'noteheads.slash.whole',
							2: 'noteheads.slash.quarter',
							3: 'noteheads.slash.quarter',
							4: 'noteheads.slash.quarter',
							5: 'noteheads.slash.quarter',
							6: 'noteheads.slash.quarter',
							7: 'noteheads.slash.quarter',
							nostem: 'noteheads.slash.nostem'
						},
						x: {
							'-1': 'noteheads.indeterminate',
							0: 'noteheads.indeterminate',
							1: 'noteheads.indeterminate',
							2: 'noteheads.indeterminate',
							3: 'noteheads.indeterminate',
							4: 'noteheads.indeterminate',
							5: 'noteheads.indeterminate',
							6: 'noteheads.indeterminate',
							7: 'noteheads.indeterminate',
							nostem: 'noteheads.indeterminate'
						},
						harmonic: {
							'-1': 'noteheads.harmonic.quarter',
							0: 'noteheads.harmonic.quarter',
							1: 'noteheads.harmonic.quarter',
							2: 'noteheads.harmonic.quarter',
							3: 'noteheads.harmonic.quarter',
							4: 'noteheads.harmonic.quarter',
							5: 'noteheads.harmonic.quarter',
							6: 'noteheads.harmonic.quarter',
							7: 'noteheads.harmonic.quarter',
							nostem: 'noteheads.harmonic.quarter'
						},
						triangle: {
							'-1': 'noteheads.triangle.quarter',
							0: 'noteheads.triangle.quarter',
							1: 'noteheads.triangle.quarter',
							2: 'noteheads.triangle.quarter',
							3: 'noteheads.triangle.quarter',
							4: 'noteheads.triangle.quarter',
							5: 'noteheads.triangle.quarter',
							6: 'noteheads.triangle.quarter',
							7: 'noteheads.triangle.quarter',
							nostem: 'noteheads.triangle.quarter'
						},
						uflags: { 3: 'flags.u8th', 4: 'flags.u16th', 5: 'flags.u32nd', 6: 'flags.u64th' },
						dflags: { 3: 'flags.d8th', 4: 'flags.d16th', 5: 'flags.d32nd', 6: 'flags.d64th' }
					},
					S = function (e, t, r) {
						(this.decoration = new h()),
							(this.getTextSize = e),
							(this.tuneNumber = t),
							(this.isBagpipes = r.bagpipes),
							(this.flatBeams = r.flatbeams),
							(this.graceSlurs = r.graceSlurs),
							(this.percmap = r.percmap),
							(this.initialClef = r.initialClef),
							(this.jazzchords = !!r.jazzchords),
							(this.germanAlphabet = !!r.germanAlphabet),
							this.reset();
					};
				function E(e, t) {
					var r = e[t];
					if ('note' !== r.el_type || !r.startBeam || r.endBeam) return { count: 1, elem: r };
					for (var n = []; t < e.length && 'note' === e[t].el_type && (n.push(e[t]), !e[t].endBeam); ) t++;
					return { count: n.length, elem: n };
				}
				function M(e) {
					if (e.pitches) {
						N(e);
						for (var t = 0, r = 0; r < e.pitches.length; r++) t += e.pitches[r].verticalPos;
						(e.averagepitch = t / e.pitches.length),
							(e.minpitch = e.pitches[0].verticalPos),
							(e.maxpitch = e.pitches[e.pitches.length - 1].verticalPos);
					}
				}
				(S.prototype.reset = function () {
					(this.slurs = {}),
						(this.ties = []),
						(this.voiceScale = 1),
						(this.voiceColor = void 0),
						(this.slursbyvoice = {}),
						(this.tiesbyvoice = {}),
						(this.endingsbyvoice = {}),
						(this.scaleByVoice = {}),
						(this.colorByVoice = {}),
						(this.tripletmultiplier = 1),
						(this.abcline = void 0),
						(this.accidentalSlot = void 0),
						(this.accidentalshiftx = void 0),
						(this.dotshiftx = void 0),
						(this.hasVocals = !1),
						(this.minY = void 0),
						(this.partstartelem = void 0),
						(this.startlimitelem = void 0),
						(this.stemdir = void 0);
				}),
					(S.prototype.setStemHeight = function (e) {
						this.stemHeight = Math.round((10 * e) / p.STEP) / 10;
					}),
					(S.prototype.getCurrentVoiceId = function (e, t) {
						return 's' + e + 'v' + t;
					}),
					(S.prototype.pushCrossLineElems = function (e, t) {
						(this.slursbyvoice[this.getCurrentVoiceId(e, t)] = this.slurs),
							(this.tiesbyvoice[this.getCurrentVoiceId(e, t)] = this.ties),
							(this.endingsbyvoice[this.getCurrentVoiceId(e, t)] = this.partstartelem),
							(this.scaleByVoice[this.getCurrentVoiceId(e, t)] = this.voiceScale),
							this.voiceColor && (this.colorByVoice[this.getCurrentVoiceId(e, t)] = this.voiceColor);
					}),
					(S.prototype.popCrossLineElems = function (e, t) {
						(this.slurs = this.slursbyvoice[this.getCurrentVoiceId(e, t)] || {}),
							(this.ties = this.tiesbyvoice[this.getCurrentVoiceId(e, t)] || []),
							(this.partstartelem = this.endingsbyvoice[this.getCurrentVoiceId(e, t)]),
							(this.voiceScale = this.scaleByVoice[this.getCurrentVoiceId(e, t)]),
							void 0 === this.voiceScale && (this.voiceScale = 1),
							(this.voiceColor = this.colorByVoice[this.getCurrentVoiceId(e, t)]);
					}),
					(S.prototype.containsLyrics = function (e) {
						for (var t = 0; t < e.length; t++)
							for (var r = 0; r < e[t].voices.length; r++)
								for (var n = 0; n < e[t].voices[r].length; n++) {
									var i = e[t].voices[r][n];
									if (i.lyric)
										return void ((i.positioning && 'below' !== i.positioning.vocalPosition) || (this.hasVocals = !0));
								}
					}),
					(S.prototype.createABCLine = function (e, t, r) {
						(this.minY = 2), this.containsLyrics(e);
						var n = new m(this.getTextSize);
						this.tempoSet = !1;
						for (var i = 0; i < e.length; i++)
							T && this.restoreState(), (T = !1), this.createABCStaff(n, e[i], t, i, r);
						return n;
					}),
					(S.prototype.createABCStaff = function (e, t, r, n, i) {
						e.getTextSize.updateFonts(t);
						for (var c = 0; c < t.voices.length; c++) {
							var h = new y(c, t.voices.length);
							0 === c
								? ((h.barfrom = 'start' === t.connectBarLines || 'continue' === t.connectBarLines),
								  (h.barto = 'continue' === t.connectBarLines || 'end' === t.connectBarLines))
								: (h.duplicate = !0),
								t.title &&
									t.title[c] &&
									((h.header = t.title[c].replace(/\\n/g, '\n')),
									(h.headerPosition =
										6 +
										e.getTextSize.baselineToCenter(
											h.header,
											'voicefont',
											'staff-extra voice-name',
											c,
											t.voices.length
										) /
											p.STEP)),
								t.clef && 'perc' === t.clef.type && (h.isPercussion = !0);
							var u = (!this.initialClef || 0 === i) && s(t.clef, this.tuneNumber);
							u &&
								(0 === c && t.barNumber && this.addMeasureNumber(t.barNumber, u),
								h.addChild(u),
								(this.startlimitelem = u));
							var d = o(t.key, this.tuneNumber);
							if ((d && (h.addChild(d), (this.startlimitelem = d)), t.meter)) {
								'specified' === t.meter.type
									? (this.measureLength = t.meter.value[0].num / t.meter.value[0].den)
									: (this.measureLength = 1);
								var f = l(t.meter, this.tuneNumber);
								h.addChild(f), (this.startlimitelem = f);
							}
							h.duplicate && (h.children = []);
							var m = t.clef.stafflines || 0 === t.clef.stafflines ? t.clef.stafflines : 5;
							e.addVoice(h, n, m);
							var g = 1 === m;
							this.createABCVoice(t.voices[c], r, n, c, g, h),
								e.setStaffLimits(h),
								0 === c &&
									('start' === t.brace || (!e.brace && t.brace)
										? (e.brace || (e.brace = []), e.brace.push(new a(h, 'brace')))
										: 'end' === t.brace && e.brace
										? e.brace[e.brace.length - 1].setBottomStaff(h)
										: 'continue' === t.brace && e.brace && e.brace[e.brace.length - 1].continuing(h),
									'start' === t.bracket || (!e.bracket && t.bracket)
										? (e.bracket || (e.bracket = []), e.bracket.push(new a(h, 'bracket')))
										: 'end' === t.bracket && e.bracket
										? e.bracket[e.bracket.length - 1].setBottomStaff(h)
										: 'continue' === t.bracket && e.bracket && e.bracket[e.bracket.length - 1].continuing(h));
						}
					}),
					(S.prototype.createABCVoice = function (e, t, r, i, a, s) {
						this.popCrossLineElems(r, i),
							(this.stemdir = this.isBagpipes ? 'down' : null),
							(this.abcline = e),
							this.partstartelem && ((this.partstartelem = new u('', null, null)), s.addOther(this.partstartelem));
						var o = s.voicetotal < 2 ? -1 : s.voicenumber;
						for (var l in this.slurs)
							this.slurs.hasOwnProperty(l) &&
								((this.slurs[l] = new v({
									force: this.slurs[l].force,
									voiceNumber: o,
									stemDir: this.slurs[l].stemDir,
									style: this.slurs[l].dotted
								})),
								T && this.slurs[l].setHint(),
								s.addOther(this.slurs[l]));
						for (var h = 0; h < this.ties.length; h++)
							(this.ties[h] = new v({
								force: this.ties[h].force,
								stemDir: this.ties[h].stemDir,
								voiceNumber: o,
								style: this.ties[h].dotted
							})),
								T && this.ties[h].setHint(),
								s.addOther(this.ties[h]);
						for (var d = 0; d < this.abcline.length; d++)
							M(this.abcline[d]), (this.minY = Math.min(this.abcline[d].minpitch, this.minY));
						for (var f = 0 === r, p = 0; p < this.abcline.length; ) {
							var m = E(this.abcline, p),
								b = this.createABCElement(f, a, s, m.elem);
							if (b)
								for (h = 0; h < b.length; h++) {
									if (!this.tempoSet && t && !t.suppress) {
										this.tempoSet = !0;
										var y = new n(t, 0, 0, 'tempo', this.tuneNumber, {});
										y.addFixedX(new g(t, this.tuneNumber, c)), s.addChild(y);
									}
									s.addChild(b[h]);
								}
							p += m.count;
						}
						this.pushCrossLineElems(r, i);
					}),
					(S.prototype.saveState = function () {
						(this.tiesSave = k.cloneArray(this.ties)),
							(this.slursSave = k.cloneHashOfHash(this.slurs)),
							(this.slursbyvoiceSave = k.cloneHashOfHash(this.slursbyvoice)),
							(this.tiesbyvoiceSave = k.cloneHashOfArrayOfHash(this.tiesbyvoice));
					}),
					(S.prototype.restoreState = function () {
						(this.ties = k.cloneArray(this.tiesSave)),
							(this.slurs = k.cloneHashOfHash(this.slursSave)),
							(this.slursbyvoice = k.cloneHashOfHash(this.slursbyvoiceSave)),
							(this.tiesbyvoice = k.cloneHashOfArrayOfHash(this.tiesbyvoiceSave));
					}),
					(S.prototype.createABCElement = function (e, t, r, i) {
						var a = [];
						switch (i.el_type) {
							case void 0:
								a = this.createBeam(t, r, i);
								break;
							case 'note':
								(a[0] = this.createNote(i, !1, t, r)),
									this.triplet &&
										this.triplet.isClosed() &&
										(r.addOther(this.triplet), (this.triplet = null), (this.tripletmultiplier = 1));
								break;
							case 'bar':
								(a[0] = this.createBarLine(r, i, e)), r.duplicate && a.length > 0 && (a[0].invisible = !0);
								break;
							case 'meter':
								(a[0] = l(i, this.tuneNumber)),
									(this.startlimitelem = a[0]),
									r.duplicate && a.length > 0 && (a[0].invisible = !0);
								break;
							case 'clef':
								if (((a[0] = s(i, this.tuneNumber)), !a[0])) return null;
								r.duplicate && a.length > 0 && (a[0].invisible = !0);
								break;
							case 'key':
								var h = o(i, this.tuneNumber);
								h && ((a[0] = h), (this.startlimitelem = a[0])), r.duplicate && a.length > 0 && (a[0].invisible = !0);
								break;
							case 'stem':
								this.stemdir = 'auto' === i.direction ? void 0 : i.direction;
								break;
							case 'part':
								var u = new n(i, 0, 0, 'part', this.tuneNumber),
									d = this.getTextSize.calc(i.title, 'partsfont', 'part');
								u.addFixedX(new f(i.title, 0, 0, void 0, { type: 'part', height: d.height / p.STEP })), (a[0] = u);
								break;
							case 'tempo':
								var m = new n(i, 0, 0, 'tempo', this.tuneNumber);
								m.addFixedX(new g(i, this.tuneNumber, c)), (a[0] = m);
								break;
							case 'style':
								'normal' === i.head ? delete this.style : (this.style = i.head);
								break;
							case 'hint':
								(T = !0), this.saveState();
								break;
							case 'midi':
								break;
							case 'scale':
								this.voiceScale = i.size;
								break;
							case 'color':
								(this.voiceColor = i.color), (r.color = this.voiceColor);
								break;
							default:
								var v = new n(i, 0, 0, 'unsupported', this.tuneNumber);
								v.addFixed(new f('element type ' + i.el_type, 0, 0, void 0, { type: 'debug' })), (a[0] = v);
						}
						return a;
					}),
					(S.prototype.createBeam = function (e, t, r) {
						var n = [],
							a = new i(this.stemHeight * this.voiceScale, this.stemdir, this.flatBeams, r[0]);
						T && a.setHint();
						for (var s = 0; s < r.length; s++) a.runningDirection(r[s]);
						a.setStemDirection();
						var o = this.stemdir;
						for (this.stemdir = a.stemsUp ? 'up' : 'down', s = 0; s < r.length; s++) {
							var c = r[s],
								l = this.createNote(c, !0, e, t);
							n.push(l),
								a.add(l),
								this.triplet &&
									this.triplet.isClosed() &&
									(t.addOther(this.triplet), (this.triplet = null), (this.tripletmultiplier = 1));
						}
						return a.calcDir(), t.addBeam(a), (this.stemdir = o), n;
					});
				var N = function (e) {
						var t;
						do {
							t = !0;
							for (var r = 0; r < e.pitches.length - 1; r++)
								if (e.pitches[r].pitch > e.pitches[r + 1].pitch) {
									t = !1;
									var n = e.pitches[r];
									(e.pitches[r] = e.pitches[r + 1]), (e.pitches[r + 1] = n);
								}
						} while (!t);
					},
					A = function (e, t, r, n, i, a, s, o, c) {
						for (var l = r; l > 11; l--)
							l % 2 != 0 || n || e.addFixed(new f(null, o, (i + 4) * c, l, { type: 'ledger' }));
						for (l = t; l < 1; l++) l % 2 != 0 || n || e.addFixed(new f(null, o, (i + 4) * c, l, { type: 'ledger' }));
						for (l = 0; l < a.length; l++) {
							var h = i;
							'down' === s && (h = -h), e.addFixed(new f(null, h + o, (i + 4) * c, a[l], { type: 'ledger' }));
						}
					};
				function B(e, t) {
					for (var r = 0; r < e.length; r++) if (JSON.stringify(e[r]) === JSON.stringify(t)) return;
					e.push(t);
				}
				(S.prototype.addGraceNotes = function (e, t, r, n, a, s, o) {
					var l = 0.6;
					a = Math.round(0.7 * a);
					var h,
						u,
						p = null;
					e.gracenotes.length > 1 && ((p = new i(a, 'grace', s)), T && p.setHint(), (p.mainNote = r));
					var m = [];
					for (u = e.gracenotes.length - 1; u >= 0; u--) (o += 10), (m[u] = o), e.gracenotes[u].accidental && (o += 7);
					for (u = 0; u < e.gracenotes.length; u++) {
						var g = e.gracenotes[u].verticalPos;
						h = p ? null : _.uflags[s ? 5 : 3];
						var b = c(r, 'noteheads.quarter', e.gracenotes[u], {
							dir: 'up',
							headx: -m[u],
							extrax: -m[u],
							flag: h,
							scale: l * this.voiceScale,
							accidentalSlot: []
						});
						b.notehead.highestVert = b.notehead.pitch + a;
						var y = b.notehead;
						if (
							(this.addSlursAndTies(r, e.gracenotes[u], y, t, 'up', !0), r.addExtra(y), e.gracenotes[u].acciaccatura)
						) {
							var x = e.gracenotes[u].verticalPos + 4.2,
								w = p ? 5 : 6;
							r.addRight(new f('flags.ugrace', -m[u] + w, 0, x, { scalex: l, scaley: l }));
						}
						if (p) {
							var k = e.gracenotes[u].duration / 2;
							s && (k /= 2);
							var C = { heads: [y], abcelem: { averagepitch: g, minpitch: g, maxpitch: g, duration: k } };
							p.add(C);
						} else {
							var S = g + (1 / 3) * l,
								E = g + 4.2,
								M = y.dx + y.w;
							r.addExtra(new f(null, M, 0, S, { type: 'stem', pitch2: E, linewidth: -0.6 }));
						}
						A(r, g, g, !1, d.getSymbolWidth('noteheads.quarter'), [], !0, y.dx - 1, 0.6);
						var N = e.rest && ('spacer' === e.rest.type || 'invisible' === e.rest.type);
						0 !== u || s || !this.graceSlurs || N || t.addOther(new v({ anchor1: y, anchor2: n, isGrace: !0 }));
					}
					return p && (p.calcDir(), t.addBeam(p)), o;
				}),
					(S.prototype.addNoteToAbcElement = function (e, t, r, n, i, a, s, o, l) {
						var h,
							u,
							p,
							m,
							g,
							v = 0,
							b = 0,
							y = 0,
							x = [],
							k = [],
							T = 0,
							S = t.averagepitch >= 6 ? 'down' : 'up';
						for (
							n && (S = n),
								((i = t.style ? t.style : i) && 'normal' !== i) || (i = 'note'),
								(m = a ? _[i].nostem : _[i][-s]) || console.log('noteSymbol:', i, s, a),
								g = 'down' === S ? t.pitches.length - 2 : 1;
							'down' === S ? g >= 0 : g < t.pitches.length;
							g = 'down' === S ? g - 1 : g + 1
						) {
							var E = t.pitches['down' === S ? g + 1 : g - 1],
								M = t.pitches[g],
								N = 'down' === S ? E.pitch - M.pitch : M.pitch - E.pitch;
							N <= 1 &&
								!E.printer_shift &&
								((M.printer_shift = N ? 'different' : 'same'),
								(M.verticalPos > 11 || M.verticalPos < 1) && x.push(M.verticalPos - (M.verticalPos % 2)),
								'down' === S ? (b = d.getSymbolWidth(m) + 2) : (v = d.getSymbolWidth(m) + 2));
						}
						var A = t.pitches.length;
						for (g = 0; g < t.pitches.length; g++) {
							var P, L;
							if (
								(o ||
									(P =
										('down' === S && 0 !== g) || ('up' === S && g !== A - 1)
											? null
											: _['down' === S ? 'dflags' : 'uflags'][-s]),
								t.pitches[g].style)
							)
								L = _[t.pitches[g].style][-s];
							else if (l.isPercussion && this.percmap) {
								L = m;
								var H = this.percmap[w(t.pitches[g])];
								H && H.noteHead && _[H.noteHead] && (L = _[H.noteHead][-s]);
							} else L = m;
							if (
								((t.pitches[g].highestVert = t.pitches[g].verticalPos),
								(('up' === n || 'up' === S) && 0 === g) || (('down' === n || 'down' === S) && g === A - 1))
							) {
								if (
									((t.startSlur || 1 === A) &&
										((t.pitches[g].highestVert = t.pitches[A - 1].verticalPos),
										C(t) < 1 && ('up' === n || 'up' === S) && (t.pitches[g].highestVert += 6)),
									t.startSlur)
								)
									for (t.pitches[g].startSlur || (t.pitches[g].startSlur = []), p = 0; p < t.startSlur.length; p++)
										B(t.pitches[g].startSlur, t.startSlur[p]);
								if (t.endSlur)
									for (
										t.pitches[g].highestVert = t.pitches[A - 1].verticalPos,
											C(t) < 1 && ('up' === n || 'up' === S) && (t.pitches[g].highestVert += 6),
											t.pitches[g].endSlur || (t.pitches[g].endSlur = []),
											p = 0;
										p < t.endSlur.length;
										p++
									)
										B(t.pitches[g].endSlur, t.endSlur[p]);
							}
							var O = !o && s <= -1,
								z = c(e, L, t.pitches[g], {
									dir: S,
									extrax: -b,
									flag: P,
									dot: r,
									dotshiftx: v,
									scale: this.voiceScale,
									accidentalSlot: k,
									shouldExtendStem: !n,
									printAccidentals: !l.isPercussion
								});
							(T = Math.max(d.getSymbolWidth(L), T)),
								(e.extraw -= z.extraLeft),
								(h = z.notehead) &&
									(this.addSlursAndTies(e, t.pitches[g], h, l, O ? S : null, !1),
									t.gracenotes && t.gracenotes.length > 0 && (h.bottom = h.bottom - 1),
									e.addHead(h)),
								(b += z.accidentalshiftx),
								(y = Math.max(y, z.dotshiftx));
						}
						if (O) {
							var D = Math.round(70 * this.voiceScale) / 10,
								F = 'down' === S ? t.minpitch - D : t.minpitch + 1 / 3;
							F > 6 && !n && (F = 6);
							var I = 'down' === S ? t.maxpitch - 1 / 3 : t.maxpitch + D;
							I < 6 && !n && (I = 6);
							var j = 'down' === S || 0 === e.heads.length ? 0 : e.heads[0].w,
								V = 'down' === S ? 1 : -1;
							h && 'noteheads.slash.quarter' === h.c && ('down' === S ? (I -= 1) : (F += 1)),
								e.addRight(new f(null, j, 0, F, { type: 'stem', pitch2: I, linewidth: V, bottom: F - 1 })),
								(u = Math.min(F, I));
						}
						return {
							noteHead: h,
							roomTaken: b,
							roomTakenRight: y,
							min: u,
							additionalLedgers: x,
							dir: S,
							symbolWidth: T
						};
					}),
					(S.prototype.addLyric = function (e, t) {
						var r = '';
						t.lyric.forEach(function (e) {
							var t = ' ' === e.divider ? '' : e.divider;
							r += e.syllable + t + '\n';
						});
						var n = this.getTextSize.calc(r, 'vocalfont', 'lyric'),
							i = t.positioning ? t.positioning.vocalPosition : 'below';
						e.addCentered(
							new f(r, 0, n.width, void 0, {
								type: 'lyric',
								position: i,
								height: n.height / p.STEP,
								dim: this.getTextSize.attr('vocalfont', 'lyric')
							})
						);
					}),
					(S.prototype.createNote = function (e, t, r, i) {
						var a,
							s = null,
							o = 0,
							l = 0,
							h = 0,
							u = [],
							p = C(e),
							m = !1;
						0 === p && ((m = !0), (p = 0.25), (t = !0));
						for (
							var g = Math.floor(Math.log(p) / Math.log(2)), v = 0, y = Math.pow(2, g), w = y / 2;
							y < p;
							v++, y += w, w /= 2
						);
						e.startTriplet && (this.tripletmultiplier = e.tripletMultiplier);
						var k = p * this.tripletmultiplier;
						e.rest && 'multimeasure' === e.rest.type && (k = 1),
							e.rest && 'invisible-multimeasure' === e.rest.type && (k = this.measureLength * e.rest.text);
						var S = e.rest ? 'rest' : 'note',
							E = new n(e, k, 1, S, this.tuneNumber, { durationClassOveride: e.duration * this.tripletmultiplier });
						if ((T && E.setHint(), e.rest)) {
							this.measureLength === p &&
								'invisible' !== e.rest.type &&
								'spacer' !== e.rest.type &&
								e.rest.type.indexOf('multimeasure') < 0 &&
								(e.rest.type = 'whole');
							var M = (function (e, t, r, n, i, a, s, o, l) {
								var h,
									u,
									p,
									m,
									g = 7;
								switch (
									(i && ('down' === a && (g = 3), 'up' === a && (g = 11)),
									s && (g = r < 0.5 || r < 1 ? 7 : 5),
									t.rest.type)
								) {
									case 'whole':
										(h = _.rest[0]), (t.averagepitch = g), (t.minpitch = g), (t.maxpitch = g), (n = 0);
										break;
									case 'rest':
										(h = 'rhythm' === t.style ? _.rhythm[-o] : _.rest[-o]),
											(t.averagepitch = g),
											(t.minpitch = g),
											(t.maxpitch = g);
										break;
									case 'invisible':
									case 'invisible-multimeasure':
									case 'spacer':
										(h = ''), (t.averagepitch = g), (t.minpitch = g), (t.maxpitch = g);
										break;
									case 'multimeasure':
										(h = _.rest.multi), (t.averagepitch = g), (t.minpitch = g), (t.maxpitch = g), (n = 0);
										var v = d.getSymbolWidth(h);
										e.addHead(new f(h, v, 2 * v, 7));
										var b = new f('' + t.rest.text, v, v, 16, { type: 'multimeasure-text' });
										e.addExtra(b);
								}
								if (t.rest.type.indexOf('multimeasure') < 0 && 'invisible' !== t.rest.type) {
									var y = c(e, h, { verticalPos: g }, { dot: n, scale: l });
									(u = y.notehead) && (e.addHead(u), (p = y.accidentalshiftx), (m = y.dotshiftx));
								}
								return { noteHead: u, roomTaken: p, roomTakenRight: m };
							})(E, e, p, v, i.voicetotal > 1, this.stemdir, r, g, this.voiceScale);
							(s = M.noteHead), (o = M.roomTaken), (l = M.roomTakenRight);
						} else {
							var N = this.addNoteToAbcElement(E, e, v, this.stemdir, this.style, m, g, t, i);
							void 0 !== N.min && (this.minY = Math.min(N.min, this.minY)),
								(s = N.noteHead),
								(o = N.roomTaken),
								(l = N.roomTakenRight),
								(u = N.additionalLedgers),
								(a = N.dir),
								(h = N.symbolWidth);
						}
						if (
							(void 0 !== e.lyric && this.addLyric(E, e),
							void 0 !== e.gracenotes &&
								(o += this.addGraceNotes(e, i, E, s, this.stemHeight * this.voiceScale, this.isBagpipes, o)),
							e.decoration &&
								this.decoration.createDecoration(
									i,
									e.decoration,
									E.top,
									s ? s.w : 0,
									E,
									o,
									a,
									E.bottom,
									e.positioning,
									this.hasVocals
								),
							e.barNumber && E.addFixed(new f(e.barNumber, -10, 0, 0, { type: 'barNumber' })),
							A(E, e.minpitch, e.maxpitch, e.rest, h, u, a, -2, 1),
							void 0 !== e.chord)
						) {
							var B = x(this.getTextSize, E, e, o, l, h, this.jazzchords, this.germanAlphabet);
							(o = B.roomTaken), (l = B.roomTakenRight);
						}
						return (
							e.startTriplet && (this.triplet = new b(e.startTriplet, s, { flatBeams: this.flatBeams })),
							e.endTriplet && this.triplet && this.triplet.setCloseAnchor(s),
							!this.triplet ||
								e.startTriplet ||
								e.endTriplet ||
								(e.rest && 'spacer' === e.rest.type) ||
								this.triplet.middleNote(s),
							E
						);
					}),
					(S.prototype.addSlursAndTies = function (e, t, r, n, i, a) {
						if (t.endTie && this.ties.length > 0) {
							for (var s = !1, o = 0; o < this.ties.length; o++)
								if (this.ties[o].anchor1 && this.ties[o].anchor1.pitch === r.pitch) {
									this.ties[o].setEndAnchor(r), n.setRange(this.ties[o]), this.ties.splice(o, 1), (s = !0);
									break;
								}
							s || (this.ties[0].setEndAnchor(r), n.setRange(this.ties[0]), this.ties.splice(0, 1));
						}
						var c,
							l,
							h = n.voicetotal < 2 ? -1 : n.voicenumber;
						if (t.startTie) {
							var u = new v({
								anchor1: r,
								force: 'down' === this.stemdir || 'up' === this.stemdir,
								stemDir: this.stemdir,
								isGrace: a,
								voiceNumber: h,
								style: t.startTie.style
							});
							T && u.setHint(), (this.ties[this.ties.length] = u), n.addOther(u), (e.startTie = !0);
						}
						if (t.endSlur)
							for (var d = 0; d < t.endSlur.length; d++)
								(l = t.endSlur[d]),
									this.slurs[l]
										? ((c = this.slurs[l]).setEndAnchor(r), n.setRange(c), delete this.slurs[l])
										: ((c = new v({ anchor2: r, stemDir: this.stemdir, voiceNumber: h })),
										  T && c.setHint(),
										  n.addOther(c)),
									this.startlimitelem && c.setStartX(this.startlimitelem);
						else if (!a) for (var f in this.slurs) this.slurs.hasOwnProperty(f) && this.slurs[f].addInternalNote(r);
						if (t.startSlur)
							for (d = 0; d < t.startSlur.length; d++)
								(l = t.startSlur[d].label),
									(c = new v({ anchor1: r, stemDir: this.stemdir, voiceNumber: h, style: t.startSlur[d].style })),
									T && c.setHint(),
									(this.slurs[l] = c),
									n.addOther(c);
					}),
					(S.prototype.addMeasureNumber = function (e, t) {
						var r = this.getTextSize.calc(e, 'measurefont', 'bar-number'),
							n = 0;
						t.isClef && (n += r.width / 2);
						var i = r.width > 10 && 'treble' === t.abcelem.type ? 13 : 11;
						t.addFixed(
							new f(e, n, r.width, i + r.height / p.STEP, {
								type: 'barNumber',
								dim: this.getTextSize.attr('measurefont', 'bar-number')
							})
						);
					}),
					(S.prototype.createBarLine = function (e, t, r) {
						var i = new n(t, 0, 10, 'bar', this.tuneNumber),
							a = null,
							s = 0;
						t.barNumber && this.addMeasureNumber(t.barNumber, i);
						var o = 'bar_right_repeat' === t.type || 'bar_dbl_repeat' === t.type,
							c = 'bar_left_repeat' !== t.type && 'bar_thick_thin' !== t.type && 'bar_invisible' !== t.type,
							l =
								'bar_right_repeat' === t.type ||
								'bar_dbl_repeat' === t.type ||
								'bar_left_repeat' === t.type ||
								'bar_thin_thick' === t.type ||
								'bar_thick_thin' === t.type,
							h =
								'bar_left_repeat' === t.type ||
								'bar_thick_thin' === t.type ||
								'bar_thin_thin' === t.type ||
								'bar_dbl_repeat' === t.type,
							d = 'bar_left_repeat' === t.type || 'bar_dbl_repeat' === t.type;
						if (o || d) {
							for (var p in this.slurs) this.slurs.hasOwnProperty(p) && this.slurs[p].setEndX(i);
							this.startlimitelem = i;
						}
						if (
							(o && (i.addRight(new f('dots.dot', s, 1, 7)), i.addRight(new f('dots.dot', s, 1, 5)), (s += 6)),
							c && ((a = new f(null, s, 1, 2, { type: 'bar', pitch2: 10, linewidth: 0.6 })), i.addRight(a)),
							'bar_invisible' === t.type &&
								((a = new f(null, s, 1, 2, { type: 'none', pitch2: 10, linewidth: 0.6 })), i.addRight(a)),
							t.decoration &&
								this.decoration.createDecoration(
									e,
									t.decoration,
									12,
									l ? 3 : 1,
									i,
									0,
									'down',
									2,
									t.positioning,
									this.hasVocals
								),
							l &&
								((a = new f(null, (s += 4), 4, 2, { type: 'bar', pitch2: 10, linewidth: 4 })), i.addRight(a), (s += 5)),
							this.partstartelem && t.endEnding && ((this.partstartelem.anchor2 = a), (this.partstartelem = null)),
							h && ((a = new f(null, (s += 3), 1, 2, { type: 'bar', pitch2: 10, linewidth: 0.6 })), i.addRight(a)),
							d && ((s += 3), i.addRight(new f('dots.dot', s, 1, 7)), i.addRight(new f('dots.dot', s, 1, 5))),
							t.startEnding && r)
						) {
							var m = this.getTextSize.calc(t.startEnding, 'repeatfont', '').width;
							(i.minspacing += m + 10),
								(this.partstartelem = new u(t.startEnding, a, null)),
								e.addOther(this.partstartelem);
						}
						return (
							(i.extraw -= 5), void 0 !== t.chord && x(this.getTextSize, i, t, 0, 0, 0, !1, this.germanAlphabet), i
						);
					}),
					(e.exports = S);
			},
			2652: function (e, t, r) {
				var n = r(6658),
					i = r(4331),
					a = r(5810);
				e.exports = function (e, t, r, s, o, c, l, h) {
					for (var u = 0; u < r.chord.length; u++)
						for (
							var d = r.chord[u].position,
								f = r.chord[u].rel_position,
								p = r.chord[u].name.split('\n'),
								m = p.length - 1;
							m >= 0;
							m--
						) {
							var g,
								v,
								b,
								y = p[m],
								x = 0;
							'left' === d || 'right' === d || 'below' === d || 'above' === d || f
								? ((v = 'annotationfont'), (b = 'annotation'))
								: ((v = 'gchordfont'), (b = 'chord'), (y = a(y, l, h)));
							var w = e.attr(v, b),
								k = e.calc(y, v, b),
								C = k.width,
								T = k.height / i.STEP;
							switch (d) {
								case 'left':
									(x = -(s += C + 7)),
										(g = r.averagepitch),
										t.addExtra(new n(y, x, C + 4, g, { type: 'text', height: T, dim: w, position: 'left' }));
									break;
								case 'right':
									(x = o += 4),
										(g = r.averagepitch),
										t.addRight(new n(y, x, C + 4, g, { type: 'text', height: T, dim: w, position: 'right' }));
									break;
								case 'below':
									t.addRight(
										new n(y, 0, 0, void 0, { type: 'text', position: 'below', height: T, dim: w, realWidth: C })
									);
									break;
								case 'above':
									t.addRight(
										new n(y, 0, 0, void 0, { type: 'text', position: 'above', height: T, dim: w, realWidth: C })
									);
									break;
								default:
									if (f) {
										var _ = f.y + 3 * i.STEP;
										t.addRight(
											new n(y, x + f.x, 0, r.minpitch + _ / i.STEP, {
												position: 'relative',
												type: 'text',
												height: T,
												dim: w
											})
										);
									} else {
										var S = 'above';
										r.positioning && r.positioning.chordPosition && (S = r.positioning.chordPosition),
											'hidden' !== S &&
												t.addCentered(
													new n(y, c / 2, C, void 0, { type: 'chord', position: S, height: T, dim: w, realWidth: C })
												);
									}
							}
						}
					return { roomTaken: s, roomTakenRight: o };
				};
			},
			1716: function (e) {
				e.exports = function (e, t, r) {
					if (t.text) {
						t.marginLeft || (t.marginLeft = 0),
							t.klass || (t.klass = ''),
							t.anchor || (t.anchor = 'start'),
							t.info || (t.info = { startChar: -2, endChar: -2 }),
							t.marginTop && e.push({ move: t.marginTop });
						var n = {
							left: t.marginLeft,
							text: t.text,
							font: t.font,
							anchor: t.anchor,
							startChar: t.info.startChar,
							endChar: t.info.endChar
						};
						t.absElemType && (n.absElemType = t.absElemType),
							t.inGroup || (n.klass = t.klass),
							t.name && (n.name = t.name),
							e.push(n);
						var i = r.calc('A', t.font, t.klass),
							a = t.text.split('\n').length;
						if (('\n' === t.text[t.text.length - 1] && a--, !t.noMove)) {
							var s = 1.1 * i.height * a;
							e.push({ move: Math.round(s) }), t.marginBottom && e.push({ move: t.marginBottom });
						}
					}
				};
			},
			3661: function (e) {
				e.exports = function (e) {
					for (var t = 0, r = 0; r < e.voices.length; r++) {
						var n = e.voices[r].staff;
						e.voices[r].duplicate || ((t += n.top), (t += -n.bottom));
					}
					return t;
				};
			},
			9600: function (e, t, r) {
				var n = r(1409),
					i = r(6020),
					a = r(6658);
				e.exports = function (e, t) {
					var r,
						s = 0;
					e.el_type = 'clef';
					var o = new n(e, 0, 10, 'staff-extra clef', t);
					switch (((o.isClef = !0), e.type)) {
						case 'treble':
							r = 'clefs.G';
							break;
						case 'tenor':
						case 'alto':
							r = 'clefs.C';
							break;
						case 'bass':
							r = 'clefs.F';
							break;
						case 'treble+8':
							(r = 'clefs.G'), (s = 1);
							break;
						case 'tenor+8':
						case 'alto+8':
							(r = 'clefs.C'), (s = 1);
							break;
						case 'bass+8':
							(r = 'clefs.F'), (s = 1);
							break;
						case 'treble-8':
							(r = 'clefs.G'), (s = -1);
							break;
						case 'tenor-8':
						case 'alto-8':
							(r = 'clefs.C'), (s = -1);
							break;
						case 'bass-8':
							(r = 'clefs.F'), (s = -1);
							break;
						case 'none':
							return null;
						case 'perc':
							r = 'clefs.perc';
							break;
						default:
							o.addFixed(new a('clef=' + e.type, 0, 0, void 0, { type: 'debug' }));
					}
					if (r) {
						var c = i.symbolHeightInPitches(r),
							l = (function (e) {
								switch (e) {
									case 'clefs.G':
										return -5;
									case 'clefs.C':
									case 'clefs.F':
										return -4;
									case 'clefs.perc':
										return -2;
									default:
										return 0;
								}
							})(r);
						if (
							(o.addRight(
								new a(r, 5, i.getSymbolWidth(r), e.clefPos, { top: c + e.clefPos + l, bottom: e.clefPos + l })
							),
							0 !== s)
						) {
							var h = 2 / 3,
								u = (i.getSymbolWidth(r) - i.getSymbolWidth('8') * h) / 2,
								d = s > 0 ? o.top + 3 : o.bottom - 1,
								f = s > 0 ? o.top + 3 : o.bottom - 3,
								p = f - 2;
							'bass-8' === e.type && ((d = 3), (u = 0)),
								o.addRight(
									new a('8', 5 + u, i.getSymbolWidth('8') * h, d, { scalex: h, scaley: h, top: f, bottom: p })
								);
						}
					}
					return o;
				};
			},
			3923: function (e, t, r) {
				var n = r(1409),
					i = r(6020),
					a = r(6658);
				e.exports = function (e, t) {
					if (((e.el_type = 'keySignature'), !e.accidentals || 0 === e.accidentals.length)) return null;
					var r = new n(e, 0, 10, 'staff-extra key-signature', t);
					r.isKeySig = !0;
					var s = 0;
					return (
						e.accidentals.forEach(function (e) {
							var t,
								n = 0;
							switch (e.acc) {
								case 'sharp':
									(t = 'accidentals.sharp'), (n = -3);
									break;
								case 'natural':
									t = 'accidentals.nat';
									break;
								case 'flat':
									(t = 'accidentals.flat'), (n = -1.2);
									break;
								case 'quartersharp':
									(t = 'accidentals.halfsharp'), (n = -2.5);
									break;
								case 'quarterflat':
									(t = 'accidentals.halfflat'), (n = -1.2);
									break;
								default:
									t = 'accidentals.flat';
							}
							r.addRight(
								new a(t, s, i.getSymbolWidth(t), e.verticalPos, {
									thickness: i.symbolHeightInPitches(t),
									top: e.verticalPos + i.symbolHeightInPitches(t) + n,
									bottom: e.verticalPos + n
								})
							),
								(s += i.getSymbolWidth(t) + 2);
						}, this),
						r
					);
				};
			},
			2143: function (e, t, r) {
				var n = r(6020),
					i = r(6658);
				e.exports = function (e, t, r, a) {
					a || (a = {});
					var s,
						o = void 0 !== a.dir ? a.dir : null,
						c = void 0 !== a.headx ? a.headx : 0,
						l = void 0 !== a.extrax ? a.extrax : 0,
						h = void 0 !== a.flag ? a.flag : null,
						u = void 0 !== a.dot ? a.dot : 0,
						d = void 0 !== a.dotshiftx ? a.dotshiftx : 0,
						f = void 0 !== a.scale ? a.scale : 1,
						p = void 0 !== a.accidentalSlot ? a.accidentalSlot : [],
						m = void 0 !== a.shouldExtendStem && a.shouldExtendStem,
						g = void 0 === a.printAccidentals || a.printAccidentals,
						v = r.verticalPos,
						b = 0,
						y = 0,
						x = 0;
					if (void 0 === t) e.addFixed(new i('pitch is undefined', 0, 0, 0, { type: 'debug' }));
					else if ('' === t) s = new i(null, 0, 0, v);
					else {
						var w = c;
						if (r.printer_shift) {
							var k = 'same' === r.printer_shift ? 1 : 0;
							w = 'down' === o ? -n.getSymbolWidth(t) * f + k : n.getSymbolWidth(t) * f - k;
						}
						var C = { scalex: f, scaley: f, thickness: n.symbolHeightInPitches(t) * f, name: r.name };
						if ((((s = new i(t, w, n.getSymbolWidth(t) * f, v, C)).stemDir = o), h)) {
							var T = v + ('down' === o ? -7 : 7) * f;
							m && ('down' === o && T > 6 && (T = 6), 'up' === o && T < 6 && (T = 6));
							var _ = 'down' === o ? c : c + s.w - 0.6;
							e.addRight(new i(h, _, n.getSymbolWidth(h) * f, T, { scalex: f, scaley: f }));
						}
						for (y = s.w + d - 2 + 5 * u; u > 0; u--) {
							var S = 1 - (Math.abs(v) % 2);
							e.addRight(new i('dots.dot', s.w + d - 2 + 5 * u, n.getSymbolWidth('dots.dot'), v + S));
						}
					}
					if ((s && (s.highestVert = r.highestVert), g && r.accidental)) {
						var E;
						switch (r.accidental) {
							case 'quartersharp':
								E = 'accidentals.halfsharp';
								break;
							case 'dblsharp':
								E = 'accidentals.dblsharp';
								break;
							case 'sharp':
								E = 'accidentals.sharp';
								break;
							case 'quarterflat':
								E = 'accidentals.halfflat';
								break;
							case 'flat':
								E = 'accidentals.flat';
								break;
							case 'dblflat':
								E = 'accidentals.dblflat';
								break;
							case 'natural':
								E = 'accidentals.nat';
						}
						for (var M = !1, N = l, A = 0; A < p.length; A++)
							if (v - p[A][0] >= 6) {
								(p[A][0] = v), (N = p[A][1]), (M = !0);
								break;
							}
						!1 === M && ((N -= n.getSymbolWidth(E) * f + 2), p.push([v, N]), (b = n.getSymbolWidth(E) * f + 2));
						var B = n.symbolHeightInPitches(E);
						e.addExtra(
							new i(E, N, n.getSymbolWidth(E), v, { scalex: f, scaley: f, top: v + B / 2, bottom: v - B / 2 })
						),
							(x = n.getSymbolWidth(E) / 2);
					}
					return { notehead: s, accidentalshiftx: b, dotshiftx: y, extraLeft: x };
				};
			},
			2525: function (e, t, r) {
				var n = r(1409),
					i = r(6020),
					a = r(6658);
				e.exports = function (e, t) {
					e.el_type = 'timeSignature';
					var r = new n(e, 0, 10, 'staff-extra time-signature', t);
					if ('specified' === e.type)
						for (var s = 0, o = 0; o < e.value.length; o++)
							if (
								(0 !== o &&
									(r.addRight(new a('+', s + 1, i.getSymbolWidth('+'), 6, { thickness: i.symbolHeightInPitches('+') })),
									(s += i.getSymbolWidth('+') + 2)),
								e.value[o].den)
							) {
								for (var c = 0, l = 0; l < e.value[o].num.length; l++) c += i.getSymbolWidth(e.value[o].num[l]);
								var h = 0;
								for (l = 0; l < e.value[o].num.length; l++) h += i.getSymbolWidth(e.value[o].den[l]);
								var u = Math.max(c, h);
								r.addRight(
									new a(e.value[o].num, s + (u - c) / 2, c, 8, {
										thickness: i.symbolHeightInPitches(e.value[o].num[0])
									})
								),
									r.addRight(
										new a(e.value[o].den, s + (u - h) / 2, h, 4, {
											thickness: i.symbolHeightInPitches(e.value[o].den[0])
										})
									),
									(s += u);
							} else {
								for (var d = 0, f = 0; f < e.value[o].num.length; f++) d += i.getSymbolWidth(e.value[o].num[f]);
								r.addRight(new a(e.value[o].num, s, d, 6, { thickness: i.symbolHeightInPitches(e.value[o].num[0]) })),
									(s += d);
							}
					else
						'common_time' === e.type
							? r.addRight(
									new a('timesig.common', 0, i.getSymbolWidth('timesig.common'), 6, {
										thickness: i.symbolHeightInPitches('timesig.common')
									})
							  )
							: 'cut_time' === e.type
							? r.addRight(
									new a('timesig.cut', 0, i.getSymbolWidth('timesig.cut'), 6, {
										thickness: i.symbolHeightInPitches('timesig.cut')
									})
							  )
							: 'tempus_imperfectum' === e.type
							? r.addRight(
									new a('timesig.imperfectum', 0, i.getSymbolWidth('timesig.imperfectum'), 6, {
										thickness: i.symbolHeightInPitches('timesig.imperfectum')
									})
							  )
							: 'tempus_imperfectum_prolatio' === e.type
							? r.addRight(
									new a('timesig.imperfectum2', 0, i.getSymbolWidth('timesig.imperfectum2'), 6, {
										thickness: i.symbolHeightInPitches('timesig.imperfectum2')
									})
							  )
							: 'tempus_perfectum' === e.type
							? r.addRight(
									new a('timesig.perfectum', 0, i.getSymbolWidth('timesig.perfectum'), 6, {
										thickness: i.symbolHeightInPitches('timesig.perfectum')
									})
							  )
							: 'tempus_perfectum_prolatio' === e.type
							? r.addRight(
									new a('timesig.perfectum2', 0, i.getSymbolWidth('timesig.perfectum2'), 6, {
										thickness: i.symbolHeightInPitches('timesig.perfectum2')
									})
							  )
							: console.log('time signature:', e);
					return r;
				};
			},
			8677: function (e, t, r) {
				var n = r(3185),
					i = r(6891),
					a = r(8844),
					s = r(6020),
					o = r(6658),
					c = r(6183),
					l = function () {
						(this.startDiminuendoX = void 0), (this.startCrescendoX = void 0), (this.minTop = 12), (this.minBottom = 0);
					},
					h = function (e, t, r, n, i) {
						function a(e, t) {
							var a =
								'down' === i
									? (function () {
											if (0 === n.heads.length) return 2;
											for (var e = n.heads[0].pitch, t = 1; t < n.heads.length; t++) e = Math.min(e, n.heads[t].pitch);
											return e;
									  })() + 1
									: (function () {
											if (0 === n.heads.length) return 10;
											for (var e = n.heads[0].pitch, t = 1; t < n.heads.length; t++) e = Math.max(e, n.heads[t].pitch);
											return e;
									  })() + 9;
							'down' !== i && 1 === t && a--;
							var c = r / 2;
							c += 'down' === i ? -5 : 3;
							for (var l = 0; l < t; l++) (a -= 1), n.addFixedX(new o(e, c, s.getSymbolWidth(e), a));
						}
						for (var c = 0; c < e.length; c++)
							switch (e[c]) {
								case '/':
									a('flags.ugrace', 1);
									break;
								case '//':
									a('flags.ugrace', 2);
									break;
								case '///':
									a('flags.ugrace', 3);
									break;
								case '////':
									a('flags.ugrace', 4);
							}
					};
				(l.prototype.dynamicDecoration = function (e, t, r, n) {
					for (var s, o, c, l = 0; l < t.length; l++)
						switch (t[l]) {
							case 'diminuendo(':
								(this.startDiminuendoX = r), (s = void 0);
								break;
							case 'diminuendo)':
								(s = { start: this.startDiminuendoX, stop: r }), (this.startDiminuendoX = void 0);
								break;
							case 'crescendo(':
								(this.startCrescendoX = r), (o = void 0);
								break;
							case 'crescendo)':
								(o = { start: this.startCrescendoX, stop: r }), (this.startCrescendoX = void 0);
								break;
							case 'glissando(':
								(this.startGlissandoX = r), (c = void 0);
								break;
							case 'glissando)':
								(c = { start: this.startGlissandoX, stop: r }), (this.startGlissandoX = void 0);
						}
					s && e.addOther(new i(s.start, s.stop, '>', n)),
						o && e.addOther(new i(o.start, o.stop, '<', n)),
						c && e.addOther(new a(c.start, c.stop));
				}),
					(l.prototype.createDecoration = function (e, t, r, i, a, l, u, d, f, p) {
						f ||
							(f = {
								ornamentPosition: 'above',
								volumePosition: p ? 'above' : 'below',
								dynamicPosition: p ? 'above' : 'below'
							}),
							(function (e, t, r, i) {
								for (var a = 0; a < t.length; a++)
									switch (t[a]) {
										case 'p':
										case 'mp':
										case 'pp':
										case 'ppp':
										case 'pppp':
										case 'f':
										case 'ff':
										case 'fff':
										case 'ffff':
										case 'sfz':
										case 'mf':
											var s = new n(r, t[a], i);
											e.addOther(s);
									}
							})(e, t, a, f.volumePosition),
							this.dynamicDecoration(e, t, a, f.dynamicPosition),
							h(t, 0, i, a, u);
						var m = (function (e, t, r, n, i, a, l, h) {
							for (var u, d = 0; d < t.length; d++) {
								if ('staccato' === t[d] || 'tenuto' === t[d] || 'accent' === t[d]) {
									var f = 'scripts.' + t[d];
									if (
										('accent' === t[d] && (f = 'scripts.sforzato'),
										(u = void 0 === u ? ('down' === l ? r + 2 : h - 2) : 'down' === l ? u + 2 : u - 2),
										'accent' === t[d])
									)
										'up' === l ? u-- : u++;
									else
										switch (u) {
											case 2:
											case 4:
											case 6:
											case 8:
											case 10:
												'up' === l ? u-- : u++;
										}
									r > 9 && u++;
									var p = n / 2;
									'center' !== s.getSymbolAlign(f) && (p -= s.getSymbolWidth(f) / 2),
										i.addFixedX(new o(f, p, s.getSymbolWidth(f), u));
								}
								if ('slide' === t[d] && i.heads[0]) {
									var m = i.heads[0].pitch,
										g = new o('', -a - 15, 0, (m -= 2) - 1),
										v = new o('', -a - 5, 0, m + 1);
									i.addFixedX(g), i.addFixedX(v), e.addOther(new c({ anchor1: g, anchor2: v, fixedY: !0 }));
								}
							}
							return void 0 === u && (u = r), { above: u, below: i.bottom };
						})(e, t, r, i, a, l, u, d);
						(m.above = Math.max(m.above, this.minTop)),
							(function (e, t, r, n, i, a, c) {
								function l(e, t) {
									'above' === e ? (n.above += t) : (n.below -= t);
								}
								function h(e) {
									var t;
									return 'above' === e ? (t = n.above) < a && (t = a) : (t = n.below) > c && (t = c), t;
								}
								function u(e, n, i) {
									var a = h(n);
									r.addFixedX(
										new o(e, t / 2, 0, a + 2, { type: 'decoration', klass: 'ornament', thickness: 3, anchor: i })
									),
										l(n, 5);
								}
								function d(e, n) {
									var i = t / 2;
									'center' !== s.getSymbolAlign(e) && (i -= s.getSymbolWidth(e) / 2);
									var a = s.symbolHeightInPitches(e) + 1,
										c = h(n);
									(c = 'above' === n ? c + a / 2 : c - a / 2),
										r.addFixedX(
											new o(e, i, s.getSymbolWidth(e), c, { klass: 'ornament', thickness: s.symbolHeightInPitches(e) })
										),
										l(n, a);
								}
								for (
									var f = {
											'+': 'scripts.stopped',
											open: 'scripts.open',
											snap: 'scripts.snap',
											wedge: 'scripts.wedge',
											thumb: 'scripts.thumb',
											shortphrase: 'scripts.shortphrase',
											mediumphrase: 'scripts.mediumphrase',
											longphrase: 'scripts.longphrase',
											trill: 'scripts.trill',
											roll: 'scripts.roll',
											irishroll: 'scripts.roll',
											marcato: 'scripts.umarcato',
											dmarcato: 'scripts.dmarcato',
											umarcato: 'scripts.umarcato',
											turn: 'scripts.turn',
											uppermordent: 'scripts.prall',
											pralltriller: 'scripts.prall',
											mordent: 'scripts.mordent',
											lowermordent: 'scripts.mordent',
											downbow: 'scripts.downbow',
											upbow: 'scripts.upbow',
											fermata: 'scripts.ufermata',
											invertedfermata: 'scripts.dfermata',
											breath: ',',
											coda: 'scripts.coda',
											segno: 'scripts.segno'
										},
										p = 0;
									p < e.length;
									p++
								)
									switch (e[p]) {
										case '0':
										case '1':
										case '2':
										case '3':
										case '4':
										case '5':
										case 'D.C.':
										case 'D.S.':
											u(e[p], i, 'middle'), !0;
											break;
										case 'D.C.alcoda':
											u('D.C. al coda', i, 'end'), !0;
											break;
										case 'D.C.alfine':
											u('D.C. al fine', i, 'end'), !0;
											break;
										case 'D.S.alcoda':
											u('D.S. al coda', i, 'end'), !0;
											break;
										case 'D.S.alfine':
											u('D.S. al fine', i, 'end'), !0;
											break;
										case 'fine':
											u('FINE', i, 'middle'), !0;
											break;
										case '+':
										case 'open':
										case 'snap':
										case 'wedge':
										case 'thumb':
										case 'shortphrase':
										case 'mediumphrase':
										case 'longphrase':
										case 'trill':
										case 'roll':
										case 'irishroll':
										case 'marcato':
										case 'dmarcato':
										case 'turn':
										case 'uppermordent':
										case 'pralltriller':
										case 'mordent':
										case 'lowermordent':
										case 'downbow':
										case 'upbow':
										case 'fermata':
										case 'breath':
										case 'umarcato':
										case 'coda':
										case 'segno':
											d(f[e[p]], i), !0;
											break;
										case 'invertedfermata':
											d(f[e[p]], 'below'), !0;
											break;
										case 'mark':
											r.klass = 'mark';
									}
							})(t, i, a, m, f.ornamentPosition, this.minTop, this.minBottom),
							(function (e, t, r) {
								for (var n = 0; n < e.length; n++)
									if ('arpeggio' === e[n])
										for (var i = t.abcelem.minpitch - 1; i <= t.abcelem.maxpitch; i += 2)
											t.addExtra(
												new o('scripts.arpeggio', 2 * -s.getSymbolWidth('scripts.arpeggio') - r, 0, i + 2, {
													klass: 'ornament',
													thickness: s.symbolHeightInPitches('scripts.arpeggio')
												})
											);
							})(t, a, l);
					}),
					(e.exports = l);
			},
			1409: function (e, t, r) {
				var n = r(5741),
					i = r(5829),
					a = function (e, t, r, n, i, a) {
						a || (a = {}),
							(this.tuneNumber = i),
							(this.abcelem = e),
							(this.duration = t),
							(this.durationClass = a.durationClassOveride ? a.durationClassOveride : this.duration),
							(this.minspacing = r || 0),
							(this.x = 0),
							(this.children = []),
							(this.heads = []),
							(this.extra = []),
							(this.extraw = 0),
							(this.w = 0),
							(this.right = []),
							(this.invisible = !1),
							(this.bottom = void 0),
							(this.top = void 0),
							(this.type = n),
							(this.fixed = { w: 0, t: void 0, b: void 0 }),
							(this.specialY = {
								tempoHeightAbove: 0,
								partHeightAbove: 0,
								volumeHeightAbove: 0,
								dynamicHeightAbove: 0,
								endingHeightAbove: 0,
								chordHeightAbove: 0,
								lyricHeightAbove: 0,
								lyricHeightBelow: 0,
								chordHeightBelow: 0,
								volumeHeightBelow: 0,
								dynamicHeightBelow: 0
							});
					};
				(a.prototype.getFixedCoords = function () {
					return { x: this.x, w: this.fixed.w, t: this.fixed.t, b: this.fixed.b };
				}),
					(a.prototype.addExtra = function (e) {
						(this.fixed.w = Math.max(this.fixed.w, e.dx + e.w)),
							void 0 === this.fixed.t ? (this.fixed.t = e.top) : (this.fixed.t = Math.max(this.fixed.t, e.top)),
							void 0 === this.fixed.b ? (this.fixed.b = e.bottom) : (this.fixed.b = Math.min(this.fixed.b, e.bottom)),
							e.dx < this.extraw && (this.extraw = e.dx),
							(this.extra[this.extra.length] = e),
							this._addChild(e);
					}),
					(a.prototype.addHead = function (e) {
						e.dx < this.extraw && (this.extraw = e.dx), (this.heads[this.heads.length] = e), this.addRight(e);
					}),
					(a.prototype.addRight = function (e) {
						(this.fixed.w = Math.max(this.fixed.w, e.dx + e.w)),
							void 0 !== e.top &&
								(void 0 === this.fixed.t ? (this.fixed.t = e.top) : (this.fixed.t = Math.max(this.fixed.t, e.top))),
							void 0 !== e.bottom &&
								(void 0 === this.fixed.b
									? (this.fixed.b = e.bottom)
									: (this.fixed.b = Math.min(this.fixed.b, e.bottom))),
							e.dx + e.w > this.w && (this.w = e.dx + e.w),
							(this.right[this.right.length] = e),
							this._addChild(e);
					}),
					(a.prototype.addFixed = function (e) {
						this._addChild(e);
					}),
					(a.prototype.addFixedX = function (e) {
						this._addChild(e);
					}),
					(a.prototype.addCentered = function (e) {
						var t = e.w / 2;
						-t < this.extraw && (this.extraw = -t),
							(this.extra[this.extra.length] = e),
							e.dx + t > this.w && (this.w = e.dx + t),
							(this.right[this.right.length] = e),
							this._addChild(e);
					}),
					(a.prototype.setLimit = function (e, t) {
						t[e] &&
							(this.specialY[e] ? (this.specialY[e] = Math.max(this.specialY[e], t[e])) : (this.specialY[e] = t[e]));
					}),
					(a.prototype._addChild = function (e) {
						(e.parent = this),
							(this.children[this.children.length] = e),
							this.pushTop(e.top),
							this.pushBottom(e.bottom),
							this.setLimit('tempoHeightAbove', e),
							this.setLimit('partHeightAbove', e),
							this.setLimit('volumeHeightAbove', e),
							this.setLimit('dynamicHeightAbove', e),
							this.setLimit('endingHeightAbove', e),
							this.setLimit('chordHeightAbove', e),
							this.setLimit('lyricHeightAbove', e),
							this.setLimit('lyricHeightBelow', e),
							this.setLimit('chordHeightBelow', e),
							this.setLimit('volumeHeightBelow', e),
							this.setLimit('dynamicHeightBelow', e);
					}),
					(a.prototype.pushTop = function (e) {
						void 0 !== e && (void 0 === this.top ? (this.top = e) : (this.top = Math.max(e, this.top)));
					}),
					(a.prototype.pushBottom = function (e) {
						void 0 !== e && (void 0 === this.bottom ? (this.bottom = e) : (this.bottom = Math.min(e, this.bottom)));
					}),
					(a.prototype.setX = function (e) {
						this.x = e;
						for (var t = 0; t < this.children.length; t++) this.children[t].setX(e);
					}),
					(a.prototype.center = function (e, t) {
						var r = (t.x - e.x) / 2 + e.x;
						this.x = r - this.w / 2;
						for (var n = 0; n < this.children.length; n++) this.children[n].setX(this.x);
					}),
					(a.prototype.setHint = function () {
						this.hint = !0;
					}),
					(a.prototype.highlight = function (e, t) {
						n.bind(this)(e, t);
					}),
					(a.prototype.unhighlight = function (e, t) {
						i.bind(this)(e, t);
					}),
					(e.exports = a);
			},
			8491: function (e) {
				var t = function (e, t, r, n) {
					(this.type = 'BeamElem'),
						(this.isflat = !!r),
						(this.isgrace = !(!t || 'grace' !== t)),
						(this.forceup = !!(this.isgrace || (t && 'up' === t))),
						(this.forcedown = !(!t || 'down' !== t)),
						(this.elems = []),
						(this.total = 0),
						(this.average = 6),
						(this.allrests = !0),
						(this.stemHeight = e),
						(this.beams = []),
						n && n.duration
							? ((this.duration = n.duration),
							  n.startTriplet && (this.duration *= n.tripletMultiplier),
							  (this.duration = Math.round(1e3 * this.duration) / 1e3))
							: (this.duration = 0);
				};
				function r(e, t) {
					return t ? e / t : 0;
				}
				(t.prototype.setHint = function () {
					this.hint = !0;
				}),
					(t.prototype.runningDirection = function (e) {
						var t = e.averagepitch;
						void 0 !== t && ((this.total = Math.round(this.total + t)), this.count || (this.count = 0), this.count++);
					}),
					(t.prototype.add = function (e) {
						var t = e.abcelem.averagepitch;
						void 0 !== t &&
							(e.abcelem.rest || (this.allrests = !1),
							(e.beam = this),
							this.elems.push(e),
							(this.total = Math.round(this.total + t)),
							(void 0 === this.min || e.abcelem.minpitch < this.min) && (this.min = e.abcelem.minpitch),
							(void 0 === this.max || e.abcelem.maxpitch > this.max) && (this.max = e.abcelem.maxpitch));
					}),
					(t.prototype.addBeam = function (e) {
						this.beams.push(e);
					}),
					(t.prototype.setStemDirection = function () {
						(this.average = r(this.total, this.count)),
							this.forceup
								? (this.stemsUp = !0)
								: this.forcedown
								? (this.stemsUp = !1)
								: (this.stemsUp = this.average < 6),
							delete this.count,
							(this.total = 0);
					}),
					(t.prototype.calcDir = function () {
						(this.average = r(this.total, this.elems.length)),
							this.forceup
								? (this.stemsUp = !0)
								: this.forcedown
								? (this.stemsUp = !1)
								: (this.stemsUp = this.average < 6);
						for (var e = this.stemsUp ? 'up' : 'down', t = 0; t < this.elems.length; t++)
							for (var n = 0; n < this.elems[t].heads.length; n++) this.elems[t].heads[n].stemDir = e;
					}),
					(e.exports = t);
			},
			9316: function (e, t, r) {
				var n = r(1716);
				function i(e, t, r, n, i, a) {
					(this.rows = []),
						e.unalignedWords && e.unalignedWords.length > 0 && this.unalignedWords(e.unalignedWords, n, i, a),
						this.extraText(e, n, i, a),
						e.footer && r && this.footer(e.footer, t, n, a);
				}
				(i.prototype.unalignedWords = function (e, t, r, i) {
					var a = 'meta-bottom unaligned-words',
						s = 'wordsfont';
					this.rows.push({
						startGroup: 'unalignedWords',
						klass: 'abcjs-meta-bottom abcjs-unaligned-words',
						name: 'words'
					});
					var o = i.calc('i', s, a);
					this.rows.push({ move: r.words });
					for (var c = 0; c < e.length; c++)
						if ('' === e[c]) this.rows.push({ move: o.height });
						else if ('string' == typeof e[c])
							n(this.rows, { marginLeft: t, text: e[c], font: s, klass: a, inGroup: !0, name: 'words' }, i);
						else {
							for (var l = 0, h = 0, u = 0; u < e[c].length; u++) {
								var d = e[c][u],
									f = d.font ? d.font : s;
								this.rows.push({ left: t + h, text: d.text, font: f, anchor: 'start' });
								var p = i.calc(d.text, s, a);
								(l = Math.max(l, p.height)), (h += p.width), ' ' === d.text[d.text.length - 1] && (h += o.width);
							}
							this.rows.push({ move: l });
						}
					this.rows.push({ move: 2 * o.height }),
						this.rows.push({
							endGroup: 'unalignedWords',
							absElemType: 'unalignedWords',
							startChar: -1,
							endChar: -1,
							name: 'unalignedWords'
						});
				}),
					(i.prototype.extraText = function (e, t, r, i) {
						var a = '';
						e.book && (a += 'Book: ' + e.book + '\n'),
							e.source && (a += 'Source: ' + e.source + '\n'),
							e.discography && (a += 'Discography: ' + e.discography + '\n'),
							e.notes && (a += 'Notes: ' + e.notes + '\n'),
							e.transcription && (a += 'Transcription: ' + e.transcription + '\n'),
							e.history && (a += 'History: ' + e.history + '\n'),
							e['abc-copyright'] && (a += 'Copyright: ' + e['abc-copyright'] + '\n'),
							e['abc-creator'] && (a += 'Creator: ' + e['abc-creator'] + '\n'),
							e['abc-edited-by'] && (a += 'Edited By: ' + e['abc-edited-by'] + '\n'),
							a.length > 0 &&
								n(
									this.rows,
									{
										marginLeft: t,
										text: a,
										font: 'historyfont',
										klass: 'meta-bottom extra-text',
										marginTop: r.info,
										absElemType: 'extraText',
										name: 'description'
									},
									i
								);
					}),
					(i.prototype.footer = function (e, t, r, i) {
						var a = 'header meta-bottom',
							s = 'footerfont';
						this.rows.push({ startGroup: 'footer', klass: a }),
							n(this.rows, { marginLeft: r, text: e.left, font: s, klass: a, name: 'footer' }, i),
							n(
								this.rows,
								{ marginLeft: r + t / 2, text: e.center, font: s, klass: a, anchor: 'middle', name: 'footer' },
								i
							),
							n(this.rows, { marginLeft: r + t, text: e.right, font: s, klass: a, anchor: 'end', name: 'footer' }, i);
					}),
					(e.exports = i);
			},
			5224: function (e) {
				var t = function (e, t) {
					(this.startVoice = e), (this.type = t);
				};
				(t.prototype.setBottomStaff = function (e) {
					(this.endVoice = e),
						this.startVoice.header &&
							!this.endVoice.header &&
							((this.header = this.startVoice.header), delete this.startVoice.header);
				}),
					(t.prototype.continuing = function (e) {
						this.lastContinuedVoice = e;
					}),
					(t.prototype.getWidth = function () {
						return 10;
					}),
					(t.prototype.isStartVoice = function (e) {
						return !!(
							this.startVoice &&
							this.startVoice.staff &&
							this.startVoice.staff.voices.length > 0 &&
							this.startVoice.staff.voices[0] === e
						);
					}),
					(e.exports = t);
			},
			6891: function (e) {
				e.exports = function (e, t, r, n) {
					(this.type = 'CrescendoElem'),
						(this.anchor1 = e),
						(this.anchor2 = t),
						(this.dir = r),
						'above' === n ? (this.dynamicHeightAbove = 6) : (this.dynamicHeightBelow = 6),
						(this.pitch = void 0);
				};
			},
			3185: function (e) {
				e.exports = function (e, t, r) {
					(this.type = 'DynamicDecoration'),
						(this.anchor = e),
						(this.dec = t),
						'below' === r ? (this.volumeHeightBelow = 6) : (this.volumeHeightAbove = 6),
						(this.pitch = void 0);
				};
			},
			8256: function (e) {
				e.exports = function (e, t, r) {
					(this.type = 'EndingElem'),
						(this.text = e),
						(this.anchor1 = t),
						(this.anchor2 = r),
						(this.endingHeightAbove = 5),
						(this.pitch = void 0);
				};
			},
			3736: function (e) {
				e.exports = function (e, t, r, n, i, a) {
					var s,
						o = e.text;
					(this.rows = []), t && this.rows.push({ move: t });
					var c = r.calc('textfont', 'defined-text');
					if ('' === o) this.rows.push({ move: 2 * c.attr['font-size'] });
					else if ('string' == typeof o)
						this.rows.push({ move: c.attr['font-size'] / 2 }),
							this.rows.push({
								left: n,
								text: o,
								font: 'textfont',
								klass: 'defined-text',
								anchor: 'start',
								startChar: e.startChar,
								endChar: e.endChar,
								absElemType: 'freeText',
								name: 'free-text'
							}),
							(s = a.calc(o, 'textfont', 'defined-text')),
							this.rows.push({ move: s.height });
					else if (o) {
						for (var l = 0, h = n, u = 'textfont', d = 0; d < o.length; d++)
							(u = o[d].font ? o[d].font : 'textfont'),
								this.rows.push({
									left: h,
									text: o[d].text,
									font: u,
									klass: 'defined-text',
									anchor: 'start',
									startChar: e.startChar,
									endChar: e.endChar,
									absElemType: 'freeText',
									name: 'free-text'
								}),
								(h += (s = a.calc(o[d].text, r.calc(u, 'defined-text').font, 'defined-text')).width + s.height / 2),
								(l = Math.max(l, s.height));
						this.rows.push({ move: l });
					} else if (1 === e.length) {
						var f = i / 2;
						this.rows.push({
							left: f,
							text: e[0].text,
							font: 'textfont',
							klass: 'defined-text',
							anchor: 'middle',
							startChar: e.startChar,
							endChar: e.endChar,
							absElemType: 'freeText',
							name: 'free-text'
						}),
							(s = a.calc(e[0].text, 'textfont', 'defined-text')),
							this.rows.push({ move: s.height });
					}
				};
			},
			8844: function (e) {
				e.exports = function (e, t) {
					(this.type = 'GlissandoElem'), (this.anchor1 = e), (this.anchor2 = t);
				};
			},
			6658: function (e) {
				var t = function (e, t, r, n, i) {
					switch (
						((i = i || {}),
						(this.x = 0),
						(this.c = e),
						(this.dx = t),
						(this.w = r),
						(this.pitch = n),
						(this.scalex = i.scalex || 1),
						(this.scaley = i.scaley || 1),
						(this.type = i.type || 'symbol'),
						(this.pitch2 = i.pitch2),
						(this.linewidth = i.linewidth),
						(this.klass = i.klass),
						(this.anchor = i.anchor ? i.anchor : 'middle'),
						(this.top = n),
						void 0 !== this.pitch2 && this.pitch2 > this.top && (this.top = this.pitch2),
						(this.bottom = n),
						void 0 !== this.pitch2 && this.pitch2 < this.bottom && (this.bottom = this.pitch2),
						i.thickness && ((this.top += i.thickness / 2), (this.bottom -= i.thickness / 2)),
						i.stemHeight && (i.stemHeight > 0 ? (this.top += i.stemHeight) : (this.bottom += i.stemHeight)),
						i.dim && (this.dim = i.dim),
						i.position && (this.position = i.position),
						(this.height = i.height ? i.height : 4),
						i.top && (this.top = i.top),
						i.bottom && (this.bottom = i.bottom),
						i.name ? (this.name = i.name) : this.c ? (this.name = this.c) : (this.name = this.type),
						i.realWidth ? (this.realWidth = i.realWidth) : (this.realWidth = this.w),
						(this.centerVertically = !1),
						this.type)
					) {
						case 'debug':
							this.chordHeightAbove = this.height;
							break;
						case 'lyric':
							i.position && 'below' === i.position
								? (this.lyricHeightBelow = this.height)
								: (this.lyricHeightAbove = this.height);
							break;
						case 'chord':
							i.position && 'below' === i.position
								? (this.chordHeightBelow = this.height)
								: (this.chordHeightAbove = this.height);
							break;
						case 'text':
							void 0 === this.pitch
								? i.position && 'below' === i.position
									? (this.chordHeightBelow = this.height)
									: (this.chordHeightAbove = this.height)
								: (this.centerVertically = !0);
							break;
						case 'part':
							this.partHeightAbove = this.height;
					}
				};
				(t.prototype.getChordDim = function () {
					if ('debug' === this.type) return null;
					if (!this.chordHeightAbove && !this.chordHeightBelow) return null;
					var e = 'chord' === this.type ? this.realWidth / 2 : 0,
						t = this.x - e - 0;
					return { left: t, right: t + this.realWidth + 0 };
				}),
					(t.prototype.invertLane = function (e) {
						void 0 === this.lane && (this.lane = 0), (this.lane = e - this.lane - 1);
					}),
					(t.prototype.putChordInLane = function (e) {
						(this.lane = e),
							this.chordHeightAbove
								? (this.chordHeightAbove = 1.25 * this.height * this.lane)
								: (this.chordHeightBelow = 1.25 * this.height * this.lane);
					}),
					(t.prototype.getLane = function () {
						return void 0 === this.lane ? 0 : this.lane;
					}),
					(t.prototype.setX = function (e) {
						this.x = e + this.dx;
					}),
					(e.exports = t);
			},
			5588: function (e) {
				e.exports = function (e, t, r) {
					(this.rows = []),
						e && this.rows.push({ move: e }),
						this.rows.push({ separator: t, absElemType: 'separator' }),
						r && this.rows.push({ move: r });
				};
			},
			7398: function (e, t, r) {
				var n = r(3661),
					i = function (e) {
						(this.getTextSize = e),
							(this.voices = []),
							(this.staffs = []),
							(this.brace = void 0),
							(this.bracket = void 0);
					};
				(i.prototype.setLimit = function (e, t) {
					t.specialY[e] &&
						(t.staff.specialY[e]
							? (t.staff.specialY[e] = Math.max(t.staff.specialY[e], t.specialY[e]))
							: (t.staff.specialY[e] = t.specialY[e]));
				}),
					(i.prototype.addVoice = function (e, t, r) {
						var n = this.voices.length;
						(this.voices[n] = e),
							this.staffs[t]
								? this.staffs[t].voices.push(n)
								: (this.staffs[this.staffs.length] = {
										top: 10,
										bottom: 2,
										lines: r,
										voices: [n],
										specialY: {
											tempoHeightAbove: 0,
											partHeightAbove: 0,
											volumeHeightAbove: 0,
											dynamicHeightAbove: 0,
											endingHeightAbove: 0,
											chordHeightAbove: 0,
											lyricHeightAbove: 0,
											lyricHeightBelow: 0,
											chordHeightBelow: 0,
											volumeHeightBelow: 0,
											dynamicHeightBelow: 0
										}
								  }),
							(e.staff = this.staffs[t]);
					}),
					(i.prototype.setHeight = function () {
						this.height = n(this);
					}),
					(i.prototype.setWidth = function (e) {
						this.w = e;
						for (var t = 0; t < this.voices.length; t++) this.voices[t].setWidth(e);
					}),
					(i.prototype.setStaffLimits = function (e) {
						(e.staff.top = Math.max(e.staff.top, e.top)),
							(e.staff.bottom = Math.min(e.staff.bottom, e.bottom)),
							this.setLimit('tempoHeightAbove', e),
							this.setLimit('partHeightAbove', e),
							this.setLimit('volumeHeightAbove', e),
							this.setLimit('dynamicHeightAbove', e),
							this.setLimit('endingHeightAbove', e),
							this.setLimit('chordHeightAbove', e),
							this.setLimit('lyricHeightAbove', e),
							this.setLimit('lyricHeightBelow', e),
							this.setLimit('chordHeightBelow', e),
							this.setLimit('volumeHeightBelow', e),
							this.setLimit('dynamicHeightBelow', e);
					}),
					(e.exports = i);
			},
			4726: function (e) {
				e.exports = function (e, t, r, n, i, a) {
					(this.rows = []), e && this.rows.push({ move: e });
					var s = t.titleleft ? 'start' : 'middle',
						o = t.titleleft ? i : n;
					this.rows.push({
						left: o,
						text: r.text,
						font: 'subtitlefont',
						klass: 'text subtitle',
						anchor: s,
						startChar: r.startChar,
						endChar: r.endChar,
						absElemType: 'subtitle',
						name: 'subtitle'
					});
					var c = a.calc(r.text, 'subtitlefont', 'text subtitle');
					this.rows.push({ move: c.height });
				};
			},
			1106: function (e, t, r) {
				var n = r(1409),
					i = r(6658),
					a = function (e, t, r) {
						(this.type = 'TempoElement'),
							(this.tempo = e),
							(this.tempo.type = 'tempo'),
							(this.tuneNumber = t),
							(this.totalHeightInPitches = 6),
							(this.tempoHeightAbove = this.totalHeightInPitches),
							(this.pitch = void 0),
							this.tempo.duration && !this.tempo.suppressBpm && (this.note = this.createNote(r, e, t));
					};
				(a.prototype.setX = function (e) {
					this.x = e;
				}),
					(a.prototype.createNote = function (e, t, r) {
						var a,
							s,
							o,
							c = 0.75,
							l = t.duration[0],
							h = new n(t, l, 1, 'tempo', r);
						l <= 1 / 32
							? ((o = 'noteheads.quarter'), (s = 'flags.u32nd'), (a = 0))
							: l <= 1 / 16
							? ((o = 'noteheads.quarter'), (s = 'flags.u16th'), (a = 0))
							: l <= 3 / 32
							? ((o = 'noteheads.quarter'), (s = 'flags.u16nd'), (a = 1))
							: l <= 1 / 8
							? ((o = 'noteheads.quarter'), (s = 'flags.u8th'), (a = 0))
							: l <= 3 / 16
							? ((o = 'noteheads.quarter'), (s = 'flags.u8th'), (a = 1))
							: l <= 1 / 4
							? ((o = 'noteheads.quarter'), (a = 0))
							: l <= 3 / 8
							? ((o = 'noteheads.quarter'), (a = 1))
							: l <= 0.5
							? ((o = 'noteheads.half'), (a = 0))
							: l <= 3 / 4
							? ((o = 'noteheads.half'), (a = 1))
							: l <= 1
							? ((o = 'noteheads.whole'), (a = 0))
							: l <= 1.5
							? ((o = 'noteheads.whole'), (a = 1))
							: l <= 2
							? ((o = 'noteheads.dbl'), (a = 0))
							: ((o = 'noteheads.dbl'), (a = 1));
						var u,
							d = e(h, o, { verticalPos: 0 }, { dir: 'up', flag: s, dot: a, scale: c }).notehead;
						if ((h.addHead(d), 'noteheads.whole' !== o && 'noteheads.dbl' !== o)) {
							var f = d.dx + d.w;
							(u = new i(null, f, 0, 0.25, { type: 'stem', pitch2: 3.75, linewidth: -0.6 })), h.addRight(u);
						}
						return h;
					}),
					(e.exports = a);
			},
			6183: function (e) {
				var t = function (e) {
					(this.type = 'TieElem'),
						(this.anchor1 = e.anchor1),
						(this.anchor2 = e.anchor2),
						e.isGrace && (this.isGrace = !0),
						e.fixedY && (this.fixedY = !0),
						e.stemDir && (this.stemDir = e.stemDir),
						void 0 !== e.voiceNumber && (this.voiceNumber = e.voiceNumber),
						void 0 !== e.style && (this.dotted = !0),
						(this.internalNotes = []);
				};
				(t.prototype.addInternalNote = function (e) {
					this.internalNotes.push(e);
				}),
					(t.prototype.setEndAnchor = function (e) {
						(this.anchor2 = e),
							this.anchor1
								? ((this.top = Math.max(this.anchor1.pitch, this.anchor2.pitch) + 4),
								  (this.bottom = Math.min(this.anchor1.pitch, this.anchor2.pitch) - 4))
								: ((this.top = this.anchor2.pitch + 4), (this.bottom = this.anchor2.pitch - 4));
					}),
					(t.prototype.setStartX = function (e) {
						this.startLimitX = e;
					}),
					(t.prototype.setEndX = function (e) {
						this.endLimitX = e;
					}),
					(t.prototype.setHint = function () {
						this.hint = !0;
					}),
					(t.prototype.calcTieDirection = function () {
						if (this.isGrace) this.above = !1;
						else if (0 === this.voiceNumber) this.above = !0;
						else if (this.voiceNumber > 0) this.above = !1;
						else {
							var e;
							(e = this.anchor1 ? this.anchor1.pitch : this.anchor2 ? this.anchor2.pitch : 14),
								this.anchor1 && 'down' === this.anchor1.stemDir && this.anchor2 && 'down' === this.anchor2.stemDir
									? (this.above = !0)
									: this.anchor1 && 'up' === this.anchor1.stemDir && this.anchor2 && 'up' === this.anchor2.stemDir
									? (this.above = !1)
									: this.anchor1 && this.anchor2
									? (this.above = e >= 6)
									: this.anchor1
									? (this.above = 'down' === this.anchor1.stemDir)
									: this.anchor2
									? (this.above = 'down' === this.anchor2.stemDir)
									: (this.above = e >= 6);
						}
					}),
					(t.prototype.calcSlurDirection = function () {
						if (this.isGrace) this.above = !1;
						else if (0 === this.voiceNumber) this.above = !0;
						else if (this.voiceNumber > 0) this.above = !1;
						else {
							var e = !1;
							this.anchor1 && 'down' === this.anchor1.stemDir && (e = !0),
								this.anchor2 && 'down' === this.anchor2.stemDir && (e = !0);
							for (var t = 0; t < this.internalNotes.length; t++) 'down' === this.internalNotes[t].stemDir && (e = !0);
							this.above = e;
						}
					}),
					(t.prototype.calcX = function (e, t) {
						this.anchor1
							? ((this.startX = this.anchor1.x), this.anchor1.scalex < 1 && (this.startX -= 3))
							: this.startLimitX
							? (this.startX = this.startLimitX.x + this.startLimitX.w)
							: this.anchor2
							? (this.startX = this.anchor2.x - 20)
							: (this.startX = e),
							!this.anchor1 && this.dotted && (this.startX -= 3),
							this.anchor2
								? (this.endX = this.anchor2.x)
								: this.endLimitX
								? (this.endX = this.endLimitX.x)
								: (this.endX = t);
					}),
					(t.prototype.calcTieY = function () {
						this.anchor1
							? (this.startY = this.anchor1.pitch)
							: this.anchor2
							? (this.startY = this.anchor2.pitch)
							: (this.startY = this.above ? 14 : 0),
							this.anchor2
								? (this.endY = this.anchor2.pitch)
								: this.anchor1
								? (this.endY = this.anchor1.pitch)
								: (this.endY = this.above ? 14 : 0);
					}),
					(t.prototype.calcSlurY = function () {
						if (this.anchor1 && this.anchor2) {
							this.above && 'up' === this.anchor1.stemDir && !this.fixedY
								? ((this.startY = (this.anchor1.highestVert + this.anchor1.pitch) / 2),
								  (this.startX += this.anchor1.w / 2))
								: (this.startY = this.anchor1.pitch);
							var e =
									this.anchor2.parent.beam &&
									this.anchor2.parent.beam.stemsUp &&
									this.anchor2.parent.beam.elems[0] !== this.anchor2.parent,
								t = (this.anchor2.highestVert + this.anchor2.pitch) / 2;
							this.above && 'up' === this.anchor2.stemDir && !this.fixedY && !e && t < this.startY
								? ((this.endY = t), (this.endX += Math.round(this.anchor2.w / 2)))
								: (this.endY = this.above && e ? this.anchor2.highestVert : this.anchor2.pitch);
						} else
							this.anchor1
								? (this.startY = this.endY = this.anchor1.pitch)
								: this.anchor2
								? (this.startY = this.endY = this.anchor2.pitch)
								: ((this.startY = this.above ? 14 : 0), (this.endY = this.above ? 14 : 0));
					}),
					(t.prototype.avoidCollisionAbove = function () {
						if (this.above) {
							for (var e = -50, t = 0; t < this.internalNotes.length; t++)
								this.internalNotes[t].highestVert > e && (e = this.internalNotes[t].highestVert);
							e > this.startY && e > this.endY && (this.startY = this.endY = e - 1);
						}
					}),
					(e.exports = t);
			},
			1134: function (e, t, r) {
				var n = r(1716);
				e.exports = function (e, t, r, i, a, s, o, c, l) {
					if (((this.rows = []), e.header && s)) {
						var h = l.calc('X', 'headerfont', 'abcjs-header abcjs-meta-top').height;
						n(
							this.rows,
							{
								marginLeft: o,
								text: e.header.left,
								font: 'headerfont',
								klass: 'header meta-top',
								marginTop: -h,
								info: t.header,
								name: 'header'
							},
							l
						),
							n(
								this.rows,
								{
									marginLeft: o + a / 2,
									text: e.header.center,
									font: 'headerfont',
									klass: 'header meta-top',
									marginTop: -h,
									anchor: 'middle',
									info: t.header,
									name: 'header'
								},
								l
							),
							n(
								this.rows,
								{
									marginLeft: o + a,
									text: e.header.right,
									font: 'headerfont',
									klass: 'header meta-top',
									marginTop: -h,
									anchor: 'end',
									info: t.header,
									name: 'header'
								},
								l
							);
					}
					s && this.rows.push({ move: c.top });
					var u = r.titleleft ? 'start' : 'middle',
						d = r.titleleft ? o : o + a / 2;
					if (
						(e.title &&
							n(
								this.rows,
								{
									marginLeft: d,
									text: e.title,
									font: 'titlefont',
									klass: 'title meta-top',
									marginTop: c.title,
									anchor: u,
									absElemType: 'title',
									info: t.title,
									name: 'title'
								},
								l
							),
						i.length)
					)
						for (var f = 0; f < i.length && i[f].subtitle; )
							n(
								this.rows,
								{
									marginLeft: d,
									text: i[f].subtitle.text,
									font: 'subtitlefont',
									klass: 'text meta-top subtitle',
									marginTop: c.subtitle,
									anchor: u,
									absElemType: 'subtitle',
									info: i[f].subtitle,
									name: 'subtitle'
								},
								l
							),
								f++;
					if (e.rhythm || e.origin || e.composer) {
						if ((this.rows.push({ move: c.composer }), e.rhythm && e.rhythm.length > 0)) {
							var p = !(!e.composer && !e.origin);
							n(
								this.rows,
								{
									marginLeft: o,
									text: e.rhythm,
									font: 'infofont',
									klass: 'meta-top rhythm',
									absElemType: 'rhythm',
									noMove: p,
									info: t.rhythm,
									name: 'rhythm'
								},
								l
							);
						}
						var m = '';
						e.composer && (m += e.composer),
							e.origin && (m += ' (' + e.origin + ')'),
							m.length > 0 &&
								n(
									this.rows,
									{
										marginLeft: o + a,
										text: m,
										font: 'composerfont',
										klass: 'meta-top composer',
										anchor: 'end',
										absElemType: 'composer',
										info: t.composer,
										name: 'composer'
									},
									l
								);
					}
					e.author &&
						e.author.length > 0 &&
						n(
							this.rows,
							{
								marginLeft: o + a,
								text: e.author,
								font: 'composerfont',
								klass: 'meta-top author',
								anchor: 'end',
								absElemType: 'author',
								info: t.author,
								name: 'author'
							},
							l
						),
						e.partOrder &&
							e.partOrder.length > 0 &&
							n(
								this.rows,
								{
									marginLeft: o,
									text: e.partOrder,
									font: 'partsfont',
									klass: 'meta-top part-order',
									absElemType: 'partOrder',
									info: t.partOrder,
									name: 'part-order'
								},
								l
							);
				};
			},
			2096: function (e) {
				var t = function (e, t, r) {
					(this.type = 'TripletElem'),
						(this.anchor1 = t),
						(this.number = e),
						(this.durationClass = ('d' + Math.round(1e3 * t.parent.durationClass) / 1e3).replace(/\./, '-')),
						(this.middleElems = []),
						(this.flatBeams = r.flatBeams);
				};
				(t.prototype.isClosed = function () {
					return !!this.anchor2;
				}),
					(t.prototype.middleNote = function (e) {
						this.middleElems.push(e);
					}),
					(t.prototype.setCloseAnchor = function (e) {
						(this.anchor2 = e),
							(this.anchor1.parent.beam && 'up' !== this.anchor1.stemDir) || (this.endingHeightAbove = 4);
					}),
					(e.exports = t);
			},
			3197: function (e) {
				var t = function (e, t) {
					(this.children = []),
						(this.beams = []),
						(this.otherchildren = []),
						(this.w = 0),
						(this.duplicate = !1),
						(this.voicenumber = e),
						(this.voicetotal = t),
						(this.bottom = 7),
						(this.top = 7),
						(this.specialY = {
							tempoHeightAbove: 0,
							partHeightAbove: 0,
							volumeHeightAbove: 0,
							dynamicHeightAbove: 0,
							endingHeightAbove: 0,
							chordHeightAbove: 0,
							lyricHeightAbove: 0,
							lyricHeightBelow: 0,
							chordHeightBelow: 0,
							volumeHeightBelow: 0,
							dynamicHeightBelow: 0
						});
				};
				(t.prototype.addChild = function (e) {
					if ('bar' === e.type) {
						for (var t = !0, r = 0; t && r < this.children.length; r++)
							this.children[r].type.indexOf('staff-extra') < 0 && 'tempo' !== this.children[r].type && (t = !1);
						t || (this.beams.push('bar'), this.otherchildren.push('bar'));
					}
					(this.children[this.children.length] = e), this.setRange(e);
				}),
					(t.prototype.setLimit = function (e, t) {
						var r = t.specialY;
						r || (r = t),
							r[e] &&
								(this.specialY[e] ? (this.specialY[e] = Math.max(this.specialY[e], r[e])) : (this.specialY[e] = r[e]));
					}),
					(t.prototype.adjustRange = function (e) {
						void 0 !== e.bottom && (this.bottom = Math.min(this.bottom, e.bottom)),
							void 0 !== e.top && (this.top = Math.max(this.top, e.top));
					}),
					(t.prototype.setRange = function (e) {
						this.adjustRange(e),
							this.setLimit('tempoHeightAbove', e),
							this.setLimit('partHeightAbove', e),
							this.setLimit('volumeHeightAbove', e),
							this.setLimit('dynamicHeightAbove', e),
							this.setLimit('endingHeightAbove', e),
							this.setLimit('chordHeightAbove', e),
							this.setLimit('lyricHeightAbove', e),
							this.setLimit('lyricHeightBelow', e),
							this.setLimit('chordHeightBelow', e),
							this.setLimit('volumeHeightBelow', e),
							this.setLimit('dynamicHeightBelow', e);
					}),
					(t.prototype.addOther = function (e) {
						this.otherchildren.push(e), this.setRange(e);
					}),
					(t.prototype.addBeam = function (e) {
						this.beams.push(e);
					}),
					(t.prototype.setWidth = function (e) {
						this.w = e;
					}),
					(e.exports = t);
			},
			6020: function (e, t, r) {
				var n = r(4331),
					i = {
						0: {
							d: [
								['M', 4.83, -14.97],
								['c', 0.33, -0.03, 1.11, 0, 1.47, 0.06],
								['c', 1.68, 0.36, 2.97, 1.59, 3.78, 3.6],
								['c', 1.2, 2.97, 0.81, 6.96, -0.9, 9.27],
								['c', -0.78, 1.08, -1.71, 1.71, -2.91, 1.95],
								['c', -0.45, 0.09, -1.32, 0.09, -1.77, 0],
								['c', -0.81, -0.18, -1.47, -0.51, -2.07, -1.02],
								['c', -2.34, -2.07, -3.15, -6.72, -1.74, -10.2],
								['c', 0.87, -2.16, 2.28, -3.42, 4.14, -3.66],
								['z'],
								['m', 1.11, 0.87],
								['c', -0.21, -0.06, -0.69, -0.09, -0.87, -0.06],
								['c', -0.54, 0.12, -0.87, 0.42, -1.17, 0.99],
								['c', -0.36, 0.66, -0.51, 1.56, -0.6, 3],
								['c', -0.03, 0.75, -0.03, 4.59, 0, 5.31],
								['c', 0.09, 1.5, 0.27, 2.4, 0.6, 3.06],
								['c', 0.24, 0.48, 0.57, 0.78, 0.96, 0.9],
								['c', 0.27, 0.09, 0.78, 0.09, 1.05, 0],
								['c', 0.39, -0.12, 0.72, -0.42, 0.96, -0.9],
								['c', 0.33, -0.66, 0.51, -1.56, 0.6, -3.06],
								['c', 0.03, -0.72, 0.03, -4.56, 0, -5.31],
								['c', -0.09, -1.47, -0.27, -2.37, -0.6, -3.03],
								['c', -0.24, -0.48, -0.54, -0.78, -0.93, -0.9],
								['z']
							],
							w: 10.78,
							h: 14.959
						},
						1: {
							d: [
								['M', 3.3, -15.06],
								['c', 0.06, -0.06, 0.21, -0.03, 0.66, 0.15],
								['c', 0.81, 0.39, 1.08, 0.39, 1.83, 0.03],
								['c', 0.21, -0.09, 0.39, -0.15, 0.42, -0.15],
								['c', 0.12, 0, 0.21, 0.09, 0.27, 0.21],
								['c', 0.06, 0.12, 0.06, 0.33, 0.06, 5.94],
								['c', 0, 3.93, 0, 5.85, 0.03, 6.03],
								['c', 0.06, 0.36, 0.15, 0.69, 0.27, 0.96],
								['c', 0.36, 0.75, 0.93, 1.17, 1.68, 1.26],
								['c', 0.3, 0.03, 0.39, 0.09, 0.39, 0.3],
								['c', 0, 0.15, -0.03, 0.18, -0.09, 0.24],
								['c', -0.06, 0.06, -0.09, 0.06, -0.48, 0.06],
								['c', -0.42, 0, -0.69, -0.03, -2.1, -0.24],
								['c', -0.9, -0.15, -1.77, -0.15, -2.67, 0],
								['c', -1.41, 0.21, -1.68, 0.24, -2.1, 0.24],
								['c', -0.39, 0, -0.42, 0, -0.48, -0.06],
								['c', -0.06, -0.06, -0.06, -0.09, -0.06, -0.24],
								['c', 0, -0.21, 0.06, -0.27, 0.36, -0.3],
								['c', 0.75, -0.09, 1.32, -0.51, 1.68, -1.26],
								['c', 0.12, -0.27, 0.21, -0.6, 0.27, -0.96],
								['c', 0.03, -0.18, 0.03, -1.59, 0.03, -4.29],
								['c', 0, -3.87, 0, -4.05, -0.06, -4.14],
								['c', -0.09, -0.15, -0.18, -0.24, -0.39, -0.24],
								['c', -0.12, 0, -0.15, 0.03, -0.21, 0.06],
								['c', -0.03, 0.06, -0.45, 0.99, -0.96, 2.13],
								['c', -0.48, 1.14, -0.9, 2.1, -0.93, 2.16],
								['c', -0.06, 0.15, -0.21, 0.24, -0.33, 0.24],
								['c', -0.24, 0, -0.42, -0.18, -0.42, -0.39],
								['c', 0, -0.06, 3.27, -7.62, 3.33, -7.74],
								['z']
							],
							w: 8.94,
							h: 15.058
						},
						2: {
							d: [
								['M', 4.23, -14.97],
								['c', 0.57, -0.06, 1.68, 0, 2.34, 0.18],
								['c', 0.69, 0.18, 1.5, 0.54, 2.01, 0.9],
								['c', 1.35, 0.96, 1.95, 2.25, 1.77, 3.81],
								['c', -0.15, 1.35, -0.66, 2.34, -1.68, 3.15],
								['c', -0.6, 0.48, -1.44, 0.93, -3.12, 1.65],
								['c', -1.32, 0.57, -1.8, 0.81, -2.37, 1.14],
								['c', -0.57, 0.33, -0.57, 0.33, -0.24, 0.27],
								['c', 0.39, -0.09, 1.26, -0.09, 1.68, 0],
								['c', 0.72, 0.15, 1.41, 0.45, 2.1, 0.9],
								['c', 0.99, 0.63, 1.86, 0.87, 2.55, 0.75],
								['c', 0.24, -0.06, 0.42, -0.15, 0.57, -0.3],
								['c', 0.12, -0.09, 0.3, -0.42, 0.3, -0.51],
								['c', 0, -0.09, 0.12, -0.21, 0.24, -0.24],
								['c', 0.18, -0.03, 0.39, 0.12, 0.39, 0.3],
								['c', 0, 0.12, -0.15, 0.57, -0.3, 0.87],
								['c', -0.54, 1.02, -1.56, 1.74, -2.79, 2.01],
								['c', -0.42, 0.09, -1.23, 0.09, -1.62, 0.03],
								['c', -0.81, -0.18, -1.32, -0.45, -2.01, -1.11],
								['c', -0.45, -0.45, -0.63, -0.57, -0.96, -0.69],
								['c', -0.84, -0.27, -1.89, 0.12, -2.25, 0.9],
								['c', -0.12, 0.21, -0.21, 0.54, -0.21, 0.72],
								['c', 0, 0.12, -0.12, 0.21, -0.27, 0.24],
								['c', -0.15, 0, -0.27, -0.03, -0.33, -0.15],
								['c', -0.09, -0.21, 0.09, -1.08, 0.33, -1.71],
								['c', 0.24, -0.66, 0.66, -1.26, 1.29, -1.89],
								['c', 0.45, -0.45, 0.9, -0.81, 1.92, -1.56],
								['c', 1.29, -0.93, 1.89, -1.44, 2.34, -1.98],
								['c', 0.87, -1.05, 1.26, -2.19, 1.2, -3.63],
								['c', -0.06, -1.29, -0.39, -2.31, -0.96, -2.91],
								['c', -0.36, -0.33, -0.72, -0.51, -1.17, -0.54],
								['c', -0.84, -0.03, -1.53, 0.42, -1.59, 1.05],
								['c', -0.03, 0.33, 0.12, 0.6, 0.57, 1.14],
								['c', 0.45, 0.54, 0.54, 0.87, 0.42, 1.41],
								['c', -0.15, 0.63, -0.54, 1.11, -1.08, 1.38],
								['c', -0.63, 0.33, -1.2, 0.33, -1.83, 0],
								['c', -0.24, -0.12, -0.33, -0.18, -0.54, -0.39],
								['c', -0.18, -0.18, -0.27, -0.3, -0.36, -0.51],
								['c', -0.24, -0.45, -0.27, -0.84, -0.21, -1.38],
								['c', 0.12, -0.75, 0.45, -1.41, 1.02, -1.98],
								['c', 0.72, -0.72, 1.74, -1.17, 2.85, -1.32],
								['z']
							],
							w: 10.764,
							h: 14.97
						},
						3: {
							d: [
								['M', 3.78, -14.97],
								['c', 0.3, -0.03, 1.41, 0, 1.83, 0.06],
								['c', 2.22, 0.3, 3.51, 1.32, 3.72, 2.91],
								['c', 0.03, 0.33, 0.03, 1.26, -0.03, 1.65],
								['c', -0.12, 0.84, -0.48, 1.47, -1.05, 1.77],
								['c', -0.27, 0.15, -0.36, 0.24, -0.45, 0.39],
								['c', -0.09, 0.21, -0.09, 0.36, 0, 0.57],
								['c', 0.09, 0.15, 0.18, 0.24, 0.51, 0.39],
								['c', 0.75, 0.42, 1.23, 1.14, 1.41, 2.13],
								['c', 0.06, 0.42, 0.06, 1.35, 0, 1.71],
								['c', -0.18, 0.81, -0.48, 1.38, -1.02, 1.95],
								['c', -0.75, 0.72, -1.8, 1.2, -3.18, 1.38],
								['c', -0.42, 0.06, -1.56, 0.06, -1.95, 0],
								['c', -1.89, -0.33, -3.18, -1.29, -3.51, -2.64],
								['c', -0.03, -0.12, -0.03, -0.33, -0.03, -0.6],
								['c', 0, -0.36, 0, -0.42, 0.06, -0.63],
								['c', 0.12, -0.3, 0.27, -0.51, 0.51, -0.75],
								['c', 0.24, -0.24, 0.45, -0.39, 0.75, -0.51],
								['c', 0.21, -0.06, 0.27, -0.06, 0.6, -0.06],
								['c', 0.33, 0, 0.39, 0, 0.6, 0.06],
								['c', 0.3, 0.12, 0.51, 0.27, 0.75, 0.51],
								['c', 0.36, 0.33, 0.57, 0.75, 0.6, 1.2],
								['c', 0, 0.21, 0, 0.27, -0.06, 0.42],
								['c', -0.09, 0.18, -0.12, 0.24, -0.54, 0.54],
								['c', -0.51, 0.36, -0.63, 0.54, -0.6, 0.87],
								['c', 0.06, 0.54, 0.54, 0.9, 1.38, 0.99],
								['c', 0.36, 0.06, 0.72, 0.03, 0.96, -0.06],
								['c', 0.81, -0.27, 1.29, -1.23, 1.44, -2.79],
								['c', 0.03, -0.45, 0.03, -1.95, -0.03, -2.37],
								['c', -0.09, -0.75, -0.33, -1.23, -0.75, -1.44],
								['c', -0.33, -0.18, -0.45, -0.18, -1.98, -0.18],
								['c', -1.35, 0, -1.41, 0, -1.5, -0.06],
								['c', -0.18, -0.12, -0.24, -0.39, -0.12, -0.6],
								['c', 0.12, -0.15, 0.15, -0.15, 1.68, -0.15],
								['c', 1.5, 0, 1.62, 0, 1.89, -0.15],
								['c', 0.18, -0.09, 0.42, -0.36, 0.54, -0.57],
								['c', 0.18, -0.42, 0.27, -0.9, 0.3, -1.95],
								['c', 0.03, -1.2, -0.06, -1.8, -0.36, -2.37],
								['c', -0.24, -0.48, -0.63, -0.81, -1.14, -0.96],
								['c', -0.3, -0.06, -1.08, -0.06, -1.38, 0.03],
								['c', -0.6, 0.15, -0.9, 0.42, -0.96, 0.84],
								['c', -0.03, 0.3, 0.06, 0.45, 0.63, 0.84],
								['c', 0.33, 0.24, 0.42, 0.39, 0.45, 0.63],
								['c', 0.03, 0.72, -0.57, 1.5, -1.32, 1.65],
								['c', -1.05, 0.27, -2.1, -0.57, -2.1, -1.65],
								['c', 0, -0.45, 0.15, -0.96, 0.39, -1.38],
								['c', 0.12, -0.21, 0.54, -0.63, 0.81, -0.81],
								['c', 0.57, -0.42, 1.38, -0.69, 2.25, -0.81],
								['z']
							],
							w: 9.735,
							h: 14.967
						},
						4: {
							d: [
								['M', 8.64, -14.94],
								['c', 0.27, -0.09, 0.42, -0.12, 0.54, -0.03],
								['c', 0.09, 0.06, 0.15, 0.21, 0.15, 0.3],
								['c', -0.03, 0.06, -1.92, 2.31, -4.23, 5.04],
								['c', -2.31, 2.73, -4.23, 4.98, -4.26, 5.01],
								['c', -0.03, 0.06, 0.12, 0.06, 2.55, 0.06],
								['l', 2.61, 0],
								['l', 0, -2.37],
								['c', 0, -2.19, 0.03, -2.37, 0.06, -2.46],
								['c', 0.03, -0.06, 0.21, -0.18, 0.57, -0.42],
								['c', 1.08, -0.72, 1.38, -1.08, 1.86, -2.16],
								['c', 0.12, -0.3, 0.24, -0.54, 0.27, -0.57],
								['c', 0.12, -0.12, 0.39, -0.06, 0.45, 0.12],
								['c', 0.06, 0.09, 0.06, 0.57, 0.06, 3.96],
								['l', 0, 3.9],
								['l', 1.08, 0],
								['c', 1.05, 0, 1.11, 0, 1.2, 0.06],
								['c', 0.24, 0.15, 0.24, 0.54, 0, 0.69],
								['c', -0.09, 0.06, -0.15, 0.06, -1.2, 0.06],
								['l', -1.08, 0],
								['l', 0, 0.33],
								['c', 0, 0.57, 0.09, 1.11, 0.3, 1.53],
								['c', 0.36, 0.75, 0.93, 1.17, 1.68, 1.26],
								['c', 0.3, 0.03, 0.39, 0.09, 0.39, 0.3],
								['c', 0, 0.15, -0.03, 0.18, -0.09, 0.24],
								['c', -0.06, 0.06, -0.09, 0.06, -0.48, 0.06],
								['c', -0.42, 0, -0.69, -0.03, -2.1, -0.24],
								['c', -0.9, -0.15, -1.77, -0.15, -2.67, 0],
								['c', -1.41, 0.21, -1.68, 0.24, -2.1, 0.24],
								['c', -0.39, 0, -0.42, 0, -0.48, -0.06],
								['c', -0.06, -0.06, -0.06, -0.09, -0.06, -0.24],
								['c', 0, -0.21, 0.06, -0.27, 0.36, -0.3],
								['c', 0.75, -0.09, 1.32, -0.51, 1.68, -1.26],
								['c', 0.21, -0.42, 0.3, -0.96, 0.3, -1.53],
								['l', 0, -0.33],
								['l', -2.7, 0],
								['c', -2.91, 0, -2.85, 0, -3.09, -0.15],
								['c', -0.18, -0.12, -0.3, -0.39, -0.27, -0.54],
								['c', 0.03, -0.06, 0.18, -0.24, 0.33, -0.45],
								['c', 0.75, -0.9, 1.59, -2.07, 2.13, -3.03],
								['c', 0.33, -0.54, 0.84, -1.62, 1.05, -2.16],
								['c', 0.57, -1.41, 0.84, -2.64, 0.9, -4.05],
								['c', 0.03, -0.63, 0.06, -0.72, 0.24, -0.81],
								['l', 0.12, -0.06],
								['l', 0.45, 0.12],
								['c', 0.66, 0.18, 1.02, 0.24, 1.47, 0.27],
								['c', 0.6, 0.03, 1.23, -0.09, 2.01, -0.33],
								['z']
							],
							w: 11.795,
							h: 14.994
						},
						5: {
							d: [
								['M', 1.02, -14.94],
								['c', 0.12, -0.09, 0.03, -0.09, 1.08, 0.06],
								['c', 2.49, 0.36, 4.35, 0.36, 6.96, -0.06],
								['c', 0.57, -0.09, 0.66, -0.06, 0.81, 0.06],
								['c', 0.15, 0.18, 0.12, 0.24, -0.15, 0.51],
								['c', -1.29, 1.26, -3.24, 2.04, -5.58, 2.31],
								['c', -0.6, 0.09, -1.2, 0.12, -1.71, 0.12],
								['c', -0.39, 0, -0.45, 0, -0.57, 0.06],
								['c', -0.09, 0.06, -0.15, 0.12, -0.21, 0.21],
								['l', -0.06, 0.12],
								['l', 0, 1.65],
								['l', 0, 1.65],
								['l', 0.21, -0.21],
								['c', 0.66, -0.57, 1.41, -0.96, 2.19, -1.14],
								['c', 0.33, -0.06, 1.41, -0.06, 1.95, 0],
								['c', 2.61, 0.36, 4.02, 1.74, 4.26, 4.14],
								['c', 0.03, 0.45, 0.03, 1.08, -0.03, 1.44],
								['c', -0.18, 1.02, -0.78, 2.01, -1.59, 2.7],
								['c', -0.72, 0.57, -1.62, 1.02, -2.49, 1.2],
								['c', -1.38, 0.27, -3.03, 0.06, -4.2, -0.54],
								['c', -1.08, -0.54, -1.71, -1.32, -1.86, -2.28],
								['c', -0.09, -0.69, 0.09, -1.29, 0.57, -1.74],
								['c', 0.24, -0.24, 0.45, -0.39, 0.75, -0.51],
								['c', 0.21, -0.06, 0.27, -0.06, 0.6, -0.06],
								['c', 0.33, 0, 0.39, 0, 0.6, 0.06],
								['c', 0.3, 0.12, 0.51, 0.27, 0.75, 0.51],
								['c', 0.36, 0.33, 0.57, 0.75, 0.6, 1.2],
								['c', 0, 0.21, 0, 0.27, -0.06, 0.42],
								['c', -0.09, 0.18, -0.12, 0.24, -0.54, 0.54],
								['c', -0.18, 0.12, -0.36, 0.3, -0.42, 0.33],
								['c', -0.36, 0.42, -0.18, 0.99, 0.36, 1.26],
								['c', 0.51, 0.27, 1.47, 0.36, 2.01, 0.27],
								['c', 0.93, -0.21, 1.47, -1.17, 1.65, -2.91],
								['c', 0.06, -0.45, 0.06, -1.89, 0, -2.31],
								['c', -0.15, -1.2, -0.51, -2.1, -1.05, -2.55],
								['c', -0.21, -0.18, -0.54, -0.36, -0.81, -0.39],
								['c', -0.3, -0.06, -0.84, -0.03, -1.26, 0.06],
								['c', -0.93, 0.18, -1.65, 0.6, -2.16, 1.2],
								['c', -0.15, 0.21, -0.27, 0.3, -0.39, 0.3],
								['c', -0.15, 0, -0.3, -0.09, -0.36, -0.18],
								['c', -0.06, -0.09, -0.06, -0.15, -0.06, -3.66],
								['c', 0, -3.39, 0, -3.57, 0.06, -3.66],
								['c', 0.03, -0.06, 0.09, -0.15, 0.15, -0.18],
								['z']
							],
							w: 10.212,
							h: 14.997
						},
						6: {
							d: [
								['M', 4.98, -14.97],
								['c', 0.36, -0.03, 1.2, 0, 1.59, 0.06],
								['c', 0.9, 0.15, 1.68, 0.51, 2.25, 1.05],
								['c', 0.57, 0.51, 0.87, 1.23, 0.84, 1.98],
								['c', -0.03, 0.51, -0.21, 0.9, -0.6, 1.26],
								['c', -0.24, 0.24, -0.45, 0.39, -0.75, 0.51],
								['c', -0.21, 0.06, -0.27, 0.06, -0.6, 0.06],
								['c', -0.33, 0, -0.39, 0, -0.6, -0.06],
								['c', -0.3, -0.12, -0.51, -0.27, -0.75, -0.51],
								['c', -0.39, -0.36, -0.57, -0.78, -0.57, -1.26],
								['c', 0, -0.27, 0, -0.3, 0.09, -0.42],
								['c', 0.03, -0.09, 0.18, -0.21, 0.3, -0.3],
								['c', 0.12, -0.09, 0.3, -0.21, 0.39, -0.27],
								['c', 0.09, -0.06, 0.21, -0.18, 0.27, -0.24],
								['c', 0.06, -0.12, 0.09, -0.15, 0.09, -0.33],
								['c', 0, -0.18, -0.03, -0.24, -0.09, -0.36],
								['c', -0.24, -0.39, -0.75, -0.6, -1.38, -0.57],
								['c', -0.54, 0.03, -0.9, 0.18, -1.23, 0.48],
								['c', -0.81, 0.72, -1.08, 2.16, -0.96, 5.37],
								['l', 0, 0.63],
								['l', 0.3, -0.12],
								['c', 0.78, -0.27, 1.29, -0.33, 2.1, -0.27],
								['c', 1.47, 0.12, 2.49, 0.54, 3.27, 1.29],
								['c', 0.48, 0.51, 0.81, 1.11, 0.96, 1.89],
								['c', 0.06, 0.27, 0.06, 0.42, 0.06, 0.93],
								['c', 0, 0.54, 0, 0.69, -0.06, 0.96],
								['c', -0.15, 0.78, -0.48, 1.38, -0.96, 1.89],
								['c', -0.54, 0.51, -1.17, 0.87, -1.98, 1.08],
								['c', -1.14, 0.3, -2.4, 0.33, -3.24, 0.03],
								['c', -1.5, -0.48, -2.64, -1.89, -3.27, -4.02],
								['c', -0.36, -1.23, -0.51, -2.82, -0.42, -4.08],
								['c', 0.3, -3.66, 2.28, -6.3, 4.95, -6.66],
								['z'],
								['m', 0.66, 7.41],
								['c', -0.27, -0.09, -0.81, -0.12, -1.08, -0.06],
								['c', -0.72, 0.18, -1.08, 0.69, -1.23, 1.71],
								['c', -0.06, 0.54, -0.06, 3, 0, 3.54],
								['c', 0.18, 1.26, 0.72, 1.77, 1.8, 1.74],
								['c', 0.39, -0.03, 0.63, -0.09, 0.9, -0.27],
								['c', 0.66, -0.42, 0.9, -1.32, 0.9, -3.24],
								['c', 0, -2.22, -0.36, -3.12, -1.29, -3.42],
								['z']
							],
							w: 9.956,
							h: 14.982
						},
						7: {
							d: [
								['M', 0.21, -14.97],
								['c', 0.21, -0.06, 0.45, 0, 0.54, 0.15],
								['c', 0.06, 0.09, 0.06, 0.15, 0.06, 0.39],
								['c', 0, 0.24, 0, 0.33, 0.06, 0.42],
								['c', 0.06, 0.12, 0.21, 0.24, 0.27, 0.24],
								['c', 0.03, 0, 0.12, -0.12, 0.24, -0.21],
								['c', 0.96, -1.2, 2.58, -1.35, 3.99, -0.42],
								['c', 0.15, 0.12, 0.42, 0.3, 0.54, 0.45],
								['c', 0.48, 0.39, 0.81, 0.57, 1.29, 0.6],
								['c', 0.69, 0.03, 1.5, -0.3, 2.13, -0.87],
								['c', 0.09, -0.09, 0.27, -0.3, 0.39, -0.45],
								['c', 0.12, -0.15, 0.24, -0.27, 0.3, -0.3],
								['c', 0.18, -0.06, 0.39, 0.03, 0.51, 0.21],
								['c', 0.06, 0.18, 0.06, 0.24, -0.27, 0.72],
								['c', -0.18, 0.24, -0.54, 0.78, -0.78, 1.17],
								['c', -2.37, 3.54, -3.54, 6.27, -3.87, 9],
								['c', -0.03, 0.33, -0.03, 0.66, -0.03, 1.26],
								['c', 0, 0.9, 0, 1.08, 0.15, 1.89],
								['c', 0.06, 0.45, 0.06, 0.48, 0.03, 0.6],
								['c', -0.06, 0.09, -0.21, 0.21, -0.3, 0.21],
								['c', -0.03, 0, -0.27, -0.06, -0.54, -0.15],
								['c', -0.84, -0.27, -1.11, -0.3, -1.65, -0.3],
								['c', -0.57, 0, -0.84, 0.03, -1.56, 0.27],
								['c', -0.6, 0.18, -0.69, 0.21, -0.81, 0.15],
								['c', -0.12, -0.06, -0.21, -0.18, -0.21, -0.3],
								['c', 0, -0.15, 0.6, -1.44, 1.2, -2.61],
								['c', 1.14, -2.22, 2.73, -4.68, 5.1, -8.01],
								['c', 0.21, -0.27, 0.36, -0.48, 0.33, -0.48],
								['c', 0, 0, -0.12, 0.06, -0.27, 0.12],
								['c', -0.54, 0.3, -0.99, 0.39, -1.56, 0.39],
								['c', -0.75, 0.03, -1.2, -0.18, -1.83, -0.75],
								['c', -0.99, -0.9, -1.83, -1.17, -2.31, -0.72],
								['c', -0.18, 0.15, -0.36, 0.51, -0.45, 0.84],
								['c', -0.06, 0.24, -0.06, 0.33, -0.09, 1.98],
								['c', 0, 1.62, -0.03, 1.74, -0.06, 1.8],
								['c', -0.15, 0.24, -0.54, 0.24, -0.69, 0],
								['c', -0.06, -0.09, -0.06, -0.15, -0.06, -3.57],
								['c', 0, -3.42, 0, -3.48, 0.06, -3.57],
								['c', 0.03, -0.06, 0.09, -0.12, 0.15, -0.15],
								['z']
							],
							w: 10.561,
							h: 15.093
						},
						8: {
							d: [
								['M', 4.98, -14.97],
								['c', 0.33, -0.03, 1.02, -0.03, 1.32, 0],
								['c', 1.32, 0.12, 2.49, 0.6, 3.21, 1.32],
								['c', 0.39, 0.39, 0.66, 0.81, 0.78, 1.29],
								['c', 0.09, 0.36, 0.09, 1.08, 0, 1.44],
								['c', -0.21, 0.84, -0.66, 1.59, -1.59, 2.55],
								['l', -0.3, 0.3],
								['l', 0.27, 0.18],
								['c', 1.47, 0.93, 2.31, 2.31, 2.25, 3.75],
								['c', -0.03, 0.75, -0.24, 1.35, -0.63, 1.95],
								['c', -0.45, 0.66, -1.02, 1.14, -1.83, 1.53],
								['c', -1.8, 0.87, -4.2, 0.87, -6, 0.03],
								['c', -1.62, -0.78, -2.52, -2.16, -2.46, -3.66],
								['c', 0.06, -0.99, 0.54, -1.77, 1.8, -2.97],
								['c', 0.54, -0.51, 0.54, -0.54, 0.48, -0.57],
								['c', -0.39, -0.27, -0.96, -0.78, -1.2, -1.14],
								['c', -0.75, -1.11, -0.87, -2.4, -0.3, -3.6],
								['c', 0.69, -1.35, 2.25, -2.25, 4.2, -2.4],
								['z'],
								['m', 1.53, 0.69],
								['c', -0.42, -0.09, -1.11, -0.12, -1.38, -0.06],
								['c', -0.3, 0.06, -0.6, 0.18, -0.81, 0.3],
								['c', -0.21, 0.12, -0.6, 0.51, -0.72, 0.72],
								['c', -0.51, 0.87, -0.42, 1.89, 0.21, 2.52],
								['c', 0.21, 0.21, 0.36, 0.3, 1.95, 1.23],
								['c', 0.96, 0.54, 1.74, 0.99, 1.77, 1.02],
								['c', 0.09, 0, 0.63, -0.6, 0.99, -1.11],
								['c', 0.21, -0.36, 0.48, -0.87, 0.57, -1.23],
								['c', 0.06, -0.24, 0.06, -0.36, 0.06, -0.72],
								['c', 0, -0.45, -0.03, -0.66, -0.15, -0.99],
								['c', -0.39, -0.81, -1.29, -1.44, -2.49, -1.68],
								['z'],
								['m', -1.44, 8.07],
								['l', -1.89, -1.08],
								['c', -0.03, 0, -0.18, 0.15, -0.39, 0.33],
								['c', -1.2, 1.08, -1.65, 1.95, -1.59, 3],
								['c', 0.09, 1.59, 1.35, 2.85, 3.21, 3.24],
								['c', 0.33, 0.06, 0.45, 0.06, 0.93, 0.06],
								['c', 0.63, 0, 0.81, -0.03, 1.29, -0.27],
								['c', 0.9, -0.42, 1.47, -1.41, 1.41, -2.4],
								['c', -0.06, -0.66, -0.39, -1.29, -0.9, -1.65],
								['c', -0.12, -0.09, -1.05, -0.63, -2.07, -1.23],
								['z']
							],
							w: 10.926,
							h: 14.989
						},
						9: {
							d: [
								['M', 4.23, -14.97],
								['c', 0.42, -0.03, 1.29, 0, 1.62, 0.06],
								['c', 0.51, 0.12, 0.93, 0.3, 1.38, 0.57],
								['c', 1.53, 1.02, 2.52, 3.24, 2.73, 5.94],
								['c', 0.18, 2.55, -0.48, 4.98, -1.83, 6.57],
								['c', -1.05, 1.26, -2.4, 1.89, -3.93, 1.83],
								['c', -1.23, -0.06, -2.31, -0.45, -3.03, -1.14],
								['c', -0.57, -0.51, -0.87, -1.23, -0.84, -1.98],
								['c', 0.03, -0.51, 0.21, -0.9, 0.6, -1.26],
								['c', 0.24, -0.24, 0.45, -0.39, 0.75, -0.51],
								['c', 0.21, -0.06, 0.27, -0.06, 0.6, -0.06],
								['c', 0.33, 0, 0.39, 0, 0.6, 0.06],
								['c', 0.3, 0.12, 0.51, 0.27, 0.75, 0.51],
								['c', 0.39, 0.36, 0.57, 0.78, 0.57, 1.26],
								['c', 0, 0.27, 0, 0.3, -0.09, 0.42],
								['c', -0.03, 0.09, -0.18, 0.21, -0.3, 0.3],
								['c', -0.12, 0.09, -0.3, 0.21, -0.39, 0.27],
								['c', -0.09, 0.06, -0.21, 0.18, -0.27, 0.24],
								['c', -0.06, 0.12, -0.06, 0.15, -0.06, 0.33],
								['c', 0, 0.18, 0, 0.24, 0.06, 0.36],
								['c', 0.24, 0.39, 0.75, 0.6, 1.38, 0.57],
								['c', 0.54, -0.03, 0.9, -0.18, 1.23, -0.48],
								['c', 0.81, -0.72, 1.08, -2.16, 0.96, -5.37],
								['l', 0, -0.63],
								['l', -0.3, 0.12],
								['c', -0.78, 0.27, -1.29, 0.33, -2.1, 0.27],
								['c', -1.47, -0.12, -2.49, -0.54, -3.27, -1.29],
								['c', -0.48, -0.51, -0.81, -1.11, -0.96, -1.89],
								['c', -0.06, -0.27, -0.06, -0.42, -0.06, -0.96],
								['c', 0, -0.51, 0, -0.66, 0.06, -0.93],
								['c', 0.15, -0.78, 0.48, -1.38, 0.96, -1.89],
								['c', 0.15, -0.12, 0.33, -0.27, 0.42, -0.36],
								['c', 0.69, -0.51, 1.62, -0.81, 2.76, -0.93],
								['z'],
								['m', 1.17, 0.66],
								['c', -0.21, -0.06, -0.57, -0.06, -0.81, -0.03],
								['c', -0.78, 0.12, -1.26, 0.69, -1.41, 1.74],
								['c', -0.12, 0.63, -0.15, 1.95, -0.09, 2.79],
								['c', 0.12, 1.71, 0.63, 2.4, 1.77, 2.46],
								['c', 1.08, 0.03, 1.62, -0.48, 1.8, -1.74],
								['c', 0.06, -0.54, 0.06, -3, 0, -3.54],
								['c', -0.15, -1.05, -0.51, -1.53, -1.26, -1.68],
								['z']
							],
							w: 9.959,
							h: 14.986
						},
						'rests.multimeasure': {
							d: [
								['M', 0, -4],
								['l', 0, 16],
								['l', 1, 0],
								['l', 0, -5],
								['l', 40, 0],
								['l', 0, 5],
								['l', 1, 0],
								['l', 0, -16],
								['l', -1, 0],
								['l', 0, 5],
								['l', -40, 0],
								['l', 0, -5],
								['z']
							],
							w: 42,
							h: 18
						},
						'rests.whole': {
							d: [
								['M', 0.06, 0.03],
								['l', 0.09, -0.06],
								['l', 5.46, 0],
								['l', 5.49, 0],
								['l', 0.09, 0.06],
								['l', 0.06, 0.09],
								['l', 0, 2.19],
								['l', 0, 2.19],
								['l', -0.06, 0.09],
								['l', -0.09, 0.06],
								['l', -5.49, 0],
								['l', -5.46, 0],
								['l', -0.09, -0.06],
								['l', -0.06, -0.09],
								['l', 0, -2.19],
								['l', 0, -2.19],
								['z']
							],
							w: 11.25,
							h: 4.68
						},
						'rests.half': {
							d: [
								['M', 0.06, -4.62],
								['l', 0.09, -0.06],
								['l', 5.46, 0],
								['l', 5.49, 0],
								['l', 0.09, 0.06],
								['l', 0.06, 0.09],
								['l', 0, 2.19],
								['l', 0, 2.19],
								['l', -0.06, 0.09],
								['l', -0.09, 0.06],
								['l', -5.49, 0],
								['l', -5.46, 0],
								['l', -0.09, -0.06],
								['l', -0.06, -0.09],
								['l', 0, -2.19],
								['l', 0, -2.19],
								['z']
							],
							w: 11.25,
							h: 4.68
						},
						'rests.quarter': {
							d: [
								['M', 1.89, -11.82],
								['c', 0.12, -0.06, 0.24, -0.06, 0.36, -0.03],
								['c', 0.09, 0.06, 4.74, 5.58, 4.86, 5.82],
								['c', 0.21, 0.39, 0.15, 0.78, -0.15, 1.26],
								['c', -0.24, 0.33, -0.72, 0.81, -1.62, 1.56],
								['c', -0.45, 0.36, -0.87, 0.75, -0.96, 0.84],
								['c', -0.93, 0.99, -1.14, 2.49, -0.6, 3.63],
								['c', 0.18, 0.39, 0.27, 0.48, 1.32, 1.68],
								['c', 1.92, 2.25, 1.83, 2.16, 1.83, 2.34],
								['c', 0, 0.18, -0.18, 0.36, -0.36, 0.39],
								['c', -0.15, 0, -0.27, -0.06, -0.48, -0.27],
								['c', -0.75, -0.75, -2.46, -1.29, -3.39, -1.08],
								['c', -0.45, 0.09, -0.69, 0.27, -0.9, 0.69],
								['c', -0.12, 0.3, -0.21, 0.66, -0.24, 1.14],
								['c', -0.03, 0.66, 0.09, 1.35, 0.3, 2.01],
								['c', 0.15, 0.42, 0.24, 0.66, 0.45, 0.96],
								['c', 0.18, 0.24, 0.18, 0.33, 0.03, 0.42],
								['c', -0.12, 0.06, -0.18, 0.03, -0.45, -0.3],
								['c', -1.08, -1.38, -2.07, -3.36, -2.4, -4.83],
								['c', -0.27, -1.05, -0.15, -1.77, 0.27, -2.07],
								['c', 0.21, -0.12, 0.42, -0.15, 0.87, -0.15],
								['c', 0.87, 0.06, 2.1, 0.39, 3.3, 0.9],
								['l', 0.39, 0.18],
								['l', -1.65, -1.95],
								['c', -2.52, -2.97, -2.61, -3.09, -2.7, -3.27],
								['c', -0.09, -0.24, -0.12, -0.48, -0.03, -0.75],
								['c', 0.15, -0.48, 0.57, -0.96, 1.83, -2.01],
								['c', 0.45, -0.36, 0.84, -0.72, 0.93, -0.78],
								['c', 0.69, -0.75, 1.02, -1.8, 0.9, -2.79],
								['c', -0.06, -0.33, -0.21, -0.84, -0.39, -1.11],
								['c', -0.09, -0.15, -0.45, -0.6, -0.81, -1.05],
								['c', -0.36, -0.42, -0.69, -0.81, -0.72, -0.87],
								['c', -0.09, -0.18, 0, -0.42, 0.21, -0.51],
								['z']
							],
							w: 7.888,
							h: 21.435
						},
						'rests.8th': {
							d: [
								['M', 1.68, -6.12],
								['c', 0.66, -0.09, 1.23, 0.09, 1.68, 0.51],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
								['c', 0.12, 0.27, 0.33, 0.45, 0.6, 0.48],
								['c', 0.12, 0, 0.18, 0, 0.33, -0.09],
								['c', 0.39, -0.18, 1.32, -1.29, 1.68, -1.98],
								['c', 0.09, -0.21, 0.24, -0.3, 0.39, -0.3],
								['c', 0.12, 0, 0.27, 0.09, 0.33, 0.18],
								['c', 0.03, 0.06, -0.27, 1.11, -1.86, 6.42],
								['c', -1.02, 3.48, -1.89, 6.39, -1.92, 6.42],
								['c', 0, 0.03, -0.12, 0.12, -0.24, 0.15],
								['c', -0.18, 0.09, -0.21, 0.09, -0.45, 0.09],
								['c', -0.24, 0, -0.3, 0, -0.48, -0.06],
								['c', -0.09, -0.06, -0.21, -0.12, -0.21, -0.15],
								['c', -0.06, -0.03, 0.15, -0.57, 1.68, -4.92],
								['c', 0.96, -2.67, 1.74, -4.89, 1.71, -4.89],
								['l', -0.51, 0.15],
								['c', -1.08, 0.36, -1.74, 0.48, -2.55, 0.48],
								['c', -0.66, 0, -0.84, -0.03, -1.32, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.33, -0.45, 0.84, -0.81, 1.38, -0.9],
								['z']
							],
							w: 7.534,
							h: 13.883
						},
						'rests.16th': {
							d: [
								['M', 3.33, -6.12],
								['c', 0.66, -0.09, 1.23, 0.09, 1.68, 0.51],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
								['c', 0.15, 0.39, 0.57, 0.57, 0.87, 0.42],
								['c', 0.39, -0.18, 1.2, -1.23, 1.62, -2.07],
								['c', 0.06, -0.15, 0.24, -0.24, 0.36, -0.24],
								['c', 0.12, 0, 0.27, 0.09, 0.33, 0.18],
								['c', 0.03, 0.06, -0.45, 1.86, -2.67, 10.17],
								['c', -1.5, 5.55, -2.73, 10.14, -2.76, 10.17],
								['c', -0.03, 0.03, -0.12, 0.12, -0.24, 0.15],
								['c', -0.18, 0.09, -0.21, 0.09, -0.45, 0.09],
								['c', -0.24, 0, -0.3, 0, -0.48, -0.06],
								['c', -0.09, -0.06, -0.21, -0.12, -0.21, -0.15],
								['c', -0.06, -0.03, 0.12, -0.57, 1.44, -4.92],
								['c', 0.81, -2.67, 1.47, -4.86, 1.47, -4.89],
								['c', -0.03, 0, -0.27, 0.06, -0.54, 0.15],
								['c', -1.08, 0.36, -1.77, 0.48, -2.58, 0.48],
								['c', -0.66, 0, -0.84, -0.03, -1.32, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.72, -1.05, 2.22, -1.23, 3.06, -0.42],
								['c', 0.3, 0.33, 0.42, 0.6, 0.6, 1.38],
								['c', 0.09, 0.45, 0.21, 0.78, 0.33, 0.9],
								['c', 0.09, 0.09, 0.27, 0.18, 0.45, 0.21],
								['c', 0.12, 0, 0.18, 0, 0.33, -0.09],
								['c', 0.33, -0.15, 1.02, -0.93, 1.41, -1.59],
								['c', 0.12, -0.21, 0.18, -0.39, 0.39, -1.08],
								['c', 0.66, -2.1, 1.17, -3.84, 1.17, -3.87],
								['c', 0, 0, -0.21, 0.06, -0.42, 0.15],
								['c', -0.51, 0.15, -1.2, 0.33, -1.68, 0.42],
								['c', -0.33, 0.06, -0.51, 0.06, -0.96, 0.06],
								['c', -0.66, 0, -0.84, -0.03, -1.32, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.33, -0.45, 0.84, -0.81, 1.38, -0.9],
								['z']
							],
							w: 9.724,
							h: 21.383
						},
						'rests.32nd': {
							d: [
								['M', 4.23, -13.62],
								['c', 0.66, -0.09, 1.23, 0.09, 1.68, 0.51],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
								['c', 0.12, 0.27, 0.33, 0.45, 0.6, 0.48],
								['c', 0.12, 0, 0.18, 0, 0.27, -0.06],
								['c', 0.33, -0.21, 0.99, -1.11, 1.44, -1.98],
								['c', 0.09, -0.24, 0.21, -0.33, 0.39, -0.33],
								['c', 0.12, 0, 0.27, 0.09, 0.33, 0.18],
								['c', 0.03, 0.06, -0.57, 2.67, -3.21, 13.89],
								['c', -1.8, 7.62, -3.3, 13.89, -3.3, 13.92],
								['c', -0.03, 0.06, -0.12, 0.12, -0.24, 0.18],
								['c', -0.21, 0.09, -0.24, 0.09, -0.48, 0.09],
								['c', -0.24, 0, -0.3, 0, -0.48, -0.06],
								['c', -0.09, -0.06, -0.21, -0.12, -0.21, -0.15],
								['c', -0.06, -0.03, 0.09, -0.57, 1.23, -4.92],
								['c', 0.69, -2.67, 1.26, -4.86, 1.29, -4.89],
								['c', 0, -0.03, -0.12, -0.03, -0.48, 0.12],
								['c', -1.17, 0.39, -2.22, 0.57, -3, 0.54],
								['c', -0.42, -0.03, -0.75, -0.12, -1.11, -0.3],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.72, -1.05, 2.22, -1.23, 3.06, -0.42],
								['c', 0.3, 0.33, 0.42, 0.6, 0.6, 1.38],
								['c', 0.09, 0.45, 0.21, 0.78, 0.33, 0.9],
								['c', 0.12, 0.09, 0.3, 0.18, 0.48, 0.21],
								['c', 0.12, 0, 0.18, 0, 0.3, -0.09],
								['c', 0.42, -0.21, 1.29, -1.29, 1.56, -1.89],
								['c', 0.03, -0.12, 1.23, -4.59, 1.23, -4.65],
								['c', 0, -0.03, -0.18, 0.03, -0.39, 0.12],
								['c', -0.63, 0.18, -1.2, 0.36, -1.74, 0.45],
								['c', -0.39, 0.06, -0.54, 0.06, -1.02, 0.06],
								['c', -0.66, 0, -0.84, -0.03, -1.32, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.72, -1.05, 2.22, -1.23, 3.06, -0.42],
								['c', 0.3, 0.33, 0.42, 0.6, 0.6, 1.38],
								['c', 0.09, 0.45, 0.21, 0.78, 0.33, 0.9],
								['c', 0.18, 0.18, 0.51, 0.27, 0.72, 0.15],
								['c', 0.3, -0.12, 0.69, -0.57, 1.08, -1.17],
								['c', 0.42, -0.6, 0.39, -0.51, 1.05, -3.03],
								['c', 0.33, -1.26, 0.6, -2.31, 0.6, -2.34],
								['c', 0, 0, -0.21, 0.03, -0.45, 0.12],
								['c', -0.57, 0.18, -1.14, 0.33, -1.62, 0.42],
								['c', -0.33, 0.06, -0.51, 0.06, -0.96, 0.06],
								['c', -0.66, 0, -0.84, -0.03, -1.32, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.33, -0.45, 0.84, -0.81, 1.38, -0.9],
								['z']
							],
							w: 11.373,
							h: 28.883
						},
						'rests.64th': {
							d: [
								['M', 5.13, -13.62],
								['c', 0.66, -0.09, 1.23, 0.09, 1.68, 0.51],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.15, 0.63, 0.21, 0.81, 0.33, 0.96],
								['c', 0.18, 0.21, 0.54, 0.3, 0.75, 0.18],
								['c', 0.24, -0.12, 0.63, -0.66, 1.08, -1.56],
								['c', 0.33, -0.66, 0.39, -0.72, 0.6, -0.72],
								['c', 0.12, 0, 0.27, 0.09, 0.33, 0.18],
								['c', 0.03, 0.06, -0.69, 3.66, -3.54, 17.64],
								['c', -1.95, 9.66, -3.57, 17.61, -3.57, 17.64],
								['c', -0.03, 0.06, -0.12, 0.12, -0.24, 0.18],
								['c', -0.21, 0.09, -0.24, 0.09, -0.48, 0.09],
								['c', -0.24, 0, -0.3, 0, -0.48, -0.06],
								['c', -0.09, -0.06, -0.21, -0.12, -0.21, -0.15],
								['c', -0.06, -0.03, 0.06, -0.57, 1.05, -4.95],
								['c', 0.6, -2.7, 1.08, -4.89, 1.08, -4.92],
								['c', 0, 0, -0.24, 0.06, -0.51, 0.15],
								['c', -0.66, 0.24, -1.2, 0.36, -1.77, 0.48],
								['c', -0.42, 0.06, -0.57, 0.06, -1.05, 0.06],
								['c', -0.69, 0, -0.87, -0.03, -1.35, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.72, -1.05, 2.22, -1.23, 3.06, -0.42],
								['c', 0.3, 0.33, 0.42, 0.6, 0.6, 1.38],
								['c', 0.09, 0.45, 0.21, 0.78, 0.33, 0.9],
								['c', 0.09, 0.09, 0.27, 0.18, 0.45, 0.21],
								['c', 0.21, 0.03, 0.39, -0.09, 0.72, -0.42],
								['c', 0.45, -0.45, 1.02, -1.26, 1.17, -1.65],
								['c', 0.03, -0.09, 0.27, -1.14, 0.54, -2.34],
								['c', 0.27, -1.2, 0.48, -2.19, 0.51, -2.22],
								['c', 0, -0.03, -0.09, -0.03, -0.48, 0.12],
								['c', -1.17, 0.39, -2.22, 0.57, -3, 0.54],
								['c', -0.42, -0.03, -0.75, -0.12, -1.11, -0.3],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
								['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
								['c', 0.15, 0.39, 0.57, 0.57, 0.9, 0.42],
								['c', 0.36, -0.18, 1.2, -1.26, 1.47, -1.89],
								['c', 0.03, -0.09, 0.3, -1.2, 0.57, -2.43],
								['l', 0.51, -2.28],
								['l', -0.54, 0.18],
								['c', -1.11, 0.36, -1.8, 0.48, -2.61, 0.48],
								['c', -0.66, 0, -0.84, -0.03, -1.32, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
								['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.15, 0.63, 0.21, 0.81, 0.33, 0.96],
								['c', 0.21, 0.21, 0.54, 0.3, 0.75, 0.18],
								['c', 0.36, -0.18, 0.93, -0.93, 1.29, -1.68],
								['c', 0.12, -0.24, 0.18, -0.48, 0.63, -2.55],
								['l', 0.51, -2.31],
								['c', 0, -0.03, -0.18, 0.03, -0.39, 0.12],
								['c', -1.14, 0.36, -2.1, 0.54, -2.82, 0.51],
								['c', -0.42, -0.03, -0.75, -0.12, -1.11, -0.3],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.33, -0.45, 0.84, -0.81, 1.38, -0.9],
								['z']
							],
							w: 12.453,
							h: 36.383
						},
						'rests.128th': {
							d: [
								['M', 6.03, -21.12],
								['c', 0.66, -0.09, 1.23, 0.09, 1.68, 0.51],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
								['c', 0.12, 0.27, 0.33, 0.45, 0.6, 0.48],
								['c', 0.21, 0, 0.33, -0.06, 0.54, -0.36],
								['c', 0.15, -0.21, 0.54, -0.93, 0.78, -1.47],
								['c', 0.15, -0.33, 0.18, -0.39, 0.3, -0.48],
								['c', 0.18, -0.09, 0.45, 0, 0.51, 0.15],
								['c', 0.03, 0.09, -7.11, 42.75, -7.17, 42.84],
								['c', -0.03, 0.03, -0.15, 0.09, -0.24, 0.15],
								['c', -0.18, 0.06, -0.24, 0.06, -0.45, 0.06],
								['c', -0.24, 0, -0.3, 0, -0.48, -0.06],
								['c', -0.09, -0.06, -0.21, -0.12, -0.21, -0.15],
								['c', -0.06, -0.03, 0.03, -0.57, 0.84, -4.98],
								['c', 0.51, -2.7, 0.93, -4.92, 0.9, -4.92],
								['c', 0, 0, -0.15, 0.06, -0.36, 0.12],
								['c', -0.78, 0.27, -1.62, 0.48, -2.31, 0.57],
								['c', -0.15, 0.03, -0.54, 0.03, -0.81, 0.03],
								['c', -0.66, 0, -0.84, -0.03, -1.32, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
								['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
								['c', 0.12, 0.27, 0.33, 0.45, 0.63, 0.48],
								['c', 0.12, 0, 0.18, 0, 0.3, -0.09],
								['c', 0.42, -0.21, 1.14, -1.11, 1.5, -1.83],
								['c', 0.12, -0.27, 0.12, -0.27, 0.54, -2.52],
								['c', 0.24, -1.23, 0.42, -2.25, 0.39, -2.25],
								['c', 0, 0, -0.24, 0.06, -0.51, 0.18],
								['c', -1.26, 0.39, -2.25, 0.57, -3.06, 0.54],
								['c', -0.42, -0.03, -0.75, -0.12, -1.11, -0.3],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
								['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.15, 0.63, 0.21, 0.81, 0.33, 0.96],
								['c', 0.18, 0.21, 0.51, 0.3, 0.75, 0.18],
								['c', 0.36, -0.15, 1.05, -0.99, 1.41, -1.77],
								['l', 0.15, -0.3],
								['l', 0.42, -2.25],
								['c', 0.21, -1.26, 0.42, -2.28, 0.39, -2.28],
								['l', -0.51, 0.15],
								['c', -1.11, 0.39, -1.89, 0.51, -2.7, 0.51],
								['c', -0.66, 0, -0.84, -0.03, -1.32, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
								['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.15, 0.63, 0.21, 0.81, 0.33, 0.96],
								['c', 0.18, 0.18, 0.48, 0.27, 0.72, 0.21],
								['c', 0.33, -0.12, 1.14, -1.26, 1.41, -1.95],
								['c', 0, -0.09, 0.21, -1.11, 0.45, -2.34],
								['c', 0.21, -1.2, 0.39, -2.22, 0.39, -2.28],
								['c', 0.03, -0.03, 0, -0.03, -0.45, 0.12],
								['c', -0.57, 0.18, -1.2, 0.33, -1.71, 0.42],
								['c', -0.3, 0.06, -0.51, 0.06, -0.93, 0.06],
								['c', -0.66, 0, -0.84, -0.03, -1.32, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
								['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
								['c', 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
								['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
								['c', 0.12, 0.27, 0.33, 0.45, 0.6, 0.48],
								['c', 0.18, 0, 0.36, -0.09, 0.57, -0.33],
								['c', 0.33, -0.36, 0.78, -1.14, 0.93, -1.56],
								['c', 0.03, -0.12, 0.24, -1.2, 0.45, -2.4],
								['c', 0.24, -1.2, 0.42, -2.22, 0.42, -2.28],
								['c', 0.03, -0.03, 0, -0.03, -0.39, 0.09],
								['c', -1.05, 0.36, -1.8, 0.48, -2.58, 0.48],
								['c', -0.63, 0, -0.84, -0.03, -1.29, -0.27],
								['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
								['c', 0.33, -0.45, 0.84, -0.81, 1.38, -0.9],
								['z']
							],
							w: 12.992,
							h: 43.883
						},
						'accidentals.sharp': {
							d: [
								['M', 5.73, -11.19],
								['c', 0.21, -0.12, 0.54, -0.03, 0.66, 0.24],
								['c', 0.06, 0.12, 0.06, 0.21, 0.06, 2.31],
								['c', 0, 1.23, 0, 2.22, 0.03, 2.22],
								['c', 0, 0, 0.27, -0.12, 0.6, -0.24],
								['c', 0.69, -0.27, 0.78, -0.3, 0.96, -0.15],
								['c', 0.21, 0.15, 0.21, 0.18, 0.21, 1.38],
								['c', 0, 1.02, 0, 1.11, -0.06, 1.2],
								['c', -0.03, 0.06, -0.09, 0.12, -0.12, 0.15],
								['c', -0.06, 0.03, -0.42, 0.21, -0.84, 0.36],
								['l', -0.75, 0.33],
								['l', -0.03, 2.43],
								['c', 0, 1.32, 0, 2.43, 0.03, 2.43],
								['c', 0, 0, 0.27, -0.12, 0.6, -0.24],
								['c', 0.69, -0.27, 0.78, -0.3, 0.96, -0.15],
								['c', 0.21, 0.15, 0.21, 0.18, 0.21, 1.38],
								['c', 0, 1.02, 0, 1.11, -0.06, 1.2],
								['c', -0.03, 0.06, -0.09, 0.12, -0.12, 0.15],
								['c', -0.06, 0.03, -0.42, 0.21, -0.84, 0.36],
								['l', -0.75, 0.33],
								['l', -0.03, 2.52],
								['c', 0, 2.28, -0.03, 2.55, -0.06, 2.64],
								['c', -0.21, 0.36, -0.72, 0.36, -0.93, 0],
								['c', -0.03, -0.09, -0.06, -0.33, -0.06, -2.43],
								['l', 0, -2.31],
								['l', -1.29, 0.51],
								['l', -1.26, 0.51],
								['l', 0, 2.43],
								['c', 0, 2.58, 0, 2.52, -0.15, 2.67],
								['c', -0.06, 0.09, -0.27, 0.18, -0.36, 0.18],
								['c', -0.12, 0, -0.33, -0.09, -0.39, -0.18],
								['c', -0.15, -0.15, -0.15, -0.09, -0.15, -2.43],
								['c', 0, -1.23, 0, -2.22, -0.03, -2.22],
								['c', 0, 0, -0.27, 0.12, -0.6, 0.24],
								['c', -0.69, 0.27, -0.78, 0.3, -0.96, 0.15],
								['c', -0.21, -0.15, -0.21, -0.18, -0.21, -1.38],
								['c', 0, -1.02, 0, -1.11, 0.06, -1.2],
								['c', 0.03, -0.06, 0.09, -0.12, 0.12, -0.15],
								['c', 0.06, -0.03, 0.42, -0.21, 0.84, -0.36],
								['l', 0.78, -0.33],
								['l', 0, -2.43],
								['c', 0, -1.32, 0, -2.43, -0.03, -2.43],
								['c', 0, 0, -0.27, 0.12, -0.6, 0.24],
								['c', -0.69, 0.27, -0.78, 0.3, -0.96, 0.15],
								['c', -0.21, -0.15, -0.21, -0.18, -0.21, -1.38],
								['c', 0, -1.02, 0, -1.11, 0.06, -1.2],
								['c', 0.03, -0.06, 0.09, -0.12, 0.12, -0.15],
								['c', 0.06, -0.03, 0.42, -0.21, 0.84, -0.36],
								['l', 0.78, -0.33],
								['l', 0, -2.52],
								['c', 0, -2.28, 0.03, -2.55, 0.06, -2.64],
								['c', 0.21, -0.36, 0.72, -0.36, 0.93, 0],
								['c', 0.03, 0.09, 0.06, 0.33, 0.06, 2.43],
								['l', 0.03, 2.31],
								['l', 1.26, -0.51],
								['l', 1.26, -0.51],
								['l', 0, -2.43],
								['c', 0, -2.28, 0, -2.43, 0.06, -2.55],
								['c', 0.06, -0.12, 0.12, -0.18, 0.27, -0.24],
								['z'],
								['m', -0.33, 10.65],
								['l', 0, -2.43],
								['l', -1.29, 0.51],
								['l', -1.26, 0.51],
								['l', 0, 2.46],
								['l', 0, 2.43],
								['l', 0.09, -0.03],
								['c', 0.06, -0.03, 0.63, -0.27, 1.29, -0.51],
								['l', 1.17, -0.48],
								['l', 0, -2.46],
								['z']
							],
							w: 8.25,
							h: 22.462
						},
						'accidentals.halfsharp': {
							d: [
								['M', 2.43, -10.05],
								['c', 0.21, -0.12, 0.54, -0.03, 0.66, 0.24],
								['c', 0.06, 0.12, 0.06, 0.21, 0.06, 2.01],
								['c', 0, 1.05, 0, 1.89, 0.03, 1.89],
								['l', 0.72, -0.48],
								['c', 0.69, -0.48, 0.69, -0.51, 0.87, -0.51],
								['c', 0.15, 0, 0.18, 0.03, 0.27, 0.09],
								['c', 0.21, 0.15, 0.21, 0.18, 0.21, 1.41],
								['c', 0, 1.11, -0.03, 1.14, -0.09, 1.23],
								['c', -0.03, 0.03, -0.48, 0.39, -1.02, 0.75],
								['l', -0.99, 0.66],
								['l', 0, 2.37],
								['c', 0, 1.32, 0, 2.37, 0.03, 2.37],
								['l', 0.72, -0.48],
								['c', 0.69, -0.48, 0.69, -0.51, 0.87, -0.51],
								['c', 0.15, 0, 0.18, 0.03, 0.27, 0.09],
								['c', 0.21, 0.15, 0.21, 0.18, 0.21, 1.41],
								['c', 0, 1.11, -0.03, 1.14, -0.09, 1.23],
								['c', -0.03, 0.03, -0.48, 0.39, -1.02, 0.75],
								['l', -0.99, 0.66],
								['l', 0, 2.25],
								['c', 0, 1.95, 0, 2.28, -0.06, 2.37],
								['c', -0.06, 0.12, -0.12, 0.21, -0.24, 0.27],
								['c', -0.27, 0.12, -0.54, 0.03, -0.69, -0.24],
								['c', -0.06, -0.12, -0.06, -0.21, -0.06, -2.01],
								['c', 0, -1.05, 0, -1.89, -0.03, -1.89],
								['l', -0.72, 0.48],
								['c', -0.69, 0.48, -0.69, 0.48, -0.87, 0.48],
								['c', -0.15, 0, -0.18, 0, -0.27, -0.06],
								['c', -0.21, -0.15, -0.21, -0.18, -0.21, -1.41],
								['c', 0, -1.11, 0.03, -1.14, 0.09, -1.23],
								['c', 0.03, -0.03, 0.48, -0.39, 1.02, -0.75],
								['l', 0.99, -0.66],
								['l', 0, -2.37],
								['c', 0, -1.32, 0, -2.37, -0.03, -2.37],
								['l', -0.72, 0.48],
								['c', -0.69, 0.48, -0.69, 0.48, -0.87, 0.48],
								['c', -0.15, 0, -0.18, 0, -0.27, -0.06],
								['c', -0.21, -0.15, -0.21, -0.18, -0.21, -1.41],
								['c', 0, -1.11, 0.03, -1.14, 0.09, -1.23],
								['c', 0.03, -0.03, 0.48, -0.39, 1.02, -0.75],
								['l', 0.99, -0.66],
								['l', 0, -2.25],
								['c', 0, -2.13, 0, -2.28, 0.06, -2.4],
								['c', 0.06, -0.12, 0.12, -0.18, 0.27, -0.24],
								['z']
							],
							w: 5.25,
							h: 20.174
						},
						'accidentals.nat': {
							d: [
								['M', 0.21, -11.4],
								['c', 0.24, -0.06, 0.78, 0, 0.99, 0.15],
								['c', 0.03, 0.03, 0.03, 0.48, 0, 2.61],
								['c', -0.03, 1.44, -0.03, 2.61, -0.03, 2.61],
								['c', 0, 0.03, 0.75, -0.09, 1.68, -0.24],
								['c', 0.96, -0.18, 1.71, -0.27, 1.74, -0.27],
								['c', 0.15, 0.03, 0.27, 0.15, 0.36, 0.3],
								['l', 0.06, 0.12],
								['l', 0.09, 8.67],
								['c', 0.09, 6.96, 0.12, 8.67, 0.09, 8.67],
								['c', -0.03, 0.03, -0.12, 0.06, -0.21, 0.09],
								['c', -0.24, 0.09, -0.72, 0.09, -0.96, 0],
								['c', -0.09, -0.03, -0.18, -0.06, -0.21, -0.09],
								['c', -0.03, -0.03, -0.03, -0.48, 0, -2.61],
								['c', 0.03, -1.44, 0.03, -2.61, 0.03, -2.61],
								['c', 0, -0.03, -0.75, 0.09, -1.68, 0.24],
								['c', -0.96, 0.18, -1.71, 0.27, -1.74, 0.27],
								['c', -0.15, -0.03, -0.27, -0.15, -0.36, -0.3],
								['l', -0.06, -0.15],
								['l', -0.09, -7.53],
								['c', -0.06, -4.14, -0.09, -8.04, -0.12, -8.67],
								['l', 0, -1.11],
								['l', 0.15, -0.06],
								['c', 0.09, -0.03, 0.21, -0.06, 0.27, -0.09],
								['z'],
								['m', 3.75, 8.4],
								['c', 0, -0.33, 0, -0.42, -0.03, -0.42],
								['c', -0.12, 0, -2.79, 0.45, -2.79, 0.48],
								['c', -0.03, 0, -0.09, 6.3, -0.09, 6.33],
								['c', 0.03, 0, 2.79, -0.45, 2.82, -0.48],
								['c', 0, 0, 0.09, -4.53, 0.09, -5.91],
								['z']
							],
							w: 5.4,
							h: 22.8
						},
						'accidentals.flat': {
							d: [
								['M', -0.36, -14.07],
								['c', 0.33, -0.06, 0.87, 0, 1.08, 0.15],
								['c', 0.06, 0.03, 0.06, 0.36, -0.03, 5.25],
								['c', -0.06, 2.85, -0.09, 5.19, -0.09, 5.19],
								['c', 0, 0.03, 0.12, -0.03, 0.24, -0.12],
								['c', 0.63, -0.42, 1.41, -0.66, 2.19, -0.72],
								['c', 0.81, -0.03, 1.47, 0.21, 2.04, 0.78],
								['c', 0.57, 0.54, 0.87, 1.26, 0.93, 2.04],
								['c', 0.03, 0.57, -0.09, 1.08, -0.36, 1.62],
								['c', -0.42, 0.81, -1.02, 1.38, -2.82, 2.61],
								['c', -1.14, 0.78, -1.44, 1.02, -1.8, 1.44],
								['c', -0.18, 0.18, -0.39, 0.39, -0.45, 0.42],
								['c', -0.27, 0.18, -0.57, 0.15, -0.81, -0.06],
								['c', -0.06, -0.09, -0.12, -0.18, -0.15, -0.27],
								['c', -0.03, -0.06, -0.09, -3.27, -0.18, -8.34],
								['c', -0.09, -4.53, -0.15, -8.58, -0.18, -9.03],
								['l', 0, -0.78],
								['l', 0.12, -0.06],
								['c', 0.06, -0.03, 0.18, -0.09, 0.27, -0.12],
								['z'],
								['m', 3.18, 11.01],
								['c', -0.21, -0.12, -0.54, -0.15, -0.81, -0.06],
								['c', -0.54, 0.15, -0.99, 0.63, -1.17, 1.26],
								['c', -0.06, 0.3, -0.12, 2.88, -0.06, 3.87],
								['c', 0.03, 0.42, 0.03, 0.81, 0.06, 0.9],
								['l', 0.03, 0.12],
								['l', 0.45, -0.39],
								['c', 0.63, -0.54, 1.26, -1.17, 1.56, -1.59],
								['c', 0.3, -0.42, 0.6, -0.99, 0.72, -1.41],
								['c', 0.18, -0.69, 0.09, -1.47, -0.18, -2.07],
								['c', -0.15, -0.3, -0.33, -0.51, -0.6, -0.63],
								['z']
							],
							w: 6.75,
							h: 18.801
						},
						'accidentals.halfflat': {
							d: [
								['M', 4.83, -14.07],
								['c', 0.33, -0.06, 0.87, 0, 1.08, 0.15],
								['c', 0.06, 0.03, 0.06, 0.6, -0.12, 9.06],
								['c', -0.09, 5.55, -0.15, 9.06, -0.18, 9.12],
								['c', -0.03, 0.09, -0.09, 0.18, -0.15, 0.27],
								['c', -0.24, 0.21, -0.54, 0.24, -0.81, 0.06],
								['c', -0.06, -0.03, -0.27, -0.24, -0.45, -0.42],
								['c', -0.36, -0.42, -0.66, -0.66, -1.8, -1.44],
								['c', -1.23, -0.84, -1.83, -1.32, -2.25, -1.77],
								['c', -0.66, -0.78, -0.96, -1.56, -0.93, -2.46],
								['c', 0.09, -1.41, 1.11, -2.58, 2.4, -2.79],
								['c', 0.3, -0.06, 0.84, -0.03, 1.23, 0.06],
								['c', 0.54, 0.12, 1.08, 0.33, 1.53, 0.63],
								['c', 0.12, 0.09, 0.24, 0.15, 0.24, 0.12],
								['c', 0, 0, -0.12, -8.37, -0.18, -9.75],
								['l', 0, -0.66],
								['l', 0.12, -0.06],
								['c', 0.06, -0.03, 0.18, -0.09, 0.27, -0.12],
								['z'],
								['m', -1.65, 10.95],
								['c', -0.6, -0.18, -1.08, 0.09, -1.38, 0.69],
								['c', -0.27, 0.6, -0.36, 1.38, -0.18, 2.07],
								['c', 0.12, 0.42, 0.42, 0.99, 0.72, 1.41],
								['c', 0.3, 0.42, 0.93, 1.05, 1.56, 1.59],
								['l', 0.48, 0.39],
								['l', 0, -0.12],
								['c', 0.03, -0.09, 0.03, -0.48, 0.06, -0.9],
								['c', 0.03, -0.57, 0.03, -1.08, 0, -2.22],
								['c', -0.03, -1.62, -0.03, -1.62, -0.24, -2.07],
								['c', -0.21, -0.42, -0.6, -0.75, -1.02, -0.84],
								['z']
							],
							w: 6.728,
							h: 18.801
						},
						'accidentals.dblflat': {
							d: [
								['M', -0.36, -14.07],
								['c', 0.33, -0.06, 0.87, 0, 1.08, 0.15],
								['c', 0.06, 0.03, 0.06, 0.36, -0.03, 5.25],
								['c', -0.06, 2.85, -0.09, 5.19, -0.09, 5.19],
								['c', 0, 0.03, 0.12, -0.03, 0.24, -0.12],
								['c', 0.63, -0.42, 1.41, -0.66, 2.19, -0.72],
								['c', 0.81, -0.03, 1.47, 0.21, 2.04, 0.78],
								['c', 0.57, 0.54, 0.87, 1.26, 0.93, 2.04],
								['c', 0.03, 0.57, -0.09, 1.08, -0.36, 1.62],
								['c', -0.42, 0.81, -1.02, 1.38, -2.82, 2.61],
								['c', -1.14, 0.78, -1.44, 1.02, -1.8, 1.44],
								['c', -0.18, 0.18, -0.39, 0.39, -0.45, 0.42],
								['c', -0.27, 0.18, -0.57, 0.15, -0.81, -0.06],
								['c', -0.06, -0.09, -0.12, -0.18, -0.15, -0.27],
								['c', -0.03, -0.06, -0.09, -3.27, -0.18, -8.34],
								['c', -0.09, -4.53, -0.15, -8.58, -0.18, -9.03],
								['l', 0, -0.78],
								['l', 0.12, -0.06],
								['c', 0.06, -0.03, 0.18, -0.09, 0.27, -0.12],
								['z'],
								['m', 3.18, 11.01],
								['c', -0.21, -0.12, -0.54, -0.15, -0.81, -0.06],
								['c', -0.54, 0.15, -0.99, 0.63, -1.17, 1.26],
								['c', -0.06, 0.3, -0.12, 2.88, -0.06, 3.87],
								['c', 0.03, 0.42, 0.03, 0.81, 0.06, 0.9],
								['l', 0.03, 0.12],
								['l', 0.45, -0.39],
								['c', 0.63, -0.54, 1.26, -1.17, 1.56, -1.59],
								['c', 0.3, -0.42, 0.6, -0.99, 0.72, -1.41],
								['c', 0.18, -0.69, 0.09, -1.47, -0.18, -2.07],
								['c', -0.15, -0.3, -0.33, -0.51, -0.6, -0.63],
								['z'],
								['m', 3, -11],
								['c', 0.33, -0.06, 0.87, 0, 1.08, 0.15],
								['c', 0.06, 0.03, 0.06, 0.36, -0.03, 5.25],
								['c', -0.06, 2.85, -0.09, 5.19, -0.09, 5.19],
								['c', 0, 0.03, 0.12, -0.03, 0.24, -0.12],
								['c', 0.63, -0.42, 1.41, -0.66, 2.19, -0.72],
								['c', 0.81, -0.03, 1.47, 0.21, 2.04, 0.78],
								['c', 0.57, 0.54, 0.87, 1.26, 0.93, 2.04],
								['c', 0.03, 0.57, -0.09, 1.08, -0.36, 1.62],
								['c', -0.42, 0.81, -1.02, 1.38, -2.82, 2.61],
								['c', -1.14, 0.78, -1.44, 1.02, -1.8, 1.44],
								['c', -0.18, 0.18, -0.39, 0.39, -0.45, 0.42],
								['c', -0.27, 0.18, -0.57, 0.15, -0.81, -0.06],
								['c', -0.06, -0.09, -0.12, -0.18, -0.15, -0.27],
								['c', -0.03, -0.06, -0.09, -3.27, -0.18, -8.34],
								['c', -0.09, -4.53, -0.15, -8.58, -0.18, -9.03],
								['l', 0, -0.78],
								['l', 0.12, -0.06],
								['c', 0.06, -0.03, 0.18, -0.09, 0.27, -0.12],
								['z'],
								['m', 3.18, 11.01],
								['c', -0.21, -0.12, -0.54, -0.15, -0.81, -0.06],
								['c', -0.54, 0.15, -0.99, 0.63, -1.17, 1.26],
								['c', -0.06, 0.3, -0.12, 2.88, -0.06, 3.87],
								['c', 0.03, 0.42, 0.03, 0.81, 0.06, 0.9],
								['l', 0.03, 0.12],
								['l', 0.45, -0.39],
								['c', 0.63, -0.54, 1.26, -1.17, 1.56, -1.59],
								['c', 0.3, -0.42, 0.6, -0.99, 0.72, -1.41],
								['c', 0.18, -0.69, 0.09, -1.47, -0.18, -2.07],
								['c', -0.15, -0.3, -0.33, -0.51, -0.6, -0.63],
								['z']
							],
							w: 12.1,
							h: 18.804
						},
						'accidentals.dblsharp': {
							d: [
								['M', -0.18, -3.96],
								['c', 0.06, -0.03, 0.12, -0.06, 0.15, -0.06],
								['c', 0.09, 0, 2.76, 0.27, 2.79, 0.3],
								['c', 0.12, 0.03, 0.15, 0.12, 0.15, 0.51],
								['c', 0.06, 0.96, 0.24, 1.59, 0.57, 2.1],
								['c', 0.06, 0.09, 0.15, 0.21, 0.18, 0.24],
								['l', 0.09, 0.06],
								['l', 0.09, -0.06],
								['c', 0.03, -0.03, 0.12, -0.15, 0.18, -0.24],
								['c', 0.33, -0.51, 0.51, -1.14, 0.57, -2.1],
								['c', 0, -0.39, 0.03, -0.45, 0.12, -0.51],
								['c', 0.03, 0, 0.66, -0.09, 1.44, -0.15],
								['c', 1.47, -0.15, 1.5, -0.15, 1.56, -0.03],
								['c', 0.03, 0.06, 0, 0.42, -0.09, 1.44],
								['c', -0.09, 0.72, -0.15, 1.35, -0.15, 1.38],
								['c', 0, 0.03, -0.03, 0.09, -0.06, 0.12],
								['c', -0.06, 0.06, -0.12, 0.09, -0.51, 0.09],
								['c', -1.08, 0.06, -1.8, 0.3, -2.28, 0.75],
								['l', -0.12, 0.09],
								['l', 0.09, 0.09],
								['c', 0.12, 0.15, 0.39, 0.33, 0.63, 0.45],
								['c', 0.42, 0.18, 0.96, 0.27, 1.68, 0.33],
								['c', 0.39, 0, 0.45, 0.03, 0.51, 0.09],
								['c', 0.03, 0.03, 0.06, 0.09, 0.06, 0.12],
								['c', 0, 0.03, 0.06, 0.66, 0.15, 1.38],
								['c', 0.09, 1.02, 0.12, 1.38, 0.09, 1.44],
								['c', -0.06, 0.12, -0.09, 0.12, -1.56, -0.03],
								['c', -0.78, -0.06, -1.41, -0.15, -1.44, -0.15],
								['c', -0.09, -0.06, -0.12, -0.12, -0.12, -0.54],
								['c', -0.06, -0.93, -0.24, -1.56, -0.57, -2.07],
								['c', -0.06, -0.09, -0.15, -0.21, -0.18, -0.24],
								['l', -0.09, -0.06],
								['l', -0.09, 0.06],
								['c', -0.03, 0.03, -0.12, 0.15, -0.18, 0.24],
								['c', -0.33, 0.51, -0.51, 1.14, -0.57, 2.07],
								['c', 0, 0.42, -0.03, 0.48, -0.12, 0.54],
								['c', -0.03, 0, -0.66, 0.09, -1.44, 0.15],
								['c', -1.47, 0.15, -1.5, 0.15, -1.56, 0.03],
								['c', -0.03, -0.06, 0, -0.42, 0.09, -1.44],
								['c', 0.09, -0.72, 0.15, -1.35, 0.15, -1.38],
								['c', 0, -0.03, 0.03, -0.09, 0.06, -0.12],
								['c', 0.06, -0.06, 0.12, -0.09, 0.51, -0.09],
								['c', 0.72, -0.06, 1.26, -0.15, 1.68, -0.33],
								['c', 0.24, -0.12, 0.51, -0.3, 0.63, -0.45],
								['l', 0.09, -0.09],
								['l', -0.12, -0.09],
								['c', -0.48, -0.45, -1.2, -0.69, -2.28, -0.75],
								['c', -0.39, 0, -0.45, -0.03, -0.51, -0.09],
								['c', -0.03, -0.03, -0.06, -0.09, -0.06, -0.12],
								['c', 0, -0.03, -0.06, -0.63, -0.12, -1.38],
								['c', -0.09, -0.72, -0.15, -1.35, -0.15, -1.38],
								['z']
							],
							w: 7.95,
							h: 7.977
						},
						'dots.dot': {
							d: [
								['M', 1.32, -1.68],
								['c', 0.09, -0.03, 0.27, -0.06, 0.39, -0.06],
								['c', 0.96, 0, 1.74, 0.78, 1.74, 1.71],
								['c', 0, 0.96, -0.78, 1.74, -1.71, 1.74],
								['c', -0.96, 0, -1.74, -0.78, -1.74, -1.71],
								['c', 0, -0.78, 0.54, -1.5, 1.32, -1.68],
								['z']
							],
							w: 3.45,
							h: 3.45
						},
						'noteheads.dbl': {
							d: [
								['M', -0.69, -4.02],
								['c', 0.18, -0.09, 0.36, -0.09, 0.54, 0],
								['c', 0.18, 0.09, 0.24, 0.15, 0.33, 0.3],
								['c', 0.06, 0.15, 0.06, 0.18, 0.06, 1.41],
								['l', 0, 1.23],
								['l', 0.12, -0.18],
								['c', 0.72, -1.26, 2.64, -2.31, 4.86, -2.64],
								['c', 0.81, -0.15, 1.11, -0.15, 2.13, -0.15],
								['c', 0.99, 0, 1.29, 0, 2.1, 0.15],
								['c', 0.75, 0.12, 1.38, 0.27, 2.04, 0.54],
								['c', 1.35, 0.51, 2.34, 1.26, 2.82, 2.1],
								['l', 0.12, 0.18],
								['l', 0, -1.23],
								['c', 0, -1.2, 0, -1.26, 0.06, -1.38],
								['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
								['c', 0.18, -0.09, 0.36, -0.09, 0.54, 0],
								['c', 0.18, 0.09, 0.24, 0.15, 0.33, 0.3],
								['l', 0.06, 0.15],
								['l', 0, 3.54],
								['l', 0, 3.54],
								['l', -0.06, 0.15],
								['c', -0.09, 0.18, -0.15, 0.24, -0.33, 0.33],
								['c', -0.18, 0.09, -0.36, 0.09, -0.54, 0],
								['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
								['c', -0.06, -0.12, -0.06, -0.18, -0.06, -1.38],
								['l', 0, -1.23],
								['l', -0.12, 0.18],
								['c', -0.48, 0.84, -1.47, 1.59, -2.82, 2.1],
								['c', -0.84, 0.33, -1.71, 0.54, -2.85, 0.66],
								['c', -0.45, 0.06, -2.16, 0.06, -2.61, 0],
								['c', -1.14, -0.12, -2.01, -0.33, -2.85, -0.66],
								['c', -1.35, -0.51, -2.34, -1.26, -2.82, -2.1],
								['l', -0.12, -0.18],
								['l', 0, 1.23],
								['c', 0, 1.23, 0, 1.26, -0.06, 1.38],
								['c', -0.09, 0.18, -0.15, 0.24, -0.33, 0.33],
								['c', -0.18, 0.09, -0.36, 0.09, -0.54, 0],
								['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
								['l', -0.06, -0.15],
								['l', 0, -3.54],
								['c', 0, -3.48, 0, -3.54, 0.06, -3.66],
								['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
								['z'],
								['m', 7.71, 0.63],
								['c', -0.36, -0.06, -0.9, -0.06, -1.14, 0],
								['c', -0.3, 0.03, -0.66, 0.24, -0.87, 0.42],
								['c', -0.6, 0.54, -0.9, 1.62, -0.75, 2.82],
								['c', 0.12, 0.93, 0.51, 1.68, 1.11, 2.31],
								['c', 0.75, 0.72, 1.83, 1.2, 2.85, 1.26],
								['c', 1.05, 0.06, 1.83, -0.54, 2.1, -1.65],
								['c', 0.21, -0.9, 0.12, -1.95, -0.24, -2.82],
								['c', -0.36, -0.81, -1.08, -1.53, -1.95, -1.95],
								['c', -0.3, -0.15, -0.78, -0.3, -1.11, -0.39],
								['z']
							],
							w: 16.83,
							h: 8.145
						},
						'noteheads.whole': {
							d: [
								['M', 6.51, -4.05],
								['c', 0.51, -0.03, 2.01, 0, 2.52, 0.03],
								['c', 1.41, 0.18, 2.64, 0.51, 3.72, 1.08],
								['c', 1.2, 0.63, 1.95, 1.41, 2.19, 2.31],
								['c', 0.09, 0.33, 0.09, 0.9, 0, 1.23],
								['c', -0.24, 0.9, -0.99, 1.68, -2.19, 2.31],
								['c', -1.08, 0.57, -2.28, 0.9, -3.75, 1.08],
								['c', -0.66, 0.06, -2.31, 0.06, -2.97, 0],
								['c', -1.47, -0.18, -2.67, -0.51, -3.75, -1.08],
								['c', -1.2, -0.63, -1.95, -1.41, -2.19, -2.31],
								['c', -0.09, -0.33, -0.09, -0.9, 0, -1.23],
								['c', 0.24, -0.9, 0.99, -1.68, 2.19, -2.31],
								['c', 1.2, -0.63, 2.61, -0.99, 4.23, -1.11],
								['z'],
								['m', 0.57, 0.66],
								['c', -0.87, -0.15, -1.53, 0, -2.04, 0.51],
								['c', -0.15, 0.15, -0.24, 0.27, -0.33, 0.48],
								['c', -0.24, 0.51, -0.36, 1.08, -0.33, 1.77],
								['c', 0.03, 0.69, 0.18, 1.26, 0.42, 1.77],
								['c', 0.6, 1.17, 1.74, 1.98, 3.18, 2.22],
								['c', 1.11, 0.21, 1.95, -0.15, 2.34, -0.99],
								['c', 0.24, -0.51, 0.36, -1.08, 0.33, -1.8],
								['c', -0.06, -1.11, -0.45, -2.04, -1.17, -2.76],
								['c', -0.63, -0.63, -1.47, -1.05, -2.4, -1.2],
								['z']
							],
							w: 14.985,
							h: 8.097
						},
						'noteheads.half': {
							d: [
								['M', 7.44, -4.05],
								['c', 0.06, -0.03, 0.27, -0.03, 0.48, -0.03],
								['c', 1.05, 0, 1.71, 0.24, 2.1, 0.81],
								['c', 0.42, 0.6, 0.45, 1.35, 0.18, 2.4],
								['c', -0.42, 1.59, -1.14, 2.73, -2.16, 3.39],
								['c', -1.41, 0.93, -3.18, 1.44, -5.4, 1.53],
								['c', -1.17, 0.03, -1.89, -0.21, -2.28, -0.81],
								['c', -0.42, -0.6, -0.45, -1.35, -0.18, -2.4],
								['c', 0.42, -1.59, 1.14, -2.73, 2.16, -3.39],
								['c', 0.63, -0.42, 1.23, -0.72, 1.98, -0.96],
								['c', 0.9, -0.3, 1.65, -0.42, 3.12, -0.54],
								['z'],
								['m', 1.29, 0.87],
								['c', -0.27, -0.09, -0.63, -0.12, -0.9, -0.03],
								['c', -0.72, 0.24, -1.53, 0.69, -3.27, 1.8],
								['c', -2.34, 1.5, -3.3, 2.25, -3.57, 2.79],
								['c', -0.36, 0.72, -0.06, 1.5, 0.66, 1.77],
								['c', 0.24, 0.12, 0.69, 0.09, 0.99, 0],
								['c', 0.84, -0.3, 1.92, -0.93, 4.14, -2.37],
								['c', 1.62, -1.08, 2.37, -1.71, 2.61, -2.19],
								['c', 0.36, -0.72, 0.06, -1.5, -0.66, -1.77],
								['z']
							],
							w: 10.37,
							h: 8.132
						},
						'noteheads.quarter': {
							d: [
								['M', 6.09, -4.05],
								['c', 0.36, -0.03, 1.2, 0, 1.53, 0.06],
								['c', 1.17, 0.24, 1.89, 0.84, 2.16, 1.83],
								['c', 0.06, 0.18, 0.06, 0.3, 0.06, 0.66],
								['c', 0, 0.45, 0, 0.63, -0.15, 1.08],
								['c', -0.66, 2.04, -3.06, 3.93, -5.52, 4.38],
								['c', -0.54, 0.09, -1.44, 0.09, -1.83, 0.03],
								['c', -1.23, -0.27, -1.98, -0.87, -2.25, -1.86],
								['c', -0.06, -0.18, -0.06, -0.3, -0.06, -0.66],
								['c', 0, -0.45, 0, -0.63, 0.15, -1.08],
								['c', 0.24, -0.78, 0.75, -1.53, 1.44, -2.22],
								['c', 1.2, -1.2, 2.85, -2.01, 4.47, -2.22],
								['z']
							],
							w: 9.81,
							h: 8.094
						},
						'noteheads.slash.nostem': {
							d: [
								['M', 9.3, -7.77],
								['c', 0.06, -0.06, 0.18, -0.06, 1.71, -0.06],
								['l', 1.65, 0],
								['l', 0.09, 0.09],
								['c', 0.06, 0.06, 0.06, 0.09, 0.06, 0.15],
								['c', -0.03, 0.12, -9.21, 15.24, -9.3, 15.33],
								['c', -0.06, 0.06, -0.18, 0.06, -1.71, 0.06],
								['l', -1.65, 0],
								['l', -0.09, -0.09],
								['c', -0.06, -0.06, -0.06, -0.09, -0.06, -0.15],
								['c', 0.03, -0.12, 9.21, -15.24, 9.3, -15.33],
								['z']
							],
							w: 12.81,
							h: 15.63
						},
						'noteheads.indeterminate': {
							d: [
								['M', 0.78, -4.05],
								['c', 0.12, -0.03, 0.24, -0.03, 0.36, 0.03],
								['c', 0.03, 0.03, 0.93, 0.72, 1.95, 1.56],
								['l', 1.86, 1.5],
								['l', 1.86, -1.5],
								['c', 1.02, -0.84, 1.92, -1.53, 1.95, -1.56],
								['c', 0.21, -0.12, 0.33, -0.09, 0.75, 0.24],
								['c', 0.3, 0.27, 0.36, 0.36, 0.36, 0.54],
								['c', 0, 0.03, -0.03, 0.12, -0.06, 0.18],
								['c', -0.03, 0.06, -0.9, 0.75, -1.89, 1.56],
								['l', -1.8, 1.47],
								['c', 0, 0.03, 0.81, 0.69, 1.8, 1.5],
								['c', 0.99, 0.81, 1.86, 1.5, 1.89, 1.56],
								['c', 0.03, 0.06, 0.06, 0.15, 0.06, 0.18],
								['c', 0, 0.18, -0.06, 0.27, -0.36, 0.54],
								['c', -0.42, 0.33, -0.54, 0.36, -0.75, 0.24],
								['c', -0.03, -0.03, -0.93, -0.72, -1.95, -1.56],
								['l', -1.86, -1.5],
								['l', -1.86, 1.5],
								['c', -1.02, 0.84, -1.92, 1.53, -1.95, 1.56],
								['c', -0.21, 0.12, -0.33, 0.09, -0.75, -0.24],
								['c', -0.3, -0.27, -0.36, -0.36, -0.36, -0.54],
								['c', 0, -0.03, 0.03, -0.12, 0.06, -0.18],
								['c', 0.03, -0.06, 0.9, -0.75, 1.89, -1.56],
								['l', 1.8, -1.47],
								['c', 0, -0.03, -0.81, -0.69, -1.8, -1.5],
								['c', -0.99, -0.81, -1.86, -1.5, -1.89, -1.56],
								['c', -0.06, -0.12, -0.09, -0.21, -0.03, -0.36],
								['c', 0.03, -0.09, 0.57, -0.57, 0.72, -0.63],
								['z']
							],
							w: 9.843,
							h: 8.139
						},
						'scripts.ufermata': {
							d: [
								['M', -0.75, -10.77],
								['c', 0.12, 0, 0.45, -0.03, 0.69, -0.03],
								['c', 2.91, -0.03, 5.55, 1.53, 7.41, 4.35],
								['c', 1.17, 1.71, 1.95, 3.72, 2.43, 6.03],
								['c', 0.12, 0.51, 0.12, 0.57, 0.03, 0.69],
								['c', -0.12, 0.21, -0.48, 0.27, -0.69, 0.12],
								['c', -0.12, -0.09, -0.18, -0.24, -0.27, -0.69],
								['c', -0.78, -3.63, -3.42, -6.54, -6.78, -7.38],
								['c', -0.78, -0.21, -1.2, -0.24, -2.07, -0.24],
								['c', -0.63, 0, -0.84, 0, -1.2, 0.06],
								['c', -1.83, 0.27, -3.42, 1.08, -4.8, 2.37],
								['c', -1.41, 1.35, -2.4, 3.21, -2.85, 5.19],
								['c', -0.09, 0.45, -0.15, 0.6, -0.27, 0.69],
								['c', -0.21, 0.15, -0.57, 0.09, -0.69, -0.12],
								['c', -0.09, -0.12, -0.09, -0.18, 0.03, -0.69],
								['c', 0.33, -1.62, 0.78, -3, 1.47, -4.38],
								['c', 1.77, -3.54, 4.44, -5.67, 7.56, -5.97],
								['z'],
								['m', 0.33, 7.47],
								['c', 1.38, -0.3, 2.58, 0.9, 2.31, 2.25],
								['c', -0.15, 0.72, -0.78, 1.35, -1.47, 1.5],
								['c', -1.38, 0.27, -2.58, -0.93, -2.31, -2.31],
								['c', 0.15, -0.69, 0.78, -1.29, 1.47, -1.44],
								['z']
							],
							w: 19.748,
							h: 11.289
						},
						'scripts.dfermata': {
							d: [
								['M', -9.63, -0.42],
								['c', 0.15, -0.09, 0.36, -0.06, 0.51, 0.03],
								['c', 0.12, 0.09, 0.18, 0.24, 0.27, 0.66],
								['c', 0.78, 3.66, 3.42, 6.57, 6.78, 7.41],
								['c', 0.78, 0.21, 1.2, 0.24, 2.07, 0.24],
								['c', 0.63, 0, 0.84, 0, 1.2, -0.06],
								['c', 1.83, -0.27, 3.42, -1.08, 4.8, -2.37],
								['c', 1.41, -1.35, 2.4, -3.21, 2.85, -5.22],
								['c', 0.09, -0.42, 0.15, -0.57, 0.27, -0.66],
								['c', 0.21, -0.15, 0.57, -0.09, 0.69, 0.12],
								['c', 0.09, 0.12, 0.09, 0.18, -0.03, 0.69],
								['c', -0.33, 1.62, -0.78, 3, -1.47, 4.38],
								['c', -1.92, 3.84, -4.89, 6, -8.31, 6],
								['c', -3.42, 0, -6.39, -2.16, -8.31, -6],
								['c', -0.48, -0.96, -0.84, -1.92, -1.14, -2.97],
								['c', -0.18, -0.69, -0.42, -1.74, -0.42, -1.92],
								['c', 0, -0.12, 0.09, -0.27, 0.24, -0.33],
								['z'],
								['m', 9.21, 0],
								['c', 1.2, -0.27, 2.34, 0.63, 2.34, 1.86],
								['c', 0, 0.9, -0.66, 1.68, -1.5, 1.89],
								['c', -1.38, 0.27, -2.58, -0.93, -2.31, -2.31],
								['c', 0.15, -0.69, 0.78, -1.29, 1.47, -1.44],
								['z']
							],
							w: 19.744,
							h: 11.274
						},
						'scripts.sforzato': {
							d: [
								['M', -6.45, -3.69],
								['c', 0.06, -0.03, 0.15, -0.06, 0.18, -0.06],
								['c', 0.06, 0, 2.85, 0.72, 6.24, 1.59],
								['l', 6.33, 1.65],
								['c', 0.33, 0.06, 0.45, 0.21, 0.45, 0.51],
								['c', 0, 0.3, -0.12, 0.45, -0.45, 0.51],
								['l', -6.33, 1.65],
								['c', -3.39, 0.87, -6.18, 1.59, -6.21, 1.59],
								['c', -0.21, 0, -0.48, -0.24, -0.51, -0.45],
								['c', 0, -0.15, 0.06, -0.36, 0.18, -0.45],
								['c', 0.09, -0.06, 0.87, -0.27, 3.84, -1.05],
								['c', 2.04, -0.54, 3.84, -0.99, 4.02, -1.02],
								['c', 0.15, -0.06, 1.14, -0.24, 2.22, -0.42],
								['c', 1.05, -0.18, 1.92, -0.36, 1.92, -0.36],
								['c', 0, 0, -0.87, -0.18, -1.92, -0.36],
								['c', -1.08, -0.18, -2.07, -0.36, -2.22, -0.42],
								['c', -0.18, -0.03, -1.98, -0.48, -4.02, -1.02],
								['c', -2.97, -0.78, -3.75, -0.99, -3.84, -1.05],
								['c', -0.12, -0.09, -0.18, -0.3, -0.18, -0.45],
								['c', 0.03, -0.15, 0.15, -0.3, 0.3, -0.39],
								['z']
							],
							w: 13.5,
							h: 7.5
						},
						'scripts.staccato': {
							d: [
								['M', -0.36, -1.47],
								['c', 0.93, -0.21, 1.86, 0.51, 1.86, 1.47],
								['c', 0, 0.93, -0.87, 1.65, -1.8, 1.47],
								['c', -0.54, -0.12, -1.02, -0.57, -1.14, -1.08],
								['c', -0.21, -0.81, 0.27, -1.65, 1.08, -1.86],
								['z']
							],
							w: 2.989,
							h: 3.004
						},
						'scripts.tenuto': {
							d: [
								['M', -4.2, -0.48],
								['l', 0.12, -0.06],
								['l', 4.08, 0],
								['l', 4.08, 0],
								['l', 0.12, 0.06],
								['c', 0.39, 0.21, 0.39, 0.75, 0, 0.96],
								['l', -0.12, 0.06],
								['l', -4.08, 0],
								['l', -4.08, 0],
								['l', -0.12, -0.06],
								['c', -0.39, -0.21, -0.39, -0.75, 0, -0.96],
								['z']
							],
							w: 8.985,
							h: 1.08
						},
						'scripts.umarcato': {
							d: [
								['M', -0.15, -8.19],
								['c', 0.15, -0.12, 0.36, -0.03, 0.45, 0.15],
								['c', 0.21, 0.42, 3.45, 7.65, 3.45, 7.71],
								['c', 0, 0.12, -0.12, 0.27, -0.21, 0.3],
								['c', -0.03, 0.03, -0.51, 0.03, -1.14, 0.03],
								['c', -1.05, 0, -1.08, 0, -1.17, -0.06],
								['c', -0.09, -0.06, -0.24, -0.36, -1.17, -2.4],
								['c', -0.57, -1.29, -1.05, -2.34, -1.08, -2.34],
								['c', 0, -0.03, -0.51, 1.02, -1.08, 2.34],
								['c', -0.93, 2.07, -1.08, 2.34, -1.14, 2.4],
								['c', -0.06, 0.03, -0.15, 0.06, -0.18, 0.06],
								['c', -0.15, 0, -0.33, -0.18, -0.33, -0.33],
								['c', 0, -0.06, 3.24, -7.32, 3.45, -7.71],
								['c', 0.03, -0.06, 0.09, -0.15, 0.15, -0.15],
								['z']
							],
							w: 7.5,
							h: 8.245
						},
						'scripts.dmarcato': {
							d: [
								['M', -3.57, 0.03],
								['c', 0.03, 0, 0.57, -0.03, 1.17, -0.03],
								['c', 1.05, 0, 1.08, 0, 1.17, 0.06],
								['c', 0.09, 0.06, 0.24, 0.36, 1.17, 2.4],
								['c', 0.57, 1.29, 1.05, 2.34, 1.08, 2.34],
								['c', 0, 0.03, 0.51, -1.02, 1.08, -2.34],
								['c', 0.93, -2.07, 1.08, -2.34, 1.14, -2.4],
								['c', 0.06, -0.03, 0.15, -0.06, 0.18, -0.06],
								['c', 0.15, 0, 0.33, 0.18, 0.33, 0.33],
								['c', 0, 0.09, -3.45, 7.74, -3.54, 7.83],
								['c', -0.12, 0.12, -0.3, 0.12, -0.42, 0],
								['c', -0.09, -0.09, -3.54, -7.74, -3.54, -7.83],
								['c', 0, -0.09, 0.12, -0.27, 0.18, -0.3],
								['z']
							],
							w: 7.5,
							h: 8.25
						},
						'scripts.stopped': {
							d: [
								['M', -0.27, -4.08],
								['c', 0.18, -0.09, 0.36, -0.09, 0.54, 0],
								['c', 0.18, 0.09, 0.24, 0.15, 0.33, 0.3],
								['l', 0.06, 0.15],
								['l', 0, 1.5],
								['l', 0, 1.47],
								['l', 1.47, 0],
								['l', 1.5, 0],
								['l', 0.15, 0.06],
								['c', 0.15, 0.09, 0.21, 0.15, 0.3, 0.33],
								['c', 0.09, 0.18, 0.09, 0.36, 0, 0.54],
								['c', -0.09, 0.18, -0.15, 0.24, -0.33, 0.33],
								['c', -0.12, 0.06, -0.18, 0.06, -1.62, 0.06],
								['l', -1.47, 0],
								['l', 0, 1.47],
								['l', 0, 1.47],
								['l', -0.06, 0.15],
								['c', -0.09, 0.18, -0.15, 0.24, -0.33, 0.33],
								['c', -0.18, 0.09, -0.36, 0.09, -0.54, 0],
								['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
								['l', -0.06, -0.15],
								['l', 0, -1.47],
								['l', 0, -1.47],
								['l', -1.47, 0],
								['c', -1.44, 0, -1.5, 0, -1.62, -0.06],
								['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
								['c', -0.09, -0.18, -0.09, -0.36, 0, -0.54],
								['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
								['l', 0.15, -0.06],
								['l', 1.47, 0],
								['l', 1.47, 0],
								['l', 0, -1.47],
								['c', 0, -1.44, 0, -1.5, 0.06, -1.62],
								['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
								['z']
							],
							w: 8.295,
							h: 8.295
						},
						'scripts.upbow': {
							d: [
								['M', -4.65, -15.54],
								['c', 0.12, -0.09, 0.36, -0.06, 0.48, 0.03],
								['c', 0.03, 0.03, 0.09, 0.09, 0.12, 0.15],
								['c', 0.03, 0.06, 0.66, 2.13, 1.41, 4.62],
								['c', 1.35, 4.41, 1.38, 4.56, 2.01, 6.96],
								['l', 0.63, 2.46],
								['l', 0.63, -2.46],
								['c', 0.63, -2.4, 0.66, -2.55, 2.01, -6.96],
								['c', 0.75, -2.49, 1.38, -4.56, 1.41, -4.62],
								['c', 0.06, -0.15, 0.18, -0.21, 0.36, -0.24],
								['c', 0.15, 0, 0.3, 0.06, 0.39, 0.18],
								['c', 0.15, 0.21, 0.24, -0.18, -2.1, 7.56],
								['c', -1.2, 3.96, -2.22, 7.32, -2.25, 7.41],
								['c', 0, 0.12, -0.06, 0.27, -0.09, 0.3],
								['c', -0.12, 0.21, -0.6, 0.21, -0.72, 0],
								['c', -0.03, -0.03, -0.09, -0.18, -0.09, -0.3],
								['c', -0.03, -0.09, -1.05, -3.45, -2.25, -7.41],
								['c', -2.34, -7.74, -2.25, -7.35, -2.1, -7.56],
								['c', 0.03, -0.03, 0.09, -0.09, 0.15, -0.12],
								['z']
							],
							w: 9.73,
							h: 15.608
						},
						'scripts.downbow': {
							d: [
								['M', -5.55, -9.93],
								['l', 0.09, -0.06],
								['l', 5.46, 0],
								['l', 5.46, 0],
								['l', 0.09, 0.06],
								['l', 0.06, 0.09],
								['l', 0, 4.77],
								['c', 0, 5.28, 0, 4.89, -0.18, 5.01],
								['c', -0.18, 0.12, -0.42, 0.06, -0.54, -0.12],
								['c', -0.06, -0.09, -0.06, -0.18, -0.06, -2.97],
								['l', 0, -2.85],
								['l', -4.83, 0],
								['l', -4.83, 0],
								['l', 0, 2.85],
								['c', 0, 2.79, 0, 2.88, -0.06, 2.97],
								['c', -0.15, 0.24, -0.51, 0.24, -0.66, 0],
								['c', -0.06, -0.09, -0.06, -0.21, -0.06, -4.89],
								['l', 0, -4.77],
								['z']
							],
							w: 11.22,
							h: 9.992
						},
						'scripts.turn': {
							d: [
								['M', -4.77, -3.9],
								['c', 0.36, -0.06, 1.05, -0.06, 1.44, 0.03],
								['c', 0.78, 0.15, 1.5, 0.51, 2.34, 1.14],
								['c', 0.6, 0.45, 1.05, 0.87, 2.22, 2.01],
								['c', 1.11, 1.08, 1.62, 1.5, 2.22, 1.86],
								['c', 0.6, 0.36, 1.32, 0.57, 1.92, 0.57],
								['c', 0.9, 0, 1.71, -0.57, 1.89, -1.35],
								['c', 0.24, -0.93, -0.39, -1.89, -1.35, -2.1],
								['l', -0.15, -0.06],
								['l', -0.09, 0.15],
								['c', -0.03, 0.09, -0.15, 0.24, -0.24, 0.33],
								['c', -0.72, 0.72, -2.04, 0.54, -2.49, -0.36],
								['c', -0.48, -0.93, 0.03, -1.86, 1.17, -2.19],
								['c', 0.3, -0.09, 1.02, -0.09, 1.35, 0],
								['c', 0.99, 0.27, 1.74, 0.87, 2.25, 1.83],
								['c', 0.69, 1.41, 0.63, 3, -0.21, 4.26],
								['c', -0.21, 0.3, -0.69, 0.81, -0.99, 1.02],
								['c', -0.3, 0.21, -0.84, 0.45, -1.17, 0.54],
								['c', -1.23, 0.36, -2.49, 0.15, -3.72, -0.6],
								['c', -0.75, -0.48, -1.41, -1.02, -2.85, -2.46],
								['c', -1.11, -1.08, -1.62, -1.5, -2.22, -1.86],
								['c', -0.6, -0.36, -1.32, -0.57, -1.92, -0.57],
								['c', -0.9, 0, -1.71, 0.57, -1.89, 1.35],
								['c', -0.24, 0.93, 0.39, 1.89, 1.35, 2.1],
								['l', 0.15, 0.06],
								['l', 0.09, -0.15],
								['c', 0.03, -0.09, 0.15, -0.24, 0.24, -0.33],
								['c', 0.72, -0.72, 2.04, -0.54, 2.49, 0.36],
								['c', 0.48, 0.93, -0.03, 1.86, -1.17, 2.19],
								['c', -0.3, 0.09, -1.02, 0.09, -1.35, 0],
								['c', -0.99, -0.27, -1.74, -0.87, -2.25, -1.83],
								['c', -0.69, -1.41, -0.63, -3, 0.21, -4.26],
								['c', 0.21, -0.3, 0.69, -0.81, 0.99, -1.02],
								['c', 0.48, -0.33, 1.11, -0.57, 1.74, -0.66],
								['z']
							],
							w: 16.366,
							h: 7.893
						},
						'scripts.trill': {
							d: [
								['M', -0.51, -16.02],
								['c', 0.12, -0.09, 0.21, -0.18, 0.21, -0.18],
								['l', -0.81, 4.02],
								['l', -0.81, 4.02],
								['c', 0.03, 0, 0.51, -0.27, 1.08, -0.6],
								['c', 0.6, -0.3, 1.14, -0.63, 1.26, -0.66],
								['c', 1.14, -0.54, 2.31, -0.6, 3.09, -0.18],
								['c', 0.27, 0.15, 0.54, 0.36, 0.6, 0.51],
								['l', 0.06, 0.12],
								['l', 0.21, -0.21],
								['c', 0.9, -0.81, 2.22, -0.99, 3.12, -0.42],
								['c', 0.6, 0.42, 0.9, 1.14, 0.78, 2.07],
								['c', -0.15, 1.29, -1.05, 2.31, -1.95, 2.25],
								['c', -0.48, -0.03, -0.78, -0.3, -0.96, -0.81],
								['c', -0.09, -0.27, -0.09, -0.9, -0.03, -1.2],
								['c', 0.21, -0.75, 0.81, -1.23, 1.59, -1.32],
								['l', 0.24, -0.03],
								['l', -0.09, -0.12],
								['c', -0.51, -0.66, -1.62, -0.63, -2.31, 0.03],
								['c', -0.39, 0.42, -0.3, 0.09, -1.23, 4.77],
								['l', -0.81, 4.14],
								['c', -0.03, 0, -0.12, -0.03, -0.21, -0.09],
								['c', -0.33, -0.15, -0.54, -0.18, -0.99, -0.18],
								['c', -0.42, 0, -0.66, 0.03, -1.05, 0.18],
								['c', -0.12, 0.06, -0.21, 0.09, -0.21, 0.09],
								['c', 0, -0.03, 0.36, -1.86, 0.81, -4.11],
								['c', 0.9, -4.47, 0.87, -4.26, 0.69, -4.53],
								['c', -0.21, -0.36, -0.66, -0.51, -1.17, -0.36],
								['c', -0.15, 0.06, -2.22, 1.14, -2.58, 1.38],
								['c', -0.12, 0.09, -0.12, 0.09, -0.21, 0.6],
								['l', -0.09, 0.51],
								['l', 0.21, 0.24],
								['c', 0.63, 0.75, 1.02, 1.47, 1.2, 2.19],
								['c', 0.06, 0.27, 0.06, 0.36, 0.06, 0.81],
								['c', 0, 0.42, 0, 0.54, -0.06, 0.78],
								['c', -0.15, 0.54, -0.33, 0.93, -0.63, 1.35],
								['c', -0.18, 0.24, -0.57, 0.63, -0.81, 0.78],
								['c', -0.24, 0.15, -0.63, 0.36, -0.84, 0.42],
								['c', -0.27, 0.06, -0.66, 0.06, -0.87, 0.03],
								['c', -0.81, -0.18, -1.32, -1.05, -1.38, -2.46],
								['c', -0.03, -0.6, 0.03, -0.99, 0.33, -2.46],
								['c', 0.21, -1.08, 0.24, -1.32, 0.21, -1.29],
								['c', -1.2, 0.48, -2.4, 0.75, -3.21, 0.72],
								['c', -0.69, -0.06, -1.17, -0.3, -1.41, -0.72],
								['c', -0.39, -0.75, -0.12, -1.8, 0.66, -2.46],
								['c', 0.24, -0.18, 0.69, -0.42, 1.02, -0.51],
								['c', 0.69, -0.18, 1.53, -0.15, 2.31, 0.09],
								['c', 0.3, 0.09, 0.75, 0.3, 0.99, 0.45],
								['c', 0.12, 0.09, 0.15, 0.09, 0.15, 0.03],
								['c', 0.03, -0.03, 0.33, -1.59, 0.72, -3.45],
								['c', 0.36, -1.86, 0.66, -3.42, 0.69, -3.45],
								['c', 0, -0.03, 0.03, -0.03, 0.21, 0.03],
								['c', 0.21, 0.06, 0.27, 0.06, 0.48, 0.06],
								['c', 0.42, -0.03, 0.78, -0.18, 1.26, -0.48],
								['c', 0.15, -0.12, 0.36, -0.27, 0.48, -0.39],
								['z'],
								['m', -5.73, 7.68],
								['c', -0.27, -0.03, -0.96, -0.06, -1.2, -0.03],
								['c', -0.81, 0.12, -1.35, 0.57, -1.5, 1.2],
								['c', -0.18, 0.66, 0.12, 1.14, 0.75, 1.29],
								['c', 0.66, 0.12, 1.92, -0.12, 3.18, -0.66],
								['l', 0.33, -0.15],
								['l', 0.09, -0.39],
								['c', 0.06, -0.21, 0.09, -0.42, 0.09, -0.45],
								['c', 0, -0.03, -0.45, -0.3, -0.75, -0.45],
								['c', -0.27, -0.15, -0.66, -0.27, -0.99, -0.36],
								['z'],
								['m', 4.29, 3.63],
								['c', -0.24, -0.39, -0.51, -0.75, -0.51, -0.69],
								['c', -0.06, 0.12, -0.39, 1.92, -0.45, 2.28],
								['c', -0.09, 0.54, -0.12, 1.14, -0.06, 1.38],
								['c', 0.06, 0.42, 0.21, 0.6, 0.51, 0.57],
								['c', 0.39, -0.06, 0.75, -0.48, 0.93, -1.14],
								['c', 0.09, -0.33, 0.09, -1.05, 0, -1.38],
								['c', -0.09, -0.39, -0.24, -0.69, -0.42, -1.02],
								['z']
							],
							w: 17.963,
							h: 16.49
						},
						'scripts.segno': {
							d: [
								['M', -3.72, -11.22],
								['c', 0.78, -0.09, 1.59, 0.03, 2.31, 0.42],
								['c', 1.2, 0.6, 2.01, 1.71, 2.31, 3.09],
								['c', 0.09, 0.42, 0.09, 1.2, 0.03, 1.5],
								['c', -0.15, 0.45, -0.39, 0.81, -0.66, 0.93],
								['c', -0.33, 0.18, -0.84, 0.21, -1.23, 0.15],
								['c', -0.81, -0.18, -1.32, -0.93, -1.26, -1.89],
								['c', 0.03, -0.36, 0.09, -0.57, 0.24, -0.9],
								['c', 0.15, -0.33, 0.45, -0.6, 0.72, -0.75],
								['c', 0.12, -0.06, 0.18, -0.09, 0.18, -0.12],
								['c', 0, -0.03, -0.03, -0.15, -0.09, -0.24],
								['c', -0.18, -0.45, -0.54, -0.87, -0.96, -1.08],
								['c', -1.11, -0.57, -2.34, -0.18, -2.88, 0.9],
								['c', -0.24, 0.51, -0.33, 1.11, -0.24, 1.83],
								['c', 0.27, 1.92, 1.5, 3.54, 3.93, 5.13],
								['c', 0.48, 0.33, 1.26, 0.78, 1.29, 0.78],
								['c', 0.03, 0, 1.35, -2.19, 2.94, -4.89],
								['l', 2.88, -4.89],
								['l', 0.84, 0],
								['l', 0.87, 0],
								['l', -0.03, 0.06],
								['c', -0.15, 0.21, -6.15, 10.41, -6.15, 10.44],
								['c', 0, 0, 0.21, 0.15, 0.48, 0.27],
								['c', 2.61, 1.47, 4.35, 3.03, 5.13, 4.65],
								['c', 1.14, 2.34, 0.51, 5.07, -1.44, 6.39],
								['c', -0.66, 0.42, -1.32, 0.63, -2.13, 0.69],
								['c', -2.01, 0.09, -3.81, -1.41, -4.26, -3.54],
								['c', -0.09, -0.42, -0.09, -1.2, -0.03, -1.5],
								['c', 0.15, -0.45, 0.39, -0.81, 0.66, -0.93],
								['c', 0.33, -0.18, 0.84, -0.21, 1.23, -0.15],
								['c', 0.81, 0.18, 1.32, 0.93, 1.26, 1.89],
								['c', -0.03, 0.36, -0.09, 0.57, -0.24, 0.9],
								['c', -0.15, 0.33, -0.45, 0.6, -0.72, 0.75],
								['c', -0.12, 0.06, -0.18, 0.09, -0.18, 0.12],
								['c', 0, 0.03, 0.03, 0.15, 0.09, 0.24],
								['c', 0.18, 0.45, 0.54, 0.87, 0.96, 1.08],
								['c', 1.11, 0.57, 2.34, 0.18, 2.88, -0.9],
								['c', 0.24, -0.51, 0.33, -1.11, 0.24, -1.83],
								['c', -0.27, -1.92, -1.5, -3.54, -3.93, -5.13],
								['c', -0.48, -0.33, -1.26, -0.78, -1.29, -0.78],
								['c', -0.03, 0, -1.35, 2.19, -2.91, 4.89],
								['l', -2.88, 4.89],
								['l', -0.87, 0],
								['l', -0.87, 0],
								['l', 0.03, -0.06],
								['c', 0.15, -0.21, 6.15, -10.41, 6.15, -10.44],
								['c', 0, 0, -0.21, -0.15, -0.48, -0.3],
								['c', -2.61, -1.44, -4.35, -3, -5.13, -4.62],
								['c', -0.9, -1.89, -0.72, -4.02, 0.48, -5.52],
								['c', 0.69, -0.84, 1.68, -1.41, 2.73, -1.53],
								['z'],
								['m', 8.76, 9.09],
								['c', 0.03, -0.03, 0.15, -0.03, 0.27, -0.03],
								['c', 0.33, 0.03, 0.57, 0.18, 0.72, 0.48],
								['c', 0.09, 0.18, 0.09, 0.57, 0, 0.75],
								['c', -0.09, 0.18, -0.21, 0.3, -0.36, 0.39],
								['c', -0.15, 0.06, -0.21, 0.06, -0.39, 0.06],
								['c', -0.21, 0, -0.27, 0, -0.39, -0.06],
								['c', -0.3, -0.15, -0.48, -0.45, -0.48, -0.75],
								['c', 0, -0.39, 0.24, -0.72, 0.63, -0.84],
								['z'],
								['m', -10.53, 2.61],
								['c', 0.03, -0.03, 0.15, -0.03, 0.27, -0.03],
								['c', 0.33, 0.03, 0.57, 0.18, 0.72, 0.48],
								['c', 0.09, 0.18, 0.09, 0.57, 0, 0.75],
								['c', -0.09, 0.18, -0.21, 0.3, -0.36, 0.39],
								['c', -0.15, 0.06, -0.21, 0.06, -0.39, 0.06],
								['c', -0.21, 0, -0.27, 0, -0.39, -0.06],
								['c', -0.3, -0.15, -0.48, -0.45, -0.48, -0.75],
								['c', 0, -0.39, 0.24, -0.72, 0.63, -0.84],
								['z']
							],
							w: 15,
							h: 22.504
						},
						'scripts.coda': {
							d: [
								['M', -0.21, -10.47],
								['c', 0.18, -0.12, 0.42, -0.06, 0.54, 0.12],
								['c', 0.06, 0.09, 0.06, 0.18, 0.06, 1.5],
								['l', 0, 1.38],
								['l', 0.18, 0],
								['c', 0.39, 0.06, 0.96, 0.24, 1.38, 0.48],
								['c', 1.68, 0.93, 2.82, 3.24, 3.03, 6.12],
								['c', 0.03, 0.24, 0.03, 0.45, 0.03, 0.45],
								['c', 0, 0.03, 0.6, 0.03, 1.35, 0.03],
								['c', 1.5, 0, 1.47, 0, 1.59, 0.18],
								['c', 0.09, 0.12, 0.09, 0.3, 0, 0.42],
								['c', -0.12, 0.18, -0.09, 0.18, -1.59, 0.18],
								['c', -0.75, 0, -1.35, 0, -1.35, 0.03],
								['c', 0, 0, 0, 0.21, -0.03, 0.42],
								['c', -0.24, 3.15, -1.53, 5.58, -3.45, 6.36],
								['c', -0.27, 0.12, -0.72, 0.24, -0.96, 0.27],
								['l', -0.18, 0],
								['l', 0, 1.38],
								['c', 0, 1.32, 0, 1.41, -0.06, 1.5],
								['c', -0.15, 0.24, -0.51, 0.24, -0.66, 0],
								['c', -0.06, -0.09, -0.06, -0.18, -0.06, -1.5],
								['l', 0, -1.38],
								['l', -0.18, 0],
								['c', -0.39, -0.06, -0.96, -0.24, -1.38, -0.48],
								['c', -1.68, -0.93, -2.82, -3.24, -3.03, -6.15],
								['c', -0.03, -0.21, -0.03, -0.42, -0.03, -0.42],
								['c', 0, -0.03, -0.6, -0.03, -1.35, -0.03],
								['c', -1.5, 0, -1.47, 0, -1.59, -0.18],
								['c', -0.09, -0.12, -0.09, -0.3, 0, -0.42],
								['c', 0.12, -0.18, 0.09, -0.18, 1.59, -0.18],
								['c', 0.75, 0, 1.35, 0, 1.35, -0.03],
								['c', 0, 0, 0, -0.21, 0.03, -0.45],
								['c', 0.24, -3.12, 1.53, -5.55, 3.45, -6.33],
								['c', 0.27, -0.12, 0.72, -0.24, 0.96, -0.27],
								['l', 0.18, 0],
								['l', 0, -1.38],
								['c', 0, -1.53, 0, -1.5, 0.18, -1.62],
								['z'],
								['m', -0.18, 6.93],
								['c', 0, -2.97, 0, -3.15, -0.06, -3.15],
								['c', -0.09, 0, -0.51, 0.15, -0.66, 0.21],
								['c', -0.87, 0.51, -1.38, 1.62, -1.56, 3.51],
								['c', -0.06, 0.54, -0.12, 1.59, -0.12, 2.16],
								['l', 0, 0.42],
								['l', 1.2, 0],
								['l', 1.2, 0],
								['l', 0, -3.15],
								['z'],
								['m', 1.17, -3.06],
								['c', -0.09, -0.03, -0.21, -0.06, -0.27, -0.09],
								['l', -0.12, 0],
								['l', 0, 3.15],
								['l', 0, 3.15],
								['l', 1.2, 0],
								['l', 1.2, 0],
								['l', 0, -0.81],
								['c', -0.06, -2.4, -0.33, -3.69, -0.93, -4.59],
								['c', -0.27, -0.39, -0.66, -0.69, -1.08, -0.81],
								['z'],
								['m', -1.17, 10.14],
								['l', 0, -3.15],
								['l', -1.2, 0],
								['l', -1.2, 0],
								['l', 0, 0.81],
								['c', 0.03, 0.96, 0.06, 1.47, 0.15, 2.13],
								['c', 0.24, 2.04, 0.96, 3.12, 2.13, 3.36],
								['l', 0.12, 0],
								['l', 0, -3.15],
								['z'],
								['m', 3.18, -2.34],
								['l', 0, -0.81],
								['l', -1.2, 0],
								['l', -1.2, 0],
								['l', 0, 3.15],
								['l', 0, 3.15],
								['l', 0.12, 0],
								['c', 1.17, -0.24, 1.89, -1.32, 2.13, -3.36],
								['c', 0.09, -0.66, 0.12, -1.17, 0.15, -2.13],
								['z']
							],
							w: 16.035,
							h: 21.062
						},
						'scripts.comma': {
							d: [
								['M', 1.14, -4.62],
								['c', 0.3, -0.12, 0.69, -0.03, 0.93, 0.15],
								['c', 0.12, 0.12, 0.36, 0.45, 0.51, 0.78],
								['c', 0.9, 1.77, 0.54, 4.05, -1.08, 6.75],
								['c', -0.36, 0.63, -0.87, 1.38, -0.96, 1.44],
								['c', -0.18, 0.12, -0.42, 0.06, -0.54, -0.12],
								['c', -0.09, -0.18, -0.09, -0.3, 0.12, -0.6],
								['c', 0.96, -1.44, 1.44, -2.97, 1.38, -4.35],
								['c', -0.06, -0.93, -0.3, -1.68, -0.78, -2.46],
								['c', -0.27, -0.39, -0.33, -0.63, -0.24, -0.96],
								['c', 0.09, -0.27, 0.36, -0.54, 0.66, -0.63],
								['z']
							],
							w: 3.042,
							h: 9.237
						},
						'scripts.roll': {
							d: [
								['M', 1.95, -6],
								['c', 0.21, -0.09, 0.36, -0.09, 0.57, 0],
								['c', 0.39, 0.15, 0.63, 0.39, 1.47, 1.35],
								['c', 0.66, 0.75, 0.78, 0.87, 1.08, 1.05],
								['c', 0.75, 0.45, 1.65, 0.42, 2.4, -0.06],
								['c', 0.12, -0.09, 0.27, -0.27, 0.54, -0.6],
								['c', 0.42, -0.54, 0.51, -0.63, 0.69, -0.63],
								['c', 0.09, 0, 0.3, 0.12, 0.36, 0.21],
								['c', 0.09, 0.12, 0.12, 0.3, 0.03, 0.42],
								['c', -0.06, 0.12, -3.15, 3.9, -3.3, 4.08],
								['c', -0.06, 0.06, -0.18, 0.12, -0.27, 0.18],
								['c', -0.27, 0.12, -0.6, 0.06, -0.99, -0.27],
								['c', -0.27, -0.21, -0.42, -0.39, -1.08, -1.14],
								['c', -0.63, -0.72, -0.81, -0.9, -1.17, -1.08],
								['c', -0.36, -0.18, -0.57, -0.21, -0.99, -0.21],
								['c', -0.39, 0, -0.63, 0.03, -0.93, 0.18],
								['c', -0.36, 0.15, -0.51, 0.27, -0.9, 0.81],
								['c', -0.24, 0.27, -0.45, 0.51, -0.48, 0.54],
								['c', -0.12, 0.09, -0.27, 0.06, -0.39, 0],
								['c', -0.24, -0.15, -0.33, -0.39, -0.21, -0.6],
								['c', 0.09, -0.12, 3.18, -3.87, 3.33, -4.02],
								['c', 0.06, -0.06, 0.18, -0.15, 0.24, -0.21],
								['z']
							],
							w: 10.817,
							h: 6.125
						},
						'scripts.prall': {
							d: [
								['M', -4.38, -3.69],
								['c', 0.06, -0.03, 0.18, -0.06, 0.24, -0.06],
								['c', 0.3, 0, 0.27, -0.03, 1.89, 1.95],
								['l', 1.53, 1.83],
								['c', 0.03, 0, 0.57, -0.84, 1.23, -1.83],
								['c', 1.14, -1.68, 1.23, -1.83, 1.35, -1.89],
								['c', 0.06, -0.03, 0.18, -0.06, 0.24, -0.06],
								['c', 0.3, 0, 0.27, -0.03, 1.89, 1.95],
								['l', 1.53, 1.83],
								['l', 0.48, -0.69],
								['c', 0.51, -0.78, 0.54, -0.84, 0.69, -0.9],
								['c', 0.42, -0.18, 0.87, 0.15, 0.81, 0.6],
								['c', -0.03, 0.12, -0.3, 0.51, -1.5, 2.37],
								['c', -1.38, 2.07, -1.5, 2.22, -1.62, 2.28],
								['c', -0.06, 0.03, -0.18, 0.06, -0.24, 0.06],
								['c', -0.3, 0, -0.27, 0.03, -1.89, -1.95],
								['l', -1.53, -1.83],
								['c', -0.03, 0, -0.57, 0.84, -1.23, 1.83],
								['c', -1.14, 1.68, -1.23, 1.83, -1.35, 1.89],
								['c', -0.06, 0.03, -0.18, 0.06, -0.24, 0.06],
								['c', -0.3, 0, -0.27, 0.03, -1.89, -1.95],
								['l', -1.53, -1.83],
								['l', -0.48, 0.69],
								['c', -0.51, 0.78, -0.54, 0.84, -0.69, 0.9],
								['c', -0.42, 0.18, -0.87, -0.15, -0.81, -0.6],
								['c', 0.03, -0.12, 0.3, -0.51, 1.5, -2.37],
								['c', 1.38, -2.07, 1.5, -2.22, 1.62, -2.28],
								['z']
							],
							w: 15.011,
							h: 7.5
						},
						'scripts.arpeggio': {
							d: [
								['M', 1.5, 0],
								['c', 1.5, 2, 1.5, 3, 1.5, 3],
								['s', 0, 1, -2, 1.5],
								['s', -0.5, 3, 1, 5.5],
								['l', 1.5, 0],
								['s', -1.75, -2, -1.9, -3.25],
								['s', 2.15, -0.6, 2.95, -1.6],
								['s', 0.45, -1, 0.5, -1.25],
								['s', 0, -1, -2, -3.9],
								['l', -1.5, 0],
								['z']
							],
							w: 5,
							h: 10
						},
						'scripts.mordent': {
							d: [
								['M', -0.21, -4.95],
								['c', 0.27, -0.15, 0.63, 0, 0.75, 0.27],
								['c', 0.06, 0.12, 0.06, 0.24, 0.06, 1.44],
								['l', 0, 1.29],
								['l', 0.57, -0.84],
								['c', 0.51, -0.75, 0.57, -0.84, 0.69, -0.9],
								['c', 0.06, -0.03, 0.18, -0.06, 0.24, -0.06],
								['c', 0.3, 0, 0.27, -0.03, 1.89, 1.95],
								['l', 1.53, 1.83],
								['l', 0.48, -0.69],
								['c', 0.51, -0.78, 0.54, -0.84, 0.69, -0.9],
								['c', 0.42, -0.18, 0.87, 0.15, 0.81, 0.6],
								['c', -0.03, 0.12, -0.3, 0.51, -1.5, 2.37],
								['c', -1.38, 2.07, -1.5, 2.22, -1.62, 2.28],
								['c', -0.06, 0.03, -0.18, 0.06, -0.24, 0.06],
								['c', -0.3, 0, -0.27, 0.03, -1.83, -1.89],
								['c', -0.81, -0.99, -1.5, -1.8, -1.53, -1.86],
								['c', -0.06, -0.03, -0.06, -0.03, -0.12, 0.03],
								['c', -0.06, 0.06, -0.06, 0.15, -0.06, 2.28],
								['c', 0, 1.95, 0, 2.25, -0.06, 2.34],
								['c', -0.18, 0.45, -0.81, 0.48, -1.05, 0.03],
								['c', -0.03, -0.06, -0.06, -0.24, -0.06, -1.41],
								['l', 0, -1.35],
								['l', -0.57, 0.84],
								['c', -0.54, 0.78, -0.6, 0.87, -0.72, 0.93],
								['c', -0.06, 0.03, -0.18, 0.06, -0.24, 0.06],
								['c', -0.3, 0, -0.27, 0.03, -1.89, -1.95],
								['l', -1.53, -1.83],
								['l', -0.48, 0.69],
								['c', -0.51, 0.78, -0.54, 0.84, -0.69, 0.9],
								['c', -0.42, 0.18, -0.87, -0.15, -0.81, -0.6],
								['c', 0.03, -0.12, 0.3, -0.51, 1.5, -2.37],
								['c', 1.38, -2.07, 1.5, -2.22, 1.62, -2.28],
								['c', 0.06, -0.03, 0.18, -0.06, 0.24, -0.06],
								['c', 0.3, 0, 0.27, -0.03, 1.89, 1.95],
								['l', 1.53, 1.83],
								['c', 0.03, 0, 0.06, -0.06, 0.09, -0.09],
								['c', 0.06, -0.12, 0.06, -0.15, 0.06, -2.28],
								['c', 0, -1.92, 0, -2.22, 0.06, -2.31],
								['c', 0.06, -0.15, 0.15, -0.24, 0.3, -0.3],
								['z']
							],
							w: 15.011,
							h: 10.012
						},
						'flags.u8th': {
							d: [
								['M', -0.42, 3.75],
								['l', 0, -3.75],
								['l', 0.21, 0],
								['l', 0.21, 0],
								['l', 0, 0.18],
								['c', 0, 0.3, 0.06, 0.84, 0.12, 1.23],
								['c', 0.24, 1.53, 0.9, 3.12, 2.13, 5.16],
								['l', 0.99, 1.59],
								['c', 0.87, 1.44, 1.38, 2.34, 1.77, 3.09],
								['c', 0.81, 1.68, 1.2, 3.06, 1.26, 4.53],
								['c', 0.03, 1.53, -0.21, 3.27, -0.75, 5.01],
								['c', -0.21, 0.69, -0.51, 1.5, -0.6, 1.59],
								['c', -0.09, 0.12, -0.27, 0.21, -0.42, 0.21],
								['c', -0.15, 0, -0.42, -0.12, -0.51, -0.21],
								['c', -0.15, -0.18, -0.18, -0.42, -0.09, -0.66],
								['c', 0.15, -0.33, 0.45, -1.2, 0.57, -1.62],
								['c', 0.42, -1.38, 0.6, -2.58, 0.6, -3.9],
								['c', 0, -0.66, 0, -0.81, -0.06, -1.11],
								['c', -0.39, -2.07, -1.8, -4.26, -4.59, -7.14],
								['l', -0.42, -0.45],
								['l', -0.21, 0],
								['l', -0.21, 0],
								['l', 0, -3.75],
								['z']
							],
							w: 6.692,
							h: 22.59
						},
						'flags.u16th': {
							d: [
								['M', -0.42, 7.5],
								['l', 0, -7.5],
								['l', 0.21, 0],
								['l', 0.21, 0],
								['l', 0, 0.39],
								['c', 0.06, 1.08, 0.39, 2.19, 0.99, 3.39],
								['c', 0.45, 0.9, 0.87, 1.59, 1.95, 3.12],
								['c', 1.29, 1.86, 1.77, 2.64, 2.22, 3.57],
								['c', 0.45, 0.93, 0.72, 1.8, 0.87, 2.64],
								['c', 0.06, 0.51, 0.06, 1.5, 0, 1.92],
								['c', -0.12, 0.6, -0.3, 1.2, -0.54, 1.71],
								['l', -0.09, 0.24],
								['l', 0.18, 0.45],
								['c', 0.51, 1.2, 0.72, 2.22, 0.69, 3.42],
								['c', -0.06, 1.53, -0.39, 3.03, -0.99, 4.53],
								['c', -0.3, 0.75, -0.36, 0.81, -0.57, 0.9],
								['c', -0.15, 0.09, -0.33, 0.06, -0.48, 0],
								['c', -0.18, -0.09, -0.27, -0.18, -0.33, -0.33],
								['c', -0.09, -0.18, -0.06, -0.3, 0.12, -0.75],
								['c', 0.66, -1.41, 1.02, -2.88, 1.08, -4.32],
								['c', 0, -0.6, -0.03, -1.05, -0.18, -1.59],
								['c', -0.3, -1.2, -0.99, -2.4, -2.25, -3.87],
								['c', -0.42, -0.48, -1.53, -1.62, -2.19, -2.22],
								['l', -0.45, -0.42],
								['l', -0.03, 1.11],
								['l', 0, 1.11],
								['l', -0.21, 0],
								['l', -0.21, 0],
								['l', 0, -7.5],
								['z'],
								['m', 1.65, 0.09],
								['c', -0.3, -0.3, -0.69, -0.72, -0.9, -0.87],
								['l', -0.33, -0.33],
								['l', 0, 0.15],
								['c', 0, 0.3, 0.06, 0.81, 0.15, 1.26],
								['c', 0.27, 1.29, 0.87, 2.61, 2.04, 4.29],
								['c', 0.15, 0.24, 0.6, 0.87, 0.96, 1.38],
								['l', 1.08, 1.53],
								['l', 0.42, 0.63],
								['c', 0.03, 0, 0.12, -0.36, 0.21, -0.72],
								['c', 0.06, -0.33, 0.06, -1.2, 0, -1.62],
								['c', -0.33, -1.71, -1.44, -3.48, -3.63, -5.7],
								['z']
							],
							w: 6.693,
							h: 26.337
						},
						'flags.u32nd': {
							d: [
								['M', -0.42, 11.25],
								['l', 0, -11.25],
								['l', 0.21, 0],
								['l', 0.21, 0],
								['l', 0, 0.36],
								['c', 0.09, 1.68, 0.69, 3.27, 2.07, 5.46],
								['l', 0.87, 1.35],
								['c', 1.02, 1.62, 1.47, 2.37, 1.86, 3.18],
								['c', 0.48, 1.02, 0.78, 1.92, 0.93, 2.88],
								['c', 0.06, 0.48, 0.06, 1.5, 0, 1.89],
								['c', -0.09, 0.42, -0.21, 0.87, -0.36, 1.26],
								['l', -0.12, 0.3],
								['l', 0.15, 0.39],
								['c', 0.69, 1.56, 0.84, 2.88, 0.54, 4.38],
								['c', -0.09, 0.45, -0.27, 1.08, -0.45, 1.47],
								['l', -0.12, 0.24],
								['l', 0.18, 0.36],
								['c', 0.33, 0.72, 0.57, 1.56, 0.69, 2.34],
								['c', 0.12, 1.02, -0.06, 2.52, -0.42, 3.84],
								['c', -0.27, 0.93, -0.75, 2.13, -0.93, 2.31],
								['c', -0.18, 0.15, -0.45, 0.18, -0.66, 0.09],
								['c', -0.18, -0.09, -0.27, -0.18, -0.33, -0.33],
								['c', -0.09, -0.18, -0.06, -0.3, 0.06, -0.6],
								['c', 0.21, -0.36, 0.42, -0.9, 0.57, -1.38],
								['c', 0.51, -1.41, 0.69, -3.06, 0.48, -4.08],
								['c', -0.15, -0.81, -0.57, -1.68, -1.2, -2.55],
								['c', -0.72, -0.99, -1.83, -2.13, -3.3, -3.33],
								['l', -0.48, -0.42],
								['l', -0.03, 1.53],
								['l', 0, 1.56],
								['l', -0.21, 0],
								['l', -0.21, 0],
								['l', 0, -11.25],
								['z'],
								['m', 1.26, -3.96],
								['c', -0.27, -0.3, -0.54, -0.6, -0.66, -0.72],
								['l', -0.18, -0.21],
								['l', 0, 0.42],
								['c', 0.06, 0.87, 0.24, 1.74, 0.66, 2.67],
								['c', 0.36, 0.87, 0.96, 1.86, 1.92, 3.18],
								['c', 0.21, 0.33, 0.63, 0.87, 0.87, 1.23],
								['c', 0.27, 0.39, 0.6, 0.84, 0.75, 1.08],
								['l', 0.27, 0.39],
								['l', 0.03, -0.12],
								['c', 0.12, -0.45, 0.15, -1.05, 0.09, -1.59],
								['c', -0.27, -1.86, -1.38, -3.78, -3.75, -6.33],
								['z'],
								['m', -0.27, 6.09],
								['c', -0.27, -0.21, -0.48, -0.42, -0.51, -0.45],
								['c', -0.06, -0.03, -0.06, -0.03, -0.06, 0.21],
								['c', 0, 0.9, 0.3, 2.04, 0.81, 3.09],
								['c', 0.48, 1.02, 0.96, 1.77, 2.37, 3.63],
								['c', 0.6, 0.78, 1.05, 1.44, 1.29, 1.77],
								['c', 0.06, 0.12, 0.15, 0.21, 0.15, 0.18],
								['c', 0.03, -0.03, 0.18, -0.57, 0.24, -0.87],
								['c', 0.06, -0.45, 0.06, -1.32, -0.03, -1.74],
								['c', -0.09, -0.48, -0.24, -0.9, -0.51, -1.44],
								['c', -0.66, -1.35, -1.83, -2.7, -3.75, -4.38],
								['z']
							],
							w: 6.697,
							h: 32.145
						},
						'flags.u64th': {
							d: [
								['M', -0.42, 15],
								['l', 0, -15],
								['l', 0.21, 0],
								['l', 0.21, 0],
								['l', 0, 0.36],
								['c', 0.06, 1.2, 0.39, 2.37, 1.02, 3.66],
								['c', 0.39, 0.81, 0.84, 1.56, 1.8, 3.09],
								['c', 0.81, 1.26, 1.05, 1.68, 1.35, 2.22],
								['c', 0.87, 1.5, 1.35, 2.79, 1.56, 4.08],
								['c', 0.06, 0.54, 0.06, 1.56, -0.03, 2.04],
								['c', -0.09, 0.48, -0.21, 0.99, -0.36, 1.35],
								['l', -0.12, 0.27],
								['l', 0.12, 0.27],
								['c', 0.09, 0.15, 0.21, 0.45, 0.27, 0.66],
								['c', 0.69, 1.89, 0.63, 3.66, -0.18, 5.46],
								['l', -0.18, 0.39],
								['l', 0.15, 0.33],
								['c', 0.3, 0.66, 0.51, 1.44, 0.63, 2.1],
								['c', 0.06, 0.48, 0.06, 1.35, 0, 1.71],
								['c', -0.15, 0.57, -0.42, 1.2, -0.78, 1.68],
								['l', -0.21, 0.27],
								['l', 0.18, 0.33],
								['c', 0.57, 1.05, 0.93, 2.13, 1.02, 3.18],
								['c', 0.06, 0.72, 0, 1.83, -0.21, 2.79],
								['c', -0.18, 1.02, -0.63, 2.34, -1.02, 3.09],
								['c', -0.15, 0.33, -0.48, 0.45, -0.78, 0.3],
								['c', -0.18, -0.09, -0.27, -0.18, -0.33, -0.33],
								['c', -0.09, -0.18, -0.06, -0.3, 0.03, -0.54],
								['c', 0.75, -1.5, 1.23, -3.45, 1.17, -4.89],
								['c', -0.06, -1.02, -0.42, -2.01, -1.17, -3.15],
								['c', -0.48, -0.72, -1.02, -1.35, -1.89, -2.22],
								['c', -0.57, -0.57, -1.56, -1.5, -1.92, -1.77],
								['l', -0.12, -0.09],
								['l', 0, 1.68],
								['l', 0, 1.68],
								['l', -0.21, 0],
								['l', -0.21, 0],
								['l', 0, -15],
								['z'],
								['m', 0.93, -8.07],
								['c', -0.27, -0.3, -0.48, -0.54, -0.51, -0.54],
								['c', 0, 0, 0, 0.69, 0.03, 1.02],
								['c', 0.15, 1.47, 0.75, 2.94, 2.04, 4.83],
								['l', 1.08, 1.53],
								['c', 0.39, 0.57, 0.84, 1.2, 0.99, 1.44],
								['c', 0.15, 0.24, 0.3, 0.45, 0.3, 0.45],
								['c', 0, 0, 0.03, -0.09, 0.06, -0.21],
								['c', 0.36, -1.59, -0.15, -3.33, -1.47, -5.4],
								['c', -0.63, -0.93, -1.35, -1.83, -2.52, -3.12],
								['z'],
								['m', 0.06, 6.72],
								['c', -0.24, -0.21, -0.48, -0.42, -0.51, -0.45],
								['l', -0.06, -0.06],
								['l', 0, 0.33],
								['c', 0, 1.2, 0.3, 2.34, 0.93, 3.6],
								['c', 0.45, 0.9, 0.96, 1.68, 2.25, 3.51],
								['c', 0.39, 0.54, 0.84, 1.17, 1.02, 1.44],
								['c', 0.21, 0.33, 0.33, 0.51, 0.33, 0.48],
								['c', 0.06, -0.09, 0.21, -0.63, 0.3, -0.99],
								['c', 0.06, -0.33, 0.06, -0.45, 0.06, -0.96],
								['c', 0, -0.6, -0.03, -0.84, -0.18, -1.35],
								['c', -0.3, -1.08, -1.02, -2.28, -2.13, -3.57],
								['c', -0.39, -0.45, -1.44, -1.47, -2.01, -1.98],
								['z'],
								['m', 0, 6.72],
								['c', -0.24, -0.21, -0.48, -0.39, -0.51, -0.42],
								['l', -0.06, -0.06],
								['l', 0, 0.33],
								['c', 0, 1.41, 0.45, 2.82, 1.38, 4.35],
								['c', 0.42, 0.72, 0.72, 1.14, 1.86, 2.73],
								['c', 0.36, 0.45, 0.75, 0.99, 0.87, 1.2],
								['c', 0.15, 0.21, 0.3, 0.36, 0.3, 0.36],
								['c', 0.06, 0, 0.3, -0.48, 0.39, -0.75],
								['c', 0.09, -0.36, 0.12, -0.63, 0.12, -1.05],
								['c', -0.06, -1.05, -0.45, -2.04, -1.2, -3.18],
								['c', -0.57, -0.87, -1.11, -1.53, -2.07, -2.49],
								['c', -0.36, -0.33, -0.84, -0.78, -1.08, -1.02],
								['z']
							],
							w: 6.682,
							h: 39.694
						},
						'flags.d8th': {
							d: [
								['M', 5.67, -21.63],
								['c', 0.24, -0.12, 0.54, -0.06, 0.69, 0.15],
								['c', 0.06, 0.06, 0.21, 0.36, 0.39, 0.66],
								['c', 0.84, 1.77, 1.26, 3.36, 1.32, 5.1],
								['c', 0.03, 1.29, -0.21, 2.37, -0.81, 3.63],
								['c', -0.6, 1.23, -1.26, 2.13, -3.21, 4.38],
								['c', -1.35, 1.53, -1.86, 2.19, -2.4, 2.97],
								['c', -0.63, 0.93, -1.11, 1.92, -1.38, 2.79],
								['c', -0.15, 0.54, -0.27, 1.35, -0.27, 1.8],
								['l', 0, 0.15],
								['l', -0.21, 0],
								['l', -0.21, 0],
								['l', 0, -3.75],
								['l', 0, -3.75],
								['l', 0.21, 0],
								['l', 0.21, 0],
								['l', 0.48, -0.3],
								['c', 1.83, -1.11, 3.12, -2.1, 4.17, -3.12],
								['c', 0.78, -0.81, 1.32, -1.53, 1.71, -2.31],
								['c', 0.45, -0.93, 0.6, -1.74, 0.51, -2.88],
								['c', -0.12, -1.56, -0.63, -3.18, -1.47, -4.68],
								['c', -0.12, -0.21, -0.15, -0.33, -0.06, -0.51],
								['c', 0.06, -0.15, 0.15, -0.24, 0.33, -0.33],
								['z']
							],
							w: 8.492,
							h: 21.691
						},
						'flags.ugrace': {
							d: [
								['M', 6.03, 6.93],
								['c', 0.15, -0.09, 0.33, -0.06, 0.51, 0],
								['c', 0.15, 0.09, 0.21, 0.15, 0.3, 0.33],
								['c', 0.09, 0.18, 0.06, 0.39, -0.03, 0.54],
								['c', -0.06, 0.15, -10.89, 8.88, -11.07, 8.97],
								['c', -0.15, 0.09, -0.33, 0.06, -0.48, 0],
								['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
								['c', -0.09, -0.18, -0.06, -0.39, 0.03, -0.54],
								['c', 0.06, -0.15, 10.89, -8.88, 11.07, -8.97],
								['z']
							],
							w: 12.019,
							h: 9.954
						},
						'flags.dgrace': {
							d: [
								['M', -6.06, -15.93],
								['c', 0.18, -0.09, 0.33, -0.12, 0.48, -0.06],
								['c', 0.18, 0.09, 14.01, 8.04, 14.1, 8.1],
								['c', 0.12, 0.12, 0.18, 0.33, 0.18, 0.51],
								['c', -0.03, 0.21, -0.15, 0.39, -0.36, 0.48],
								['c', -0.18, 0.09, -0.33, 0.12, -0.48, 0.06],
								['c', -0.18, -0.09, -14.01, -8.04, -14.1, -8.1],
								['c', -0.12, -0.12, -0.18, -0.33, -0.18, -0.51],
								['c', 0.03, -0.21, 0.15, -0.39, 0.36, -0.48],
								['z']
							],
							w: 15.12,
							h: 9.212
						},
						'flags.d16th': {
							d: [
								['M', 6.84, -22.53],
								['c', 0.27, -0.12, 0.57, -0.06, 0.72, 0.15],
								['c', 0.15, 0.15, 0.33, 0.87, 0.45, 1.56],
								['c', 0.06, 0.33, 0.06, 1.35, 0, 1.65],
								['c', -0.06, 0.33, -0.15, 0.78, -0.27, 1.11],
								['c', -0.12, 0.33, -0.45, 0.96, -0.66, 1.32],
								['l', -0.18, 0.27],
								['l', 0.09, 0.18],
								['c', 0.48, 1.02, 0.72, 2.25, 0.69, 3.3],
								['c', -0.06, 1.23, -0.42, 2.28, -1.26, 3.45],
								['c', -0.57, 0.87, -0.99, 1.32, -3, 3.39],
								['c', -1.56, 1.56, -2.22, 2.4, -2.76, 3.45],
								['c', -0.42, 0.84, -0.66, 1.8, -0.66, 2.55],
								['l', 0, 0.15],
								['l', -0.21, 0],
								['l', -0.21, 0],
								['l', 0, -7.5],
								['l', 0, -7.5],
								['l', 0.21, 0],
								['l', 0.21, 0],
								['l', 0, 1.14],
								['l', 0, 1.11],
								['l', 0.27, -0.15],
								['c', 1.11, -0.57, 1.77, -0.99, 2.52, -1.47],
								['c', 2.37, -1.56, 3.69, -3.15, 4.05, -4.83],
								['c', 0.03, -0.18, 0.03, -0.39, 0.03, -0.78],
								['c', 0, -0.6, -0.03, -0.93, -0.24, -1.5],
								['c', -0.06, -0.18, -0.12, -0.39, -0.15, -0.45],
								['c', -0.03, -0.24, 0.12, -0.48, 0.36, -0.6],
								['z'],
								['m', -0.63, 7.5],
								['c', -0.06, -0.18, -0.15, -0.36, -0.15, -0.36],
								['c', -0.03, 0, -0.03, 0.03, -0.06, 0.06],
								['c', -0.06, 0.12, -0.96, 1.02, -1.95, 1.98],
								['c', -0.63, 0.57, -1.26, 1.17, -1.44, 1.35],
								['c', -1.53, 1.62, -2.28, 2.85, -2.55, 4.32],
								['c', -0.03, 0.18, -0.03, 0.54, -0.06, 0.99],
								['l', 0, 0.69],
								['l', 0.18, -0.09],
								['c', 0.93, -0.54, 2.1, -1.29, 2.82, -1.83],
								['c', 0.69, -0.51, 1.02, -0.81, 1.53, -1.29],
								['c', 1.86, -1.89, 2.37, -3.66, 1.68, -5.82],
								['z']
							],
							w: 8.475,
							h: 22.591
						},
						'flags.d32nd': {
							d: [
								['M', 6.84, -29.13],
								['c', 0.27, -0.12, 0.57, -0.06, 0.72, 0.15],
								['c', 0.12, 0.12, 0.27, 0.63, 0.36, 1.11],
								['c', 0.33, 1.59, 0.06, 3.06, -0.81, 4.47],
								['l', -0.18, 0.27],
								['l', 0.09, 0.15],
								['c', 0.12, 0.24, 0.33, 0.69, 0.45, 1.05],
								['c', 0.63, 1.83, 0.45, 3.57, -0.57, 5.22],
								['l', -0.18, 0.3],
								['l', 0.15, 0.27],
								['c', 0.42, 0.87, 0.6, 1.71, 0.57, 2.61],
								['c', -0.06, 1.29, -0.48, 2.46, -1.35, 3.78],
								['c', -0.54, 0.81, -0.93, 1.29, -2.46, 3],
								['c', -0.51, 0.54, -1.05, 1.17, -1.26, 1.41],
								['c', -1.56, 1.86, -2.25, 3.36, -2.37, 5.01],
								['l', 0, 0.33],
								['l', -0.21, 0],
								['l', -0.21, 0],
								['l', 0, -11.25],
								['l', 0, -11.25],
								['l', 0.21, 0],
								['l', 0.21, 0],
								['l', 0, 1.35],
								['l', 0.03, 1.35],
								['l', 0.78, -0.39],
								['c', 1.38, -0.69, 2.34, -1.26, 3.24, -1.92],
								['c', 1.38, -1.02, 2.28, -2.13, 2.64, -3.21],
								['c', 0.15, -0.48, 0.18, -0.72, 0.18, -1.29],
								['c', 0, -0.57, -0.06, -0.9, -0.24, -1.47],
								['c', -0.06, -0.18, -0.12, -0.39, -0.15, -0.45],
								['c', -0.03, -0.24, 0.12, -0.48, 0.36, -0.6],
								['z'],
								['m', -0.63, 7.2],
								['c', -0.09, -0.18, -0.12, -0.21, -0.12, -0.15],
								['c', -0.03, 0.09, -1.02, 1.08, -2.04, 2.04],
								['c', -1.17, 1.08, -1.65, 1.56, -2.07, 2.04],
								['c', -0.84, 0.96, -1.38, 1.86, -1.68, 2.76],
								['c', -0.21, 0.57, -0.27, 0.99, -0.3, 1.65],
								['l', 0, 0.54],
								['l', 0.66, -0.33],
								['c', 3.57, -1.86, 5.49, -3.69, 5.94, -5.7],
								['c', 0.06, -0.39, 0.06, -1.2, -0.03, -1.65],
								['c', -0.06, -0.39, -0.24, -0.9, -0.36, -1.2],
								['z'],
								['m', -0.06, 7.2],
								['c', -0.06, -0.15, -0.12, -0.33, -0.15, -0.45],
								['l', -0.06, -0.18],
								['l', -0.18, 0.21],
								['l', -1.83, 1.83],
								['c', -0.87, 0.9, -1.77, 1.8, -1.95, 2.01],
								['c', -1.08, 1.29, -1.62, 2.31, -1.89, 3.51],
								['c', -0.06, 0.3, -0.06, 0.51, -0.09, 0.93],
								['l', 0, 0.57],
								['l', 0.09, -0.06],
								['c', 0.75, -0.45, 1.89, -1.26, 2.52, -1.74],
								['c', 0.81, -0.66, 1.74, -1.53, 2.22, -2.16],
								['c', 1.26, -1.53, 1.68, -3.06, 1.32, -4.47],
								['z']
							],
							w: 8.385,
							h: 29.191
						},
						'flags.d64th': {
							d: [
								['M', 7.08, -32.88],
								['c', 0.3, -0.12, 0.66, -0.03, 0.78, 0.24],
								['c', 0.18, 0.33, 0.27, 2.1, 0.15, 2.64],
								['c', -0.09, 0.39, -0.21, 0.78, -0.39, 1.08],
								['l', -0.15, 0.3],
								['l', 0.09, 0.27],
								['c', 0.03, 0.12, 0.09, 0.45, 0.12, 0.69],
								['c', 0.27, 1.44, 0.18, 2.55, -0.3, 3.6],
								['l', -0.12, 0.33],
								['l', 0.06, 0.42],
								['c', 0.27, 1.35, 0.33, 2.82, 0.21, 3.63],
								['c', -0.12, 0.6, -0.3, 1.23, -0.57, 1.8],
								['l', -0.15, 0.27],
								['l', 0.03, 0.42],
								['c', 0.06, 1.02, 0.06, 2.7, 0.03, 3.06],
								['c', -0.15, 1.47, -0.66, 2.76, -1.74, 4.41],
								['c', -0.45, 0.69, -0.75, 1.11, -1.74, 2.37],
								['c', -1.05, 1.38, -1.5, 1.98, -1.95, 2.73],
								['c', -0.93, 1.5, -1.38, 2.82, -1.44, 4.2],
								['l', 0, 0.42],
								['l', -0.21, 0],
								['l', -0.21, 0],
								['l', 0, -15],
								['l', 0, -15],
								['l', 0.21, 0],
								['l', 0.21, 0],
								['l', 0, 1.86],
								['l', 0, 1.89],
								['c', 0, 0, 0.21, -0.03, 0.45, -0.09],
								['c', 2.22, -0.39, 4.08, -1.11, 5.19, -2.01],
								['c', 0.63, -0.54, 1.02, -1.14, 1.2, -1.8],
								['c', 0.06, -0.3, 0.06, -1.14, -0.03, -1.65],
								['c', -0.03, -0.18, -0.06, -0.39, -0.09, -0.48],
								['c', -0.03, -0.24, 0.12, -0.48, 0.36, -0.6],
								['z'],
								['m', -0.45, 6.15],
								['c', -0.03, -0.18, -0.06, -0.42, -0.06, -0.54],
								['l', -0.03, -0.18],
								['l', -0.33, 0.3],
								['c', -0.42, 0.36, -0.87, 0.72, -1.68, 1.29],
								['c', -1.98, 1.38, -2.25, 1.59, -2.85, 2.16],
								['c', -0.75, 0.69, -1.23, 1.44, -1.47, 2.19],
								['c', -0.15, 0.45, -0.18, 0.63, -0.21, 1.35],
								['l', 0, 0.66],
								['l', 0.39, -0.18],
								['c', 1.83, -0.9, 3.45, -1.95, 4.47, -2.91],
								['c', 0.93, -0.9, 1.53, -1.83, 1.74, -2.82],
								['c', 0.06, -0.33, 0.06, -0.87, 0.03, -1.32],
								['z'],
								['m', -0.27, 4.86],
								['c', -0.03, -0.21, -0.06, -0.36, -0.06, -0.36],
								['c', 0, -0.03, -0.12, 0.09, -0.24, 0.24],
								['c', -0.39, 0.48, -0.99, 1.08, -2.16, 2.19],
								['c', -1.47, 1.38, -1.92, 1.83, -2.46, 2.49],
								['c', -0.66, 0.87, -1.08, 1.74, -1.29, 2.58],
								['c', -0.09, 0.42, -0.15, 0.87, -0.15, 1.44],
								['l', 0, 0.54],
								['l', 0.48, -0.33],
								['c', 1.5, -1.02, 2.58, -1.89, 3.51, -2.82],
								['c', 1.47, -1.47, 2.25, -2.85, 2.4, -4.26],
								['c', 0.03, -0.39, 0.03, -1.17, -0.03, -1.71],
								['z'],
								['m', -0.66, 7.68],
								['c', 0.03, -0.15, 0.03, -0.6, 0.03, -0.99],
								['l', 0, -0.72],
								['l', -0.27, 0.33],
								['l', -1.74, 1.98],
								['c', -1.77, 1.92, -2.43, 2.76, -2.97, 3.9],
								['c', -0.51, 1.02, -0.72, 1.77, -0.75, 2.91],
								['c', 0, 0.63, 0, 0.63, 0.06, 0.6],
								['c', 0.03, -0.03, 0.3, -0.27, 0.63, -0.54],
								['c', 0.66, -0.6, 1.86, -1.8, 2.31, -2.31],
								['c', 1.65, -1.89, 2.52, -3.54, 2.7, -5.16],
								['z']
							],
							w: 8.485,
							h: 32.932
						},
						'clefs.C': {
							d: [
								['M', 0.06, -14.94],
								['l', 0.09, -0.06],
								['l', 1.92, 0],
								['l', 1.92, 0],
								['l', 0.09, 0.06],
								['l', 0.06, 0.09],
								['l', 0, 14.85],
								['l', 0, 14.82],
								['l', -0.06, 0.09],
								['l', -0.09, 0.06],
								['l', -1.92, 0],
								['l', -1.92, 0],
								['l', -0.09, -0.06],
								['l', -0.06, -0.09],
								['l', 0, -14.82],
								['l', 0, -14.85],
								['z'],
								['m', 5.37, 0],
								['c', 0.09, -0.06, 0.09, -0.06, 0.57, -0.06],
								['c', 0.45, 0, 0.45, 0, 0.54, 0.06],
								['l', 0.06, 0.09],
								['l', 0, 7.14],
								['l', 0, 7.11],
								['l', 0.09, -0.06],
								['c', 0.18, -0.18, 0.72, -0.84, 0.96, -1.2],
								['c', 0.3, -0.45, 0.66, -1.17, 0.84, -1.65],
								['c', 0.36, -0.9, 0.57, -1.83, 0.6, -2.79],
								['c', 0.03, -0.48, 0.03, -0.54, 0.09, -0.63],
								['c', 0.12, -0.18, 0.36, -0.21, 0.54, -0.12],
								['c', 0.18, 0.09, 0.21, 0.15, 0.24, 0.66],
								['c', 0.06, 0.87, 0.21, 1.56, 0.57, 2.22],
								['c', 0.51, 1.02, 1.26, 1.68, 2.22, 1.92],
								['c', 0.21, 0.06, 0.33, 0.06, 0.78, 0.06],
								['c', 0.45, 0, 0.57, 0, 0.84, -0.06],
								['c', 0.45, -0.12, 0.81, -0.33, 1.08, -0.6],
								['c', 0.57, -0.57, 0.87, -1.41, 0.99, -2.88],
								['c', 0.06, -0.54, 0.06, -3, 0, -3.57],
								['c', -0.21, -2.58, -0.84, -3.87, -2.16, -4.5],
								['c', -0.48, -0.21, -1.17, -0.36, -1.77, -0.36],
								['c', -0.69, 0, -1.29, 0.27, -1.5, 0.72],
								['c', -0.06, 0.15, -0.06, 0.21, -0.06, 0.42],
								['c', 0, 0.24, 0, 0.3, 0.06, 0.45],
								['c', 0.12, 0.24, 0.24, 0.39, 0.63, 0.66],
								['c', 0.42, 0.3, 0.57, 0.48, 0.69, 0.72],
								['c', 0.06, 0.15, 0.06, 0.21, 0.06, 0.48],
								['c', 0, 0.39, -0.03, 0.63, -0.21, 0.96],
								['c', -0.3, 0.6, -0.87, 1.08, -1.5, 1.26],
								['c', -0.27, 0.06, -0.87, 0.06, -1.14, 0],
								['c', -0.78, -0.24, -1.44, -0.87, -1.65, -1.68],
								['c', -0.12, -0.42, -0.09, -1.17, 0.09, -1.71],
								['c', 0.51, -1.65, 1.98, -2.82, 3.81, -3.09],
								['c', 0.84, -0.09, 2.46, 0.03, 3.51, 0.27],
								['c', 2.22, 0.57, 3.69, 1.8, 4.44, 3.75],
								['c', 0.36, 0.93, 0.57, 2.13, 0.57, 3.36],
								['c', 0, 1.44, -0.48, 2.73, -1.38, 3.81],
								['c', -1.26, 1.5, -3.27, 2.43, -5.28, 2.43],
								['c', -0.48, 0, -0.51, 0, -0.75, -0.09],
								['c', -0.15, -0.03, -0.48, -0.21, -0.78, -0.36],
								['c', -0.69, -0.36, -0.87, -0.42, -1.26, -0.42],
								['c', -0.27, 0, -0.3, 0, -0.51, 0.09],
								['c', -0.57, 0.3, -0.81, 0.9, -0.81, 2.1],
								['c', 0, 1.23, 0.24, 1.83, 0.81, 2.13],
								['c', 0.21, 0.09, 0.24, 0.09, 0.51, 0.09],
								['c', 0.39, 0, 0.57, -0.06, 1.26, -0.42],
								['c', 0.3, -0.15, 0.63, -0.33, 0.78, -0.36],
								['c', 0.24, -0.09, 0.27, -0.09, 0.75, -0.09],
								['c', 2.01, 0, 4.02, 0.93, 5.28, 2.4],
								['c', 0.9, 1.11, 1.38, 2.4, 1.38, 3.84],
								['c', 0, 1.5, -0.3, 2.88, -0.84, 3.96],
								['c', -0.78, 1.59, -2.19, 2.64, -4.17, 3.15],
								['c', -1.05, 0.24, -2.67, 0.36, -3.51, 0.27],
								['c', -1.83, -0.27, -3.3, -1.44, -3.81, -3.09],
								['c', -0.18, -0.54, -0.21, -1.29, -0.09, -1.74],
								['c', 0.15, -0.6, 0.63, -1.2, 1.23, -1.47],
								['c', 0.36, -0.18, 0.57, -0.21, 0.99, -0.21],
								['c', 0.42, 0, 0.63, 0.03, 1.02, 0.21],
								['c', 0.42, 0.21, 0.84, 0.63, 1.05, 1.05],
								['c', 0.18, 0.36, 0.21, 0.6, 0.21, 0.96],
								['c', 0, 0.3, 0, 0.36, -0.06, 0.51],
								['c', -0.12, 0.24, -0.27, 0.42, -0.69, 0.72],
								['c', -0.57, 0.42, -0.69, 0.63, -0.69, 1.08],
								['c', 0, 0.24, 0, 0.3, 0.06, 0.45],
								['c', 0.12, 0.21, 0.3, 0.39, 0.57, 0.54],
								['c', 0.42, 0.18, 0.87, 0.21, 1.53, 0.15],
								['c', 1.08, -0.15, 1.8, -0.57, 2.34, -1.32],
								['c', 0.54, -0.75, 0.84, -1.83, 0.99, -3.51],
								['c', 0.06, -0.57, 0.06, -3.03, 0, -3.57],
								['c', -0.12, -1.47, -0.42, -2.31, -0.99, -2.88],
								['c', -0.27, -0.27, -0.63, -0.48, -1.08, -0.6],
								['c', -0.27, -0.06, -0.39, -0.06, -0.84, -0.06],
								['c', -0.45, 0, -0.57, 0, -0.78, 0.06],
								['c', -1.14, 0.27, -2.01, 1.17, -2.46, 2.49],
								['c', -0.21, 0.57, -0.3, 0.99, -0.33, 1.65],
								['c', -0.03, 0.51, -0.06, 0.57, -0.24, 0.66],
								['c', -0.12, 0.06, -0.27, 0.06, -0.39, 0],
								['c', -0.21, -0.09, -0.21, -0.15, -0.24, -0.75],
								['c', -0.09, -1.92, -0.78, -3.72, -2.01, -5.19],
								['c', -0.18, -0.21, -0.36, -0.42, -0.39, -0.45],
								['l', -0.09, -0.06],
								['l', 0, 7.11],
								['l', 0, 7.14],
								['l', -0.06, 0.09],
								['c', -0.09, 0.06, -0.09, 0.06, -0.54, 0.06],
								['c', -0.48, 0, -0.48, 0, -0.57, -0.06],
								['l', -0.06, -0.09],
								['l', 0, -14.82],
								['l', 0, -14.85],
								['z']
							],
							w: 20.31,
							h: 29.97
						},
						'clefs.F': {
							d: [
								['M', 6.3, -7.8],
								['c', 0.36, -0.03, 1.65, 0, 2.13, 0.03],
								['c', 3.6, 0.42, 6.03, 2.1, 6.93, 4.86],
								['c', 0.27, 0.84, 0.36, 1.5, 0.36, 2.58],
								['c', 0, 0.9, -0.03, 1.35, -0.18, 2.16],
								['c', -0.78, 3.78, -3.54, 7.08, -8.37, 9.96],
								['c', -1.74, 1.05, -3.87, 2.13, -6.18, 3.12],
								['c', -0.39, 0.18, -0.75, 0.33, -0.81, 0.36],
								['c', -0.06, 0.03, -0.15, 0.06, -0.18, 0.06],
								['c', -0.15, 0, -0.33, -0.18, -0.33, -0.33],
								['c', 0, -0.15, 0.06, -0.21, 0.51, -0.48],
								['c', 3, -1.77, 5.13, -3.21, 6.84, -4.74],
								['c', 0.51, -0.45, 1.59, -1.5, 1.95, -1.95],
								['c', 1.89, -2.19, 2.88, -4.32, 3.15, -6.78],
								['c', 0.06, -0.42, 0.06, -1.77, 0, -2.19],
								['c', -0.24, -2.01, -0.93, -3.63, -2.04, -4.71],
								['c', -0.63, -0.63, -1.29, -1.02, -2.07, -1.2],
								['c', -1.62, -0.39, -3.36, 0.15, -4.56, 1.44],
								['c', -0.54, 0.6, -1.05, 1.47, -1.32, 2.22],
								['l', -0.09, 0.21],
								['l', 0.24, -0.12],
								['c', 0.39, -0.21, 0.63, -0.24, 1.11, -0.24],
								['c', 0.3, 0, 0.45, 0, 0.66, 0.06],
								['c', 1.92, 0.48, 2.85, 2.55, 1.95, 4.38],
								['c', -0.45, 0.99, -1.41, 1.62, -2.46, 1.71],
								['c', -1.47, 0.09, -2.91, -0.87, -3.39, -2.25],
								['c', -0.18, -0.57, -0.21, -1.32, -0.03, -2.28],
								['c', 0.39, -2.25, 1.83, -4.2, 3.81, -5.19],
								['c', 0.69, -0.36, 1.59, -0.6, 2.37, -0.69],
								['z'],
								['m', 11.58, 2.52],
								['c', 0.84, -0.21, 1.71, 0.3, 1.89, 1.14],
								['c', 0.3, 1.17, -0.72, 2.19, -1.89, 1.89],
								['c', -0.99, -0.21, -1.5, -1.32, -1.02, -2.25],
								['c', 0.18, -0.39, 0.6, -0.69, 1.02, -0.78],
								['z'],
								['m', 0, 7.5],
								['c', 0.84, -0.21, 1.71, 0.3, 1.89, 1.14],
								['c', 0.21, 0.87, -0.3, 1.71, -1.14, 1.89],
								['c', -0.87, 0.21, -1.71, -0.3, -1.89, -1.14],
								['c', -0.21, -0.84, 0.3, -1.71, 1.14, -1.89],
								['z']
							],
							w: 20.153,
							h: 23.142
						},
						'clefs.G': {
							d: [
								['M', 9.69, -37.41],
								['c', 0.09, -0.09, 0.24, -0.06, 0.36, 0],
								['c', 0.12, 0.09, 0.57, 0.6, 0.96, 1.11],
								['c', 1.77, 2.34, 3.21, 5.85, 3.57, 8.73],
								['c', 0.21, 1.56, 0.03, 3.27, -0.45, 4.86],
								['c', -0.69, 2.31, -1.92, 4.47, -4.23, 7.44],
								['c', -0.3, 0.39, -0.57, 0.72, -0.6, 0.75],
								['c', -0.03, 0.06, 0, 0.15, 0.18, 0.78],
								['c', 0.54, 1.68, 1.38, 4.44, 1.68, 5.49],
								['l', 0.09, 0.42],
								['l', 0.39, 0],
								['c', 1.47, 0.09, 2.76, 0.51, 3.96, 1.29],
								['c', 1.83, 1.23, 3.06, 3.21, 3.39, 5.52],
								['c', 0.09, 0.45, 0.12, 1.29, 0.06, 1.74],
								['c', -0.09, 1.02, -0.33, 1.83, -0.75, 2.73],
								['c', -0.84, 1.71, -2.28, 3.06, -4.02, 3.72],
								['l', -0.33, 0.12],
								['l', 0.03, 1.26],
								['c', 0, 1.74, -0.06, 3.63, -0.21, 4.62],
								['c', -0.45, 3.06, -2.19, 5.49, -4.47, 6.21],
								['c', -0.57, 0.18, -0.9, 0.21, -1.59, 0.21],
								['c', -0.69, 0, -1.02, -0.03, -1.65, -0.21],
								['c', -1.14, -0.27, -2.13, -0.84, -2.94, -1.65],
								['c', -0.99, -0.99, -1.56, -2.16, -1.71, -3.54],
								['c', -0.09, -0.81, 0.06, -1.53, 0.45, -2.13],
								['c', 0.63, -0.99, 1.83, -1.56, 3, -1.53],
								['c', 1.5, 0.09, 2.64, 1.32, 2.73, 2.94],
								['c', 0.06, 1.47, -0.93, 2.7, -2.37, 2.97],
								['c', -0.45, 0.06, -0.84, 0.03, -1.29, -0.09],
								['l', -0.21, -0.09],
								['l', 0.09, 0.12],
								['c', 0.39, 0.54, 0.78, 0.93, 1.32, 1.26],
								['c', 1.35, 0.87, 3.06, 1.02, 4.35, 0.36],
								['c', 1.44, -0.72, 2.52, -2.28, 2.97, -4.35],
								['c', 0.15, -0.66, 0.24, -1.5, 0.3, -3.03],
								['c', 0.03, -0.84, 0.03, -2.94, 0, -3],
								['c', -0.03, 0, -0.18, 0, -0.36, 0.03],
								['c', -0.66, 0.12, -0.99, 0.12, -1.83, 0.12],
								['c', -1.05, 0, -1.71, -0.06, -2.61, -0.3],
								['c', -4.02, -0.99, -7.11, -4.35, -7.8, -8.46],
								['c', -0.12, -0.66, -0.12, -0.99, -0.12, -1.83],
								['c', 0, -0.84, 0, -1.14, 0.15, -1.92],
								['c', 0.36, -2.28, 1.41, -4.62, 3.3, -7.29],
								['l', 2.79, -3.6],
								['c', 0.54, -0.66, 0.96, -1.2, 0.96, -1.23],
								['c', 0, -0.03, -0.09, -0.33, -0.18, -0.69],
								['c', -0.96, -3.21, -1.41, -5.28, -1.59, -7.68],
								['c', -0.12, -1.38, -0.15, -3.09, -0.06, -3.96],
								['c', 0.33, -2.67, 1.38, -5.07, 3.12, -7.08],
								['c', 0.36, -0.42, 0.99, -1.05, 1.17, -1.14],
								['z'],
								['m', 2.01, 4.71],
								['c', -0.15, -0.3, -0.3, -0.54, -0.3, -0.54],
								['c', -0.03, 0, -0.18, 0.09, -0.3, 0.21],
								['c', -2.4, 1.74, -3.87, 4.2, -4.26, 7.11],
								['c', -0.06, 0.54, -0.06, 1.41, -0.03, 1.89],
								['c', 0.09, 1.29, 0.48, 3.12, 1.08, 5.22],
								['c', 0.15, 0.42, 0.24, 0.78, 0.24, 0.81],
								['c', 0, 0.03, 0.84, -1.11, 1.23, -1.68],
								['c', 1.89, -2.73, 2.88, -5.07, 3.15, -7.53],
								['c', 0.09, -0.57, 0.12, -1.74, 0.06, -2.37],
								['c', -0.09, -1.23, -0.27, -1.92, -0.87, -3.12],
								['z'],
								['m', -2.94, 20.7],
								['c', -0.21, -0.72, -0.39, -1.32, -0.42, -1.32],
								['c', 0, 0, -1.2, 1.47, -1.86, 2.37],
								['c', -2.79, 3.63, -4.02, 6.3, -4.35, 9.3],
								['c', -0.03, 0.21, -0.03, 0.69, -0.03, 1.08],
								['c', 0, 0.69, 0, 0.75, 0.06, 1.11],
								['c', 0.12, 0.54, 0.27, 0.99, 0.51, 1.47],
								['c', 0.69, 1.38, 1.83, 2.55, 3.42, 3.42],
								['c', 0.96, 0.54, 2.07, 0.9, 3.21, 1.08],
								['c', 0.78, 0.12, 2.04, 0.12, 2.94, -0.03],
								['c', 0.51, -0.06, 0.45, -0.03, 0.42, -0.3],
								['c', -0.24, -3.33, -0.72, -6.33, -1.62, -10.08],
								['c', -0.09, -0.39, -0.18, -0.75, -0.18, -0.78],
								['c', -0.03, -0.03, -0.42, 0, -0.81, 0.09],
								['c', -0.9, 0.18, -1.65, 0.57, -2.22, 1.14],
								['c', -0.72, 0.72, -1.08, 1.65, -1.05, 2.64],
								['c', 0.06, 0.96, 0.48, 1.83, 1.23, 2.58],
								['c', 0.36, 0.36, 0.72, 0.63, 1.17, 0.9],
								['c', 0.33, 0.18, 0.36, 0.21, 0.42, 0.33],
								['c', 0.18, 0.42, -0.18, 0.9, -0.6, 0.87],
								['c', -0.18, -0.03, -0.84, -0.36, -1.26, -0.63],
								['c', -0.78, -0.51, -1.38, -1.11, -1.86, -1.83],
								['c', -1.77, -2.7, -0.99, -6.42, 1.71, -8.19],
								['c', 0.3, -0.21, 0.81, -0.48, 1.17, -0.63],
								['c', 0.3, -0.09, 1.02, -0.3, 1.14, -0.3],
								['c', 0.06, 0, 0.09, 0, 0.09, -0.03],
								['c', 0.03, -0.03, -0.51, -1.92, -1.23, -4.26],
								['z'],
								['m', 3.78, 7.41],
								['c', -0.18, -0.03, -0.36, -0.06, -0.39, -0.06],
								['c', -0.03, 0, 0, 0.21, 0.18, 1.02],
								['c', 0.75, 3.18, 1.26, 6.3, 1.5, 9.09],
								['c', 0.06, 0.72, 0, 0.69, 0.51, 0.42],
								['c', 0.78, -0.36, 1.44, -0.96, 1.98, -1.77],
								['c', 1.08, -1.62, 1.2, -3.69, 0.3, -5.55],
								['c', -0.81, -1.62, -2.31, -2.79, -4.08, -3.15],
								['z']
							],
							w: 19.051,
							h: 57.057
						},
						'clefs.perc': {
							d: [
								['M', 5.07, -7.44],
								['l', 0.09, -0.06],
								['l', 1.53, 0],
								['l', 1.53, 0],
								['l', 0.09, 0.06],
								['l', 0.06, 0.09],
								['l', 0, 7.35],
								['l', 0, 7.32],
								['l', -0.06, 0.09],
								['l', -0.09, 0.06],
								['l', -1.53, 0],
								['l', -1.53, 0],
								['l', -0.09, -0.06],
								['l', -0.06, -0.09],
								['l', 0, -7.32],
								['l', 0, -7.35],
								['z'],
								['m', 6.63, 0],
								['l', 0.09, -0.06],
								['l', 1.53, 0],
								['l', 1.53, 0],
								['l', 0.09, 0.06],
								['l', 0.06, 0.09],
								['l', 0, 7.35],
								['l', 0, 7.32],
								['l', -0.06, 0.09],
								['l', -0.09, 0.06],
								['l', -1.53, 0],
								['l', -1.53, 0],
								['l', -0.09, -0.06],
								['l', -0.06, -0.09],
								['l', 0, -7.32],
								['l', 0, -7.35],
								['z']
							],
							w: 21,
							h: 14.97
						},
						'tab.big': {
							d: [
								['M', 20.16, -21.66],
								['c', 0.24, -0.09, 0.66, 0.09, 0.78, 0.36],
								['c', 0.09, 0.21, 0.09, 0.24, -0.18, 0.54],
								['c', -0.78, 0.81, -1.86, 1.44, -2.94, 1.71],
								['c', -0.87, 0.24, -1.71, 0.24, -2.55, 0.03],
								['l', -0.06, -0.03],
								['l', -0.18, 0.99],
								['c', -0.33, 1.98, -0.75, 4.26, -0.96, 5.04],
								['c', -0.42, 1.65, -1.26, 3.18, -2.28, 4.14],
								['c', -0.57, 0.57, -1.17, 0.9, -1.86, 1.08],
								['c', -0.18, 0.06, -0.33, 0.06, -0.66, 0.06],
								['c', -0.54, 0, -0.78, -0.03, -1.23, -0.27],
								['c', -0.39, -0.18, -0.66, -0.39, -1.38, -0.99],
								['c', -0.3, -0.24, -0.66, -0.51, -0.75, -0.57],
								['c', -0.21, -0.15, -0.27, -0.24, -0.24, -0.45],
								['c', 0.06, -0.27, 0.36, -0.6, 0.6, -0.66],
								['c', 0.18, -0.03, 0.33, 0.06, 0.9, 0.57],
								['c', 0.48, 0.42, 0.72, 0.57, 0.93, 0.69],
								['c', 0.66, 0.33, 1.38, 0.21, 1.95, -0.36],
								['c', 0.63, -0.6, 1.05, -1.62, 1.23, -3],
								['c', 0.03, -0.18, 0.09, -0.66, 0.09, -1.11],
								['c', 0.09, -1.56, 0.33, -3.81, 0.57, -5.49],
								['c', 0.06, -0.33, 0.09, -0.63, 0.09, -0.63],
								['c', -0.03, -0.03, -0.81, -0.12, -1.02, -0.12],
								['c', -0.57, 0, -1.32, 0.12, -1.8, 0.33],
								['c', -0.87, 0.3, -1.35, 0.78, -1.5, 1.41],
								['c', -0.18, 0.63, 0.09, 1.26, 0.66, 1.65],
								['c', 0.12, 0.06, 0.15, 0.12, 0.18, 0.24],
								['c', 0.09, 0.27, 0.06, 0.57, -0.09, 0.75],
								['c', -0.03, 0.06, -0.12, 0.09, -0.27, 0.15],
								['c', -0.72, 0.21, -1.44, 0.15, -2.1, -0.18],
								['c', -0.54, -0.27, -0.96, -0.66, -1.2, -1.14],
								['c', -0.39, -0.75, -0.33, -1.74, 0.15, -2.52],
								['c', 0.27, -0.42, 0.84, -0.93, 1.41, -1.23],
								['c', 1.17, -0.57, 2.88, -0.9, 4.8, -0.9],
								['c', 0.69, 0, 0.78, 0, 1.08, 0.06],
								['c', 0.45, 0.09, 1.11, 0.3, 2.07, 0.6],
								['c', 1.47, 0.48, 1.83, 0.57, 2.55, 0.54],
								['c', 1.02, -0.06, 2.04, -0.45, 2.94, -1.11],
								['c', 0.12, -0.09, 0.24, -0.18, 0.27, -0.18],
								['z'],
								['m', -5.88, 13.05],
								['c', 0.21, -0.03, 0.81, 0, 1.08, 0.06],
								['c', 0.48, 0.12, 0.9, 0.42, 0.99, 0.69],
								['c', 0.03, 0.09, 0.03, 0.15, 0, 0.27],
								['c', 0, 0.09, -0.03, 0.57, -0.06, 1.08],
								['c', -0.09, 2.19, -0.24, 5.76, -0.39, 8.28],
								['c', -0.06, 1.53, -0.06, 1.77, 0.03, 2.01],
								['c', 0.09, 0.18, 0.15, 0.24, 0.3, 0.3],
								['c', 0.24, 0.12, 0.54, 0.06, 1.23, -0.27],
								['c', 0.57, -0.27, 0.66, -0.3, 0.75, -0.24],
								['c', 0.09, 0.06, 0.18, 0.3, 0.18, 0.45],
								['c', 0, 0.33, -0.15, 0.51, -0.45, 0.63],
								['c', -0.12, 0.03, -0.39, 0.15, -0.6, 0.27],
								['c', -1.17, 0.6, -1.38, 0.69, -1.8, 0.72],
								['c', -0.45, 0.03, -0.78, -0.09, -1.08, -0.39],
								['c', -0.39, -0.42, -0.66, -1.2, -1.02, -3.12],
								['c', -0.24, -1.23, -0.36, -2.07, -0.54, -3.75],
								['l', 0, -0.18],
								['l', -0.36, 0.45],
								['c', -0.6, 0.75, -1.32, 1.59, -1.95, 2.25],
								['c', -0.15, 0.18, -0.27, 0.3, -0.27, 0.33],
								['c', 0, 0, 0.06, 0.09, 0.15, 0.18],
								['c', 0.24, 0.33, 0.6, 0.57, 1.05, 0.69],
								['c', 0.18, 0.06, 0.3, 0.06, 0.69, 0.06],
								['l', 0.48, 0.03],
								['l', 0.06, 0.12],
								['c', 0.15, 0.27, 0.03, 0.72, -0.21, 0.9],
								['c', -0.18, 0.12, -0.93, 0.27, -1.41, 0.27],
								['c', -0.84, 0, -1.59, -0.3, -1.98, -0.84],
								['l', -0.12, -0.15],
								['l', -0.45, 0.42],
								['c', -0.99, 0.87, -1.53, 1.32, -2.16, 1.74],
								['c', -0.78, 0.51, -1.5, 0.84, -2.1, 0.93],
								['c', -0.69, 0.12, -1.2, 0.03, -1.95, -0.42],
								['c', -0.21, -0.12, -0.51, -0.27, -0.66, -0.36],
								['c', -0.24, -0.12, -0.3, -0.18, -0.33, -0.24],
								['c', -0.12, -0.27, 0.15, -0.78, 0.45, -0.93],
								['c', 0.24, -0.12, 0.33, -0.09, 0.9, 0.18],
								['c', 0.6, 0.3, 0.84, 0.39, 1.2, 0.36],
								['c', 0.87, -0.09, 1.77, -0.69, 3.24, -2.31],
								['c', 2.67, -2.85, 4.59, -5.94, 5.7, -9.15],
								['c', 0.15, -0.45, 0.24, -0.63, 0.42, -0.81],
								['c', 0.21, -0.24, 0.6, -0.45, 0.99, -0.51],
								['z'],
								['m', -3.99, 16.05],
								['c', 0.18, 0, 0.69, -0.03, 1.17, 0],
								['c', 3.27, 0.03, 5.37, 0.75, 6, 2.07],
								['c', 0.45, 0.99, 0.12, 2.4, -0.81, 3.42],
								['c', -0.24, 0.27, -0.57, 0.57, -0.84, 0.75],
								['c', -0.09, 0.06, -0.18, 0.09, -0.18, 0.12],
								['c', 0, 0, 0.18, 0.03, 0.42, 0.09],
								['c', 1.23, 0.3, 2.01, 0.81, 2.37, 1.59],
								['c', 0.27, 0.54, 0.3, 1.32, 0.09, 2.1],
								['c', -0.12, 0.36, -0.45, 1.05, -0.69, 1.35],
								['c', -0.87, 1.17, -2.1, 1.92, -3.54, 2.25],
								['c', -0.36, 0.06, -0.48, 0.06, -0.96, 0.06],
								['c', -0.45, 0, -0.66, 0, -0.84, -0.03],
								['c', -0.84, -0.18, -1.47, -0.51, -2.07, -1.11],
								['c', -0.33, -0.33, -0.45, -0.51, -0.45, -0.63],
								['c', 0, -0.06, 0.03, -0.15, 0.06, -0.24],
								['c', 0.18, -0.33, 0.69, -0.6, 0.93, -0.48],
								['c', 0.03, 0.03, 0.15, 0.12, 0.27, 0.24],
								['c', 0.39, 0.42, 0.99, 0.57, 1.62, 0.45],
								['c', 1.05, -0.21, 1.98, -1.02, 2.31, -2.01],
								['c', 0.48, -1.53, -0.48, -2.55, -2.58, -2.67],
								['c', -0.21, 0, -0.36, -0.03, -0.42, -0.06],
								['c', -0.15, -0.09, -0.21, -0.51, -0.06, -0.78],
								['c', 0.12, -0.27, 0.24, -0.33, 0.6, -0.36],
								['c', 0.57, -0.06, 1.11, -0.42, 1.5, -0.99],
								['c', 0.48, -0.72, 0.54, -1.59, 0.18, -2.31],
								['c', -0.12, -0.21, -0.45, -0.54, -0.69, -0.69],
								['c', -0.33, -0.21, -0.93, -0.45, -1.35, -0.51],
								['l', -0.12, -0.03],
								['l', -0.06, 0.48],
								['c', -0.54, 2.94, -1.14, 6.24, -1.29, 6.75],
								['c', -0.33, 1.35, -0.93, 2.61, -1.65, 3.6],
								['c', -0.3, 0.36, -0.81, 0.9, -1.14, 1.14],
								['c', -0.3, 0.24, -0.84, 0.48, -1.14, 0.57],
								['c', -0.33, 0.09, -0.96, 0.09, -1.26, 0.03],
								['c', -0.45, -0.12, -0.87, -0.39, -1.53, -0.96],
								['c', -0.24, -0.15, -0.51, -0.39, -0.63, -0.48],
								['c', -0.3, -0.21, -0.33, -0.33, -0.21, -0.63],
								['c', 0.12, -0.18, 0.27, -0.36, 0.42, -0.45],
								['c', 0.27, -0.12, 0.36, -0.09, 0.87, 0.33],
								['c', 0.78, 0.6, 1.08, 0.75, 1.65, 0.72],
								['c', 0.45, -0.03, 0.81, -0.21, 1.17, -0.54],
								['c', 0.87, -0.9, 1.38, -2.85, 1.38, -5.37],
								['c', 0, -0.6, 0.03, -1.11, 0.12, -2.04],
								['c', 0.06, -0.69, 0.24, -2.01, 0.33, -2.58],
								['c', 0.06, -0.24, 0.06, -0.42, 0.06, -0.42],
								['c', 0, 0, -0.12, 0.03, -0.21, 0.09],
								['c', -1.44, 0.57, -2.16, 1.65, -1.74, 2.55],
								['c', 0.09, 0.15, 0.18, 0.24, 0.27, 0.33],
								['c', 0.24, 0.21, 0.3, 0.27, 0.33, 0.39],
								['c', 0.06, 0.24, 0, 0.63, -0.15, 0.78],
								['c', -0.09, 0.12, -0.54, 0.21, -0.96, 0.24],
								['c', -1.02, 0.03, -2.01, -0.48, -2.43, -1.32],
								['c', -0.21, -0.45, -0.27, -0.9, -0.15, -1.44],
								['c', 0.06, -0.27, 0.21, -0.66, 0.39, -0.93],
								['c', 0.87, -1.29, 3, -2.22, 5.64, -2.43],
								['z']
							],
							w: 19.643,
							h: 43.325
						},
						'tab.tiny': {
							d: [
								['M', 16.02, -17.25],
								['c', 0.12, -0.09, 0.15, -0.09, 0.27, -0.09],
								['c', 0.21, 0.03, 0.51, 0.3, 0.51, 0.45],
								['c', 0, 0.06, -0.12, 0.18, -0.3, 0.36],
								['c', -1.11, 1.08, -2.55, 1.59, -3.84, 1.41],
								['c', -0.15, -0.03, -0.33, -0.06, -0.39, -0.09],
								['c', -0.06, -0.03, -0.09, -0.03, -0.12, -0.03],
								['c', 0, 0, -0.06, 0.42, -0.15, 0.93],
								['c', -0.33, 2.01, -0.66, 3.69, -0.84, 4.26],
								['c', -0.42, 1.41, -1.23, 2.67, -2.16, 3.33],
								['c', -0.27, 0.18, -0.75, 0.42, -0.99, 0.48],
								['c', -0.3, 0.09, -0.72, 0.09, -1.02, 0.06],
								['c', -0.45, -0.09, -0.84, -0.33, -1.53, -0.9],
								['c', -0.21, -0.18, -0.51, -0.39, -0.63, -0.48],
								['c', -0.27, -0.21, -0.3, -0.24, -0.3, -0.36],
								['c', 0, -0.12, 0.09, -0.36, 0.18, -0.45],
								['c', 0.09, -0.09, 0.27, -0.18, 0.36, -0.18],
								['c', 0.12, 0, 0.3, 0.12, 0.66, 0.45],
								['c', 0.57, 0.51, 0.87, 0.69, 1.23, 0.72],
								['c', 0.93, 0.06, 1.68, -0.78, 1.98, -2.37],
								['c', 0.09, -0.39, 0.15, -0.75, 0.18, -1.53],
								['c', 0.06, -0.99, 0.24, -2.79, 0.42, -4.05],
								['c', 0.03, -0.3, 0.06, -0.57, 0.06, -0.6],
								['c', 0, -0.06, -0.03, -0.09, -0.15, -0.12],
								['c', -0.9, -0.18, -2.13, 0.06, -2.76, 0.57],
								['c', -0.36, 0.3, -0.51, 0.6, -0.51, 1.02],
								['c', 0, 0.45, 0.15, 0.75, 0.48, 0.99],
								['c', 0.06, 0.06, 0.15, 0.18, 0.18, 0.24],
								['c', 0.12, 0.24, 0.03, 0.63, -0.15, 0.69],
								['c', -0.24, 0.12, -0.6, 0.15, -0.9, 0.15],
								['c', -0.36, -0.03, -0.57, -0.09, -0.87, -0.24],
								['c', -0.78, -0.36, -1.23, -1.11, -1.2, -1.92],
								['c', 0.12, -1.53, 1.74, -2.49, 4.62, -2.7],
								['c', 1.2, -0.09, 1.47, -0.03, 3.33, 0.57],
								['c', 0.9, 0.3, 1.14, 0.36, 1.56, 0.39],
								['c', 0.45, 0, 0.93, -0.06, 1.38, -0.21],
								['c', 0.51, -0.18, 0.81, -0.33, 1.41, -0.75],
								['z'],
								['m', -4.68, 10.38],
								['c', 0.39, -0.06, 0.84, 0, 1.2, 0.15],
								['c', 0.24, 0.12, 0.36, 0.21, 0.45, 0.36],
								['l', 0.09, 0.09],
								['l', -0.06, 1.41],
								['c', -0.09, 2.19, -0.18, 3.96, -0.27, 5.49],
								['c', -0.03, 0.78, -0.06, 1.59, -0.06, 1.86],
								['c', 0, 0.42, 0, 0.48, 0.06, 0.57],
								['c', 0.06, 0.18, 0.18, 0.24, 0.36, 0.27],
								['c', 0.18, 0, 0.39, -0.06, 0.84, -0.27],
								['c', 0.45, -0.21, 0.54, -0.24, 0.63, -0.18],
								['c', 0.12, 0.12, 0.15, 0.54, 0.03, 0.69],
								['c', -0.03, 0.03, -0.15, 0.12, -0.27, 0.18],
								['c', -0.15, 0.03, -0.3, 0.12, -0.36, 0.15],
								['c', -0.87, 0.45, -1.02, 0.51, -1.26, 0.57],
								['c', -0.33, 0.09, -0.6, 0.06, -0.84, -0.06],
								['c', -0.42, -0.18, -0.63, -0.6, -0.87, -1.44],
								['c', -0.3, -1.23, -0.57, -2.97, -0.66, -4.08],
								['c', 0, -0.18, -0.03, -0.3, -0.03, -0.33],
								['l', -0.06, 0.06],
								['c', -0.18, 0.27, -1.11, 1.38, -1.68, 2.01],
								['l', -0.33, 0.33],
								['l', 0.06, 0.09],
								['c', 0.06, 0.15, 0.27, 0.33, 0.48, 0.42],
								['c', 0.27, 0.18, 0.51, 0.24, 0.96, 0.27],
								['l', 0.39, 0],
								['l', 0.03, 0.12],
								['c', 0.12, 0.21, 0.03, 0.57, -0.15, 0.69],
								['c', -0.03, 0.03, -0.21, 0.09, -0.36, 0.15],
								['c', -0.27, 0.06, -0.39, 0.06, -0.75, 0.06],
								['c', -0.48, 0, -0.75, -0.03, -1.08, -0.21],
								['c', -0.21, -0.12, -0.51, -0.36, -0.57, -0.48],
								['l', -0.03, -0.09],
								['l', -0.39, 0.36],
								['c', -1.47, 1.35, -2.49, 1.98, -3.42, 2.13],
								['c', -0.54, 0.09, -0.96, -0.03, -1.62, -0.39],
								['c', -0.21, -0.15, -0.45, -0.27, -0.54, -0.3],
								['c', -0.18, -0.09, -0.21, -0.21, -0.12, -0.45],
								['c', 0.06, -0.27, 0.33, -0.48, 0.54, -0.48],
								['c', 0.03, 0, 0.27, 0.09, 0.48, 0.21],
								['c', 0.48, 0.24, 0.69, 0.27, 0.99, 0.27],
								['c', 0.6, -0.06, 1.17, -0.42, 2.1, -1.35],
								['c', 2.22, -2.22, 4.02, -4.98, 4.95, -7.59],
								['c', 0.21, -0.57, 0.3, -0.78, 0.48, -0.93],
								['c', 0.15, -0.15, 0.42, -0.27, 0.66, -0.33],
								['z'],
								['m', -3.06, 12.84],
								['c', 0.27, -0.03, 1.68, 0, 2.01, 0.03],
								['c', 1.92, 0.18, 3.15, 0.69, 3.63, 1.5],
								['c', 0.18, 0.33, 0.24, 0.51, 0.21, 0.93],
								['c', 0, 0.45, -0.06, 0.72, -0.24, 1.11],
								['c', -0.24, 0.51, -0.69, 1.02, -1.17, 1.35],
								['c', -0.21, 0.15, -0.21, 0.15, -0.12, 0.18],
								['c', 0.72, 0.15, 1.11, 0.3, 1.5, 0.57],
								['c', 0.39, 0.24, 0.63, 0.57, 0.75, 0.96],
								['c', 0.09, 0.3, 0.09, 0.96, 0, 1.29],
								['c', -0.15, 0.57, -0.39, 1.05, -0.78, 1.5],
								['c', -0.66, 0.75, -1.62, 1.32, -2.61, 1.53],
								['c', -0.27, 0.06, -0.42, 0.06, -0.84, 0.06],
								['c', -0.48, 0, -0.57, 0, -0.81, -0.06],
								['c', -0.6, -0.18, -1.05, -0.42, -1.47, -0.81],
								['c', -0.36, -0.39, -0.42, -0.51, -0.3, -0.75],
								['c', 0.12, -0.21, 0.39, -0.39, 0.6, -0.39],
								['c', 0.09, 0, 0.15, 0.03, 0.33, 0.18],
								['c', 0.12, 0.12, 0.27, 0.24, 0.36, 0.27],
								['c', 0.96, 0.48, 2.46, -0.33, 2.82, -1.5],
								['c', 0.24, -0.81, -0.03, -1.44, -0.69, -1.77],
								['c', -0.39, -0.21, -1.02, -0.33, -1.53, -0.33],
								['c', -0.18, 0, -0.21, 0, -0.27, -0.09],
								['c', -0.06, -0.09, -0.06, -0.3, -0.03, -0.48],
								['c', 0.06, -0.18, 0.18, -0.36, 0.33, -0.36],
								['c', 0.39, -0.06, 0.51, -0.09, 0.72, -0.18],
								['c', 0.69, -0.36, 1.11, -1.23, 0.99, -2.01],
								['c', -0.09, -0.51, -0.42, -0.9, -0.93, -1.17],
								['c', -0.24, -0.12, -0.6, -0.27, -0.87, -0.3],
								['c', -0.09, -0.03, -0.09, -0.03, -0.12, 0.12],
								['c', 0, 0.09, -0.21, 1.11, -0.42, 2.25],
								['c', -0.66, 3.75, -0.72, 3.99, -1.26, 5.07],
								['c', -0.9, 1.89, -2.25, 2.85, -3.48, 2.61],
								['c', -0.39, -0.09, -0.69, -0.27, -1.38, -0.84],
								['c', -0.63, -0.51, -0.63, -0.48, -0.63, -0.6],
								['c', 0, -0.18, 0.18, -0.48, 0.39, -0.57],
								['c', 0.21, -0.12, 0.3, -0.09, 0.81, 0.33],
								['c', 0.15, 0.15, 0.39, 0.3, 0.54, 0.36],
								['c', 0.18, 0.12, 0.27, 0.12, 0.48, 0.15],
								['c', 0.99, 0.06, 1.71, -0.78, 2.04, -2.46],
								['c', 0.12, -0.66, 0.18, -1.14, 0.21, -2.22],
								['c', 0.03, -1.23, 0.12, -2.25, 0.36, -3.63],
								['c', 0.03, -0.24, 0.06, -0.45, 0.06, -0.48],
								['c', -0.06, -0.03, -0.66, 0.27, -0.9, 0.42],
								['c', -0.06, 0.06, -0.21, 0.18, -0.33, 0.3],
								['c', -0.57, 0.57, -0.6, 1.35, -0.06, 1.74],
								['c', 0.18, 0.12, 0.24, 0.24, 0.21, 0.51],
								['c', -0.03, 0.3, -0.15, 0.42, -0.57, 0.48],
								['c', -1.11, 0.24, -2.22, -0.42, -2.43, -1.38],
								['c', -0.09, -0.45, 0.03, -1.02, 0.3, -1.47],
								['c', 0.18, -0.24, 0.6, -0.63, 0.9, -0.84],
								['c', 0.9, -0.6, 2.28, -1.02, 3.69, -1.11],
								['z']
							],
							w: 15.709,
							h: 34.656
						},
						'timesig.common': {
							d: [
								['M', 6.66, -7.83],
								['c', 0.72, -0.06, 1.41, -0.03, 1.98, 0.09],
								['c', 1.2, 0.27, 2.34, 0.96, 3.09, 1.92],
								['c', 0.63, 0.81, 1.08, 1.86, 1.14, 2.73],
								['c', 0.06, 1.02, -0.51, 1.92, -1.44, 2.22],
								['c', -0.24, 0.09, -0.3, 0.09, -0.63, 0.09],
								['c', -0.33, 0, -0.42, 0, -0.63, -0.06],
								['c', -0.66, -0.24, -1.14, -0.63, -1.41, -1.2],
								['c', -0.15, -0.3, -0.21, -0.51, -0.24, -0.9],
								['c', -0.06, -1.08, 0.57, -2.04, 1.56, -2.37],
								['c', 0.18, -0.06, 0.27, -0.06, 0.63, -0.06],
								['l', 0.45, 0],
								['c', 0.06, 0.03, 0.09, 0.03, 0.09, 0],
								['c', 0, 0, -0.09, -0.12, -0.24, -0.27],
								['c', -1.02, -1.11, -2.55, -1.68, -4.08, -1.5],
								['c', -1.29, 0.15, -2.04, 0.69, -2.4, 1.74],
								['c', -0.36, 0.93, -0.42, 1.89, -0.42, 5.37],
								['c', 0, 2.97, 0.06, 3.96, 0.24, 4.77],
								['c', 0.24, 1.08, 0.63, 1.68, 1.41, 2.07],
								['c', 0.81, 0.39, 2.16, 0.45, 3.18, 0.09],
								['c', 1.29, -0.45, 2.37, -1.53, 3.03, -2.97],
								['c', 0.15, -0.33, 0.33, -0.87, 0.39, -1.17],
								['c', 0.09, -0.24, 0.15, -0.36, 0.3, -0.39],
								['c', 0.21, -0.03, 0.42, 0.15, 0.39, 0.36],
								['c', -0.06, 0.39, -0.42, 1.38, -0.69, 1.89],
								['c', -0.96, 1.8, -2.49, 2.94, -4.23, 3.18],
								['c', -0.99, 0.12, -2.58, -0.06, -3.63, -0.45],
								['c', -0.96, -0.36, -1.71, -0.84, -2.4, -1.5],
								['c', -1.11, -1.11, -1.8, -2.61, -2.04, -4.56],
								['c', -0.06, -0.6, -0.06, -2.01, 0, -2.61],
								['c', 0.24, -1.95, 0.9, -3.45, 2.01, -4.56],
								['c', 0.69, -0.66, 1.44, -1.11, 2.37, -1.47],
								['c', 0.63, -0.24, 1.47, -0.42, 2.22, -0.48],
								['z']
							],
							w: 13.038,
							h: 15.689
						},
						'timesig.cut': {
							d: [
								['M', 6.24, -10.44],
								['c', 0.09, -0.06, 0.09, -0.06, 0.48, -0.06],
								['c', 0.36, 0, 0.36, 0, 0.45, 0.06],
								['l', 0.06, 0.09],
								['l', 0, 1.23],
								['l', 0, 1.26],
								['l', 0.27, 0],
								['c', 1.26, 0, 2.49, 0.45, 3.48, 1.29],
								['c', 1.05, 0.87, 1.8, 2.28, 1.89, 3.48],
								['c', 0.06, 1.02, -0.51, 1.92, -1.44, 2.22],
								['c', -0.24, 0.09, -0.3, 0.09, -0.63, 0.09],
								['c', -0.33, 0, -0.42, 0, -0.63, -0.06],
								['c', -0.66, -0.24, -1.14, -0.63, -1.41, -1.2],
								['c', -0.15, -0.3, -0.21, -0.51, -0.24, -0.9],
								['c', -0.06, -1.08, 0.57, -2.04, 1.56, -2.37],
								['c', 0.18, -0.06, 0.27, -0.06, 0.63, -0.06],
								['l', 0.45, 0],
								['c', 0.06, 0.03, 0.09, 0.03, 0.09, 0],
								['c', 0, -0.03, -0.45, -0.51, -0.66, -0.69],
								['c', -0.87, -0.69, -1.83, -1.05, -2.94, -1.11],
								['l', -0.42, 0],
								['l', 0, 7.17],
								['l', 0, 7.14],
								['l', 0.42, 0],
								['c', 0.69, -0.03, 1.23, -0.18, 1.86, -0.51],
								['c', 1.05, -0.51, 1.89, -1.47, 2.46, -2.7],
								['c', 0.15, -0.33, 0.33, -0.87, 0.39, -1.17],
								['c', 0.09, -0.24, 0.15, -0.36, 0.3, -0.39],
								['c', 0.21, -0.03, 0.42, 0.15, 0.39, 0.36],
								['c', -0.03, 0.24, -0.21, 0.78, -0.39, 1.2],
								['c', -0.96, 2.37, -2.94, 3.9, -5.13, 3.9],
								['l', -0.3, 0],
								['l', 0, 1.26],
								['l', 0, 1.23],
								['l', -0.06, 0.09],
								['c', -0.09, 0.06, -0.09, 0.06, -0.45, 0.06],
								['c', -0.39, 0, -0.39, 0, -0.48, -0.06],
								['l', -0.06, -0.09],
								['l', 0, -1.29],
								['l', 0, -1.29],
								['l', -0.21, -0.03],
								['c', -1.23, -0.21, -2.31, -0.63, -3.21, -1.29],
								['c', -0.15, -0.09, -0.45, -0.36, -0.66, -0.57],
								['c', -1.11, -1.11, -1.8, -2.61, -2.04, -4.56],
								['c', -0.06, -0.6, -0.06, -2.01, 0, -2.61],
								['c', 0.24, -1.95, 0.93, -3.45, 2.04, -4.59],
								['c', 0.42, -0.39, 0.78, -0.66, 1.26, -0.93],
								['c', 0.75, -0.45, 1.65, -0.75, 2.61, -0.9],
								['l', 0.21, -0.03],
								['l', 0, -1.29],
								['l', 0, -1.29],
								['z'],
								['m', -0.06, 10.44],
								['c', 0, -5.58, 0, -6.99, -0.03, -6.99],
								['c', -0.15, 0, -0.63, 0.27, -0.87, 0.45],
								['c', -0.45, 0.36, -0.75, 0.93, -0.93, 1.77],
								['c', -0.18, 0.81, -0.24, 1.8, -0.24, 4.74],
								['c', 0, 2.97, 0.06, 3.96, 0.24, 4.77],
								['c', 0.24, 1.08, 0.66, 1.68, 1.41, 2.07],
								['c', 0.12, 0.06, 0.3, 0.12, 0.33, 0.15],
								['l', 0.09, 0],
								['l', 0, -6.96],
								['z']
							],
							w: 13.038,
							h: 20.97
						},
						'timesig.imperfectum': {
							d: [
								['M', 13, -5],
								['a', 8, 8, 0, 1, 0, 0, 10]
							],
							w: 13.038,
							h: 20.97
						},
						'timesig.imperfectum2': {
							d: [
								['M', 13, -5],
								['a', 8, 8, 0, 1, 0, 0, 10]
							],
							w: 13.038,
							h: 20.97
						},
						'timesig.perfectum': {
							d: [
								['M', 13, -5],
								['a', 8, 8, 0, 1, 0, 0, 10]
							],
							w: 13.038,
							h: 20.97
						},
						'timesig.perfectum2': {
							d: [
								['M', 13, -5],
								['a', 8, 8, 0, 1, 0, 0, 10]
							],
							w: 13.038,
							h: 20.97
						},
						f: {
							d: [
								['M', 9.93, -14.28],
								['c', 1.53, -0.18, 2.88, 0.45, 3.12, 1.5],
								['c', 0.12, 0.51, 0, 1.32, -0.27, 1.86],
								['c', -0.15, 0.3, -0.42, 0.57, -0.63, 0.69],
								['c', -0.69, 0.36, -1.56, 0.03, -1.83, -0.69],
								['c', -0.09, -0.24, -0.09, -0.69, 0, -0.87],
								['c', 0.06, -0.12, 0.21, -0.24, 0.45, -0.42],
								['c', 0.42, -0.24, 0.57, -0.45, 0.6, -0.72],
								['c', 0.03, -0.33, -0.09, -0.39, -0.63, -0.42],
								['c', -0.3, 0, -0.45, 0, -0.6, 0.03],
								['c', -0.81, 0.21, -1.35, 0.93, -1.74, 2.46],
								['c', -0.06, 0.27, -0.48, 2.25, -0.48, 2.31],
								['c', 0, 0.03, 0.39, 0.03, 0.9, 0.03],
								['c', 0.72, 0, 0.9, 0, 0.99, 0.06],
								['c', 0.42, 0.15, 0.45, 0.72, 0.03, 0.9],
								['c', -0.12, 0.06, -0.24, 0.06, -1.17, 0.06],
								['l', -1.05, 0],
								['l', -0.78, 2.55],
								['c', -0.45, 1.41, -0.87, 2.79, -0.96, 3.06],
								['c', -0.87, 2.37, -2.37, 4.74, -3.78, 5.91],
								['c', -1.05, 0.9, -2.04, 1.23, -3.09, 1.08],
								['c', -1.11, -0.18, -1.89, -0.78, -2.04, -1.59],
								['c', -0.12, -0.66, 0.15, -1.71, 0.54, -2.19],
								['c', 0.69, -0.75, 1.86, -0.54, 2.22, 0.39],
								['c', 0.06, 0.15, 0.09, 0.27, 0.09, 0.48],
								['c', 0, 0.24, -0.03, 0.27, -0.12, 0.42],
								['c', -0.03, 0.09, -0.15, 0.18, -0.27, 0.27],
								['c', -0.09, 0.06, -0.27, 0.21, -0.36, 0.27],
								['c', -0.24, 0.18, -0.36, 0.36, -0.39, 0.6],
								['c', -0.03, 0.33, 0.09, 0.39, 0.63, 0.42],
								['c', 0.42, 0, 0.63, -0.03, 0.9, -0.15],
								['c', 0.6, -0.3, 0.96, -0.96, 1.38, -2.64],
								['c', 0.09, -0.42, 0.63, -2.55, 1.17, -4.77],
								['l', 1.02, -4.08],
								['c', 0, -0.03, -0.36, -0.03, -0.81, -0.03],
								['c', -0.72, 0, -0.81, 0, -0.93, -0.06],
								['c', -0.42, -0.18, -0.39, -0.75, 0.03, -0.9],
								['c', 0.09, -0.06, 0.27, -0.06, 1.05, -0.06],
								['l', 0.96, 0],
								['l', 0, -0.09],
								['c', 0.06, -0.18, 0.3, -0.72, 0.51, -1.17],
								['c', 1.2, -2.46, 3.3, -4.23, 5.34, -4.5],
								['z']
							],
							w: 16.155,
							h: 19.445
						},
						m: {
							d: [
								['M', 2.79, -8.91],
								['c', 0.09, 0, 0.3, -0.03, 0.45, -0.03],
								['c', 0.24, 0.03, 0.3, 0.03, 0.45, 0.12],
								['c', 0.36, 0.15, 0.63, 0.54, 0.75, 1.02],
								['l', 0.03, 0.21],
								['l', 0.33, -0.3],
								['c', 0.69, -0.69, 1.38, -1.02, 2.07, -1.02],
								['c', 0.27, 0, 0.33, 0, 0.48, 0.06],
								['c', 0.21, 0.09, 0.48, 0.36, 0.63, 0.6],
								['c', 0.03, 0.09, 0.12, 0.27, 0.18, 0.42],
								['c', 0.03, 0.15, 0.09, 0.27, 0.12, 0.27],
								['c', 0, 0, 0.09, -0.09, 0.18, -0.21],
								['c', 0.33, -0.39, 0.87, -0.81, 1.29, -0.99],
								['c', 0.78, -0.33, 1.47, -0.21, 2.01, 0.33],
								['c', 0.3, 0.33, 0.48, 0.69, 0.6, 1.14],
								['c', 0.09, 0.42, 0.06, 0.54, -0.54, 3.06],
								['c', -0.33, 1.29, -0.57, 2.4, -0.57, 2.43],
								['c', 0, 0.12, 0.09, 0.21, 0.21, 0.21],
								['c', 0.24, 0, 0.75, -0.3, 1.2, -0.72],
								['c', 0.45, -0.39, 0.6, -0.45, 0.78, -0.27],
								['c', 0.18, 0.18, 0.09, 0.36, -0.45, 0.87],
								['c', -1.05, 0.96, -1.83, 1.47, -2.58, 1.71],
								['c', -0.93, 0.33, -1.53, 0.21, -1.8, -0.33],
								['c', -0.06, -0.15, -0.06, -0.21, -0.06, -0.45],
								['c', 0, -0.24, 0.03, -0.48, 0.6, -2.82],
								['c', 0.42, -1.71, 0.6, -2.64, 0.63, -2.79],
								['c', 0.03, -0.57, -0.3, -0.75, -0.84, -0.48],
								['c', -0.24, 0.12, -0.54, 0.39, -0.66, 0.63],
								['c', -0.03, 0.09, -0.42, 1.38, -0.9, 3],
								['c', -0.9, 3.15, -0.84, 3, -1.14, 3.15],
								['l', -0.15, 0.09],
								['l', -0.78, 0],
								['c', -0.6, 0, -0.78, 0, -0.84, -0.06],
								['c', -0.09, -0.03, -0.18, -0.18, -0.18, -0.27],
								['c', 0, -0.03, 0.36, -1.38, 0.84, -2.97],
								['c', 0.57, -2.04, 0.81, -2.97, 0.84, -3.12],
								['c', 0.03, -0.54, -0.3, -0.72, -0.84, -0.45],
								['c', -0.24, 0.12, -0.57, 0.42, -0.66, 0.63],
								['c', -0.06, 0.09, -0.51, 1.44, -1.05, 2.97],
								['c', -0.51, 1.56, -0.99, 2.85, -0.99, 2.91],
								['c', -0.06, 0.12, -0.21, 0.24, -0.36, 0.3],
								['c', -0.12, 0.06, -0.21, 0.06, -0.9, 0.06],
								['c', -0.6, 0, -0.78, 0, -0.84, -0.06],
								['c', -0.09, -0.03, -0.18, -0.18, -0.18, -0.27],
								['c', 0, -0.03, 0.45, -1.38, 0.99, -2.97],
								['c', 1.05, -3.18, 1.05, -3.18, 0.93, -3.45],
								['c', -0.12, -0.27, -0.39, -0.3, -0.72, -0.15],
								['c', -0.54, 0.27, -1.14, 1.17, -1.56, 2.4],
								['c', -0.06, 0.15, -0.15, 0.3, -0.18, 0.36],
								['c', -0.21, 0.21, -0.57, 0.27, -0.72, 0.09],
								['c', -0.09, -0.09, -0.06, -0.21, 0.06, -0.63],
								['c', 0.48, -1.26, 1.26, -2.46, 2.01, -3.21],
								['c', 0.57, -0.54, 1.2, -0.87, 1.83, -1.02],
								['z']
							],
							w: 14.687,
							h: 9.126
						},
						p: {
							d: [
								['M', 1.92, -8.7],
								['c', 0.27, -0.09, 0.81, -0.06, 1.11, 0.03],
								['c', 0.54, 0.18, 0.93, 0.51, 1.17, 0.99],
								['c', 0.09, 0.15, 0.15, 0.33, 0.18, 0.36],
								['l', 0, 0.12],
								['l', 0.3, -0.27],
								['c', 0.66, -0.6, 1.35, -1.02, 2.13, -1.2],
								['c', 0.21, -0.06, 0.33, -0.06, 0.78, -0.06],
								['c', 0.45, 0, 0.51, 0, 0.84, 0.09],
								['c', 1.29, 0.33, 2.07, 1.32, 2.25, 2.79],
								['c', 0.09, 0.81, -0.09, 2.01, -0.45, 2.79],
								['c', -0.54, 1.26, -1.86, 2.55, -3.18, 3.03],
								['c', -0.45, 0.18, -0.81, 0.24, -1.29, 0.24],
								['c', -0.69, -0.03, -1.35, -0.18, -1.86, -0.45],
								['c', -0.3, -0.15, -0.51, -0.18, -0.69, -0.09],
								['c', -0.09, 0.03, -0.18, 0.09, -0.18, 0.12],
								['c', -0.09, 0.12, -1.05, 2.94, -1.05, 3.06],
								['c', 0, 0.24, 0.18, 0.48, 0.51, 0.63],
								['c', 0.18, 0.06, 0.54, 0.15, 0.75, 0.15],
								['c', 0.21, 0, 0.36, 0.06, 0.42, 0.18],
								['c', 0.12, 0.18, 0.06, 0.42, -0.12, 0.54],
								['c', -0.09, 0.03, -0.15, 0.03, -0.78, 0],
								['c', -1.98, -0.15, -3.81, -0.15, -5.79, 0],
								['c', -0.63, 0.03, -0.69, 0.03, -0.78, 0],
								['c', -0.24, -0.15, -0.24, -0.57, 0.03, -0.66],
								['c', 0.06, -0.03, 0.48, -0.09, 0.99, -0.12],
								['c', 0.87, -0.06, 1.11, -0.09, 1.35, -0.21],
								['c', 0.18, -0.06, 0.33, -0.18, 0.39, -0.3],
								['c', 0.06, -0.12, 3.24, -9.42, 3.27, -9.6],
								['c', 0.06, -0.33, 0.03, -0.57, -0.15, -0.69],
								['c', -0.09, -0.06, -0.12, -0.06, -0.3, -0.06],
								['c', -0.69, 0.06, -1.53, 1.02, -2.28, 2.61],
								['c', -0.09, 0.21, -0.21, 0.45, -0.27, 0.51],
								['c', -0.09, 0.12, -0.33, 0.24, -0.48, 0.24],
								['c', -0.18, 0, -0.36, -0.15, -0.36, -0.3],
								['c', 0, -0.24, 0.78, -1.83, 1.26, -2.55],
								['c', 0.72, -1.11, 1.47, -1.74, 2.28, -1.92],
								['z'],
								['m', 5.37, 1.47],
								['c', -0.27, -0.12, -0.75, -0.03, -1.14, 0.21],
								['c', -0.75, 0.48, -1.47, 1.68, -1.89, 3.15],
								['c', -0.45, 1.47, -0.42, 2.34, 0, 2.7],
								['c', 0.45, 0.39, 1.26, 0.21, 1.83, -0.36],
								['c', 0.51, -0.51, 0.99, -1.68, 1.38, -3.27],
								['c', 0.3, -1.17, 0.33, -1.74, 0.15, -2.13],
								['c', -0.09, -0.15, -0.15, -0.21, -0.33, -0.3],
								['z']
							],
							w: 14.689,
							h: 13.127
						},
						r: {
							d: [
								['M', 6.33, -9.12],
								['c', 0.27, -0.03, 0.93, 0, 1.2, 0.06],
								['c', 0.84, 0.21, 1.23, 0.81, 1.02, 1.53],
								['c', -0.24, 0.75, -0.9, 1.17, -1.56, 0.96],
								['c', -0.33, -0.09, -0.51, -0.3, -0.66, -0.75],
								['c', -0.03, -0.12, -0.09, -0.24, -0.12, -0.3],
								['c', -0.09, -0.15, -0.3, -0.24, -0.48, -0.24],
								['c', -0.57, 0, -1.38, 0.54, -1.65, 1.08],
								['c', -0.06, 0.15, -0.33, 1.17, -0.9, 3.27],
								['c', -0.57, 2.31, -0.81, 3.12, -0.87, 3.21],
								['c', -0.03, 0.06, -0.12, 0.15, -0.18, 0.21],
								['l', -0.12, 0.06],
								['l', -0.81, 0.03],
								['c', -0.69, 0, -0.81, 0, -0.9, -0.03],
								['c', -0.09, -0.06, -0.18, -0.21, -0.18, -0.3],
								['c', 0, -0.06, 0.39, -1.62, 0.9, -3.51],
								['c', 0.84, -3.24, 0.87, -3.45, 0.87, -3.72],
								['c', 0, -0.21, 0, -0.27, -0.03, -0.36],
								['c', -0.12, -0.15, -0.21, -0.24, -0.42, -0.24],
								['c', -0.24, 0, -0.45, 0.15, -0.78, 0.42],
								['c', -0.33, 0.36, -0.45, 0.54, -0.72, 1.14],
								['c', -0.03, 0.12, -0.21, 0.24, -0.36, 0.27],
								['c', -0.12, 0, -0.15, 0, -0.24, -0.06],
								['c', -0.18, -0.12, -0.18, -0.21, -0.06, -0.54],
								['c', 0.21, -0.57, 0.42, -0.93, 0.78, -1.32],
								['c', 0.54, -0.51, 1.2, -0.81, 1.95, -0.87],
								['c', 0.81, -0.03, 1.53, 0.3, 1.92, 0.87],
								['l', 0.12, 0.18],
								['l', 0.09, -0.09],
								['c', 0.57, -0.45, 1.41, -0.84, 2.19, -0.96],
								['z']
							],
							w: 9.41,
							h: 9.132
						},
						s: {
							d: [
								['M', 4.47, -8.73],
								['c', 0.09, 0, 0.36, -0.03, 0.57, -0.03],
								['c', 0.75, 0.03, 1.29, 0.24, 1.71, 0.63],
								['c', 0.51, 0.54, 0.66, 1.26, 0.36, 1.83],
								['c', -0.24, 0.42, -0.63, 0.57, -1.11, 0.42],
								['c', -0.33, -0.09, -0.6, -0.36, -0.6, -0.57],
								['c', 0, -0.03, 0.06, -0.21, 0.15, -0.39],
								['c', 0.12, -0.21, 0.15, -0.33, 0.18, -0.48],
								['c', 0, -0.24, -0.06, -0.48, -0.15, -0.6],
								['c', -0.15, -0.21, -0.42, -0.24, -0.75, -0.15],
								['c', -0.27, 0.06, -0.48, 0.18, -0.69, 0.36],
								['c', -0.39, 0.39, -0.51, 0.96, -0.33, 1.38],
								['c', 0.09, 0.21, 0.42, 0.51, 0.78, 0.72],
								['c', 1.11, 0.69, 1.59, 1.11, 1.89, 1.68],
								['c', 0.21, 0.39, 0.24, 0.78, 0.15, 1.29],
								['c', -0.18, 1.2, -1.17, 2.16, -2.52, 2.52],
								['c', -1.02, 0.24, -1.95, 0.12, -2.7, -0.42],
								['c', -0.72, -0.51, -0.99, -1.47, -0.6, -2.19],
								['c', 0.24, -0.48, 0.72, -0.63, 1.17, -0.42],
								['c', 0.33, 0.18, 0.54, 0.45, 0.57, 0.81],
								['c', 0, 0.21, -0.03, 0.3, -0.33, 0.51],
								['c', -0.33, 0.24, -0.39, 0.42, -0.27, 0.69],
								['c', 0.06, 0.15, 0.21, 0.27, 0.45, 0.33],
								['c', 0.3, 0.09, 0.87, 0.09, 1.2, 0],
								['c', 0.75, -0.21, 1.23, -0.72, 1.29, -1.35],
								['c', 0.03, -0.42, -0.15, -0.81, -0.54, -1.2],
								['c', -0.24, -0.24, -0.48, -0.42, -1.41, -1.02],
								['c', -0.69, -0.42, -1.05, -0.93, -1.05, -1.47],
								['c', 0, -0.39, 0.12, -0.87, 0.3, -1.23],
								['c', 0.27, -0.57, 0.78, -1.05, 1.38, -1.35],
								['c', 0.24, -0.12, 0.63, -0.27, 0.9, -0.3],
								['z']
							],
							w: 6.632,
							h: 8.758
						},
						z: {
							d: [
								['M', 2.64, -7.95],
								['c', 0.36, -0.09, 0.81, -0.03, 1.71, 0.27],
								['c', 0.78, 0.21, 0.96, 0.27, 1.74, 0.3],
								['c', 0.87, 0.06, 1.02, 0.03, 1.38, -0.21],
								['c', 0.21, -0.15, 0.33, -0.15, 0.48, -0.06],
								['c', 0.15, 0.09, 0.21, 0.3, 0.15, 0.45],
								['c', -0.03, 0.06, -1.26, 1.26, -2.76, 2.67],
								['l', -2.73, 2.55],
								['l', 0.54, 0.03],
								['c', 0.54, 0.03, 0.72, 0.03, 2.01, 0.15],
								['c', 0.36, 0.03, 0.9, 0.06, 1.2, 0.09],
								['c', 0.66, 0, 0.81, -0.03, 1.02, -0.24],
								['c', 0.3, -0.3, 0.39, -0.72, 0.27, -1.23],
								['c', -0.06, -0.27, -0.06, -0.27, -0.03, -0.39],
								['c', 0.15, -0.3, 0.54, -0.27, 0.69, 0.03],
								['c', 0.15, 0.33, 0.27, 1.02, 0.27, 1.5],
								['c', 0, 1.47, -1.11, 2.7, -2.52, 2.79],
								['c', -0.57, 0.03, -1.02, -0.09, -2.01, -0.51],
								['c', -1.02, -0.42, -1.23, -0.48, -2.13, -0.54],
								['c', -0.81, -0.06, -0.96, -0.03, -1.26, 0.18],
								['c', -0.12, 0.06, -0.24, 0.12, -0.27, 0.12],
								['c', -0.27, 0, -0.45, -0.3, -0.36, -0.51],
								['c', 0.03, -0.06, 1.32, -1.32, 2.91, -2.79],
								['l', 2.88, -2.73],
								['c', -0.03, 0, -0.21, 0.03, -0.42, 0.06],
								['c', -0.21, 0.03, -0.78, 0.09, -1.23, 0.12],
								['c', -1.11, 0.12, -1.23, 0.15, -1.95, 0.27],
								['c', -0.72, 0.15, -1.17, 0.18, -1.29, 0.09],
								['c', -0.27, -0.18, -0.21, -0.75, 0.12, -1.26],
								['c', 0.39, -0.6, 0.93, -1.02, 1.59, -1.2],
								['z']
							],
							w: 8.573,
							h: 8.743
						},
						'+': {
							d: [
								['M', 3.48, -9.3],
								['c', 0.18, -0.09, 0.36, -0.09, 0.54, 0],
								['c', 0.18, 0.09, 0.24, 0.15, 0.33, 0.3],
								['l', 0.06, 0.15],
								['l', 0, 1.29],
								['l', 0, 1.29],
								['l', 1.29, 0],
								['c', 1.23, 0, 1.29, 0, 1.41, 0.06],
								['c', 0.06, 0.03, 0.15, 0.09, 0.18, 0.12],
								['c', 0.12, 0.09, 0.21, 0.33, 0.21, 0.48],
								['c', 0, 0.15, -0.09, 0.39, -0.21, 0.48],
								['c', -0.03, 0.03, -0.12, 0.09, -0.18, 0.12],
								['c', -0.12, 0.06, -0.18, 0.06, -1.41, 0.06],
								['l', -1.29, 0],
								['l', 0, 1.29],
								['c', 0, 1.23, 0, 1.29, -0.06, 1.41],
								['c', -0.09, 0.18, -0.15, 0.24, -0.3, 0.33],
								['c', -0.21, 0.09, -0.39, 0.09, -0.57, 0],
								['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
								['c', -0.06, -0.12, -0.06, -0.18, -0.06, -1.41],
								['l', 0, -1.29],
								['l', -1.29, 0],
								['c', -1.23, 0, -1.29, 0, -1.41, -0.06],
								['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
								['c', -0.09, -0.18, -0.09, -0.36, 0, -0.54],
								['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
								['l', 0.15, -0.06],
								['l', 1.26, 0],
								['l', 1.29, 0],
								['l', 0, -1.29],
								['c', 0, -1.23, 0, -1.29, 0.06, -1.41],
								['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
								['z']
							],
							w: 7.507,
							h: 7.515
						},
						',': {
							d: [
								['M', 1.32, -3.36],
								['c', 0.57, -0.15, 1.17, 0.03, 1.59, 0.45],
								['c', 0.45, 0.45, 0.6, 0.96, 0.51, 1.89],
								['c', -0.09, 1.23, -0.42, 2.46, -0.99, 3.93],
								['c', -0.3, 0.72, -0.72, 1.62, -0.78, 1.68],
								['c', -0.18, 0.21, -0.51, 0.18, -0.66, -0.06],
								['c', -0.03, -0.06, -0.06, -0.15, -0.06, -0.18],
								['c', 0, -0.06, 0.12, -0.33, 0.24, -0.63],
								['c', 0.84, -1.8, 1.02, -2.61, 0.69, -3.24],
								['c', -0.12, -0.24, -0.27, -0.36, -0.75, -0.6],
								['c', -0.36, -0.15, -0.42, -0.21, -0.6, -0.39],
								['c', -0.69, -0.69, -0.69, -1.71, 0, -2.4],
								['c', 0.21, -0.21, 0.51, -0.39, 0.81, -0.45],
								['z']
							],
							w: 3.452,
							h: 8.143
						},
						'-': {
							d: [
								['M', 0.18, -5.34],
								['c', 0.09, -0.06, 0.15, -0.06, 2.31, -0.06],
								['c', 2.46, 0, 2.37, 0, 2.46, 0.21],
								['c', 0.12, 0.21, 0.03, 0.42, -0.15, 0.54],
								['c', -0.09, 0.06, -0.15, 0.06, -2.28, 0.06],
								['c', -2.16, 0, -2.22, 0, -2.31, -0.06],
								['c', -0.27, -0.15, -0.27, -0.54, -0.03, -0.69],
								['z']
							],
							w: 5.001,
							h: 0.81
						},
						'.': {
							d: [
								['M', 1.32, -3.36],
								['c', 1.05, -0.27, 2.1, 0.57, 2.1, 1.65],
								['c', 0, 1.08, -1.05, 1.92, -2.1, 1.65],
								['c', -0.9, -0.21, -1.5, -1.14, -1.26, -2.04],
								['c', 0.12, -0.63, 0.63, -1.11, 1.26, -1.26],
								['z']
							],
							w: 3.413,
							h: 3.402
						},
						'scripts.wedge': {
							d: [
								['M', -3.66, -7.44],
								['c', 0.06, -0.09, 0, -0.09, 0.81, 0.03],
								['c', 1.86, 0.3, 3.84, 0.3, 5.73, 0],
								['c', 0.78, -0.12, 0.72, -0.12, 0.78, -0.03],
								['c', 0.15, 0.15, 0.12, 0.24, -0.24, 0.6],
								['c', -0.93, 0.93, -1.98, 2.76, -2.67, 4.62],
								['c', -0.3, 0.78, -0.51, 1.71, -0.51, 2.13],
								['c', 0, 0.15, 0, 0.18, -0.06, 0.27],
								['c', -0.12, 0.09, -0.24, 0.09, -0.36, 0],
								['c', -0.06, -0.09, -0.06, -0.12, -0.06, -0.27],
								['c', 0, -0.42, -0.21, -1.35, -0.51, -2.13],
								['c', -0.69, -1.86, -1.74, -3.69, -2.67, -4.62],
								['c', -0.36, -0.36, -0.39, -0.45, -0.24, -0.6],
								['z']
							],
							w: 7.49,
							h: 7.752
						},
						'scripts.thumb': {
							d: [
								['M', -0.54, -3.69],
								['c', 0.15, -0.03, 0.36, -0.06, 0.51, -0.06],
								['c', 1.44, 0, 2.58, 1.11, 2.94, 2.85],
								['c', 0.09, 0.48, 0.09, 1.32, 0, 1.8],
								['c', -0.27, 1.41, -1.08, 2.43, -2.16, 2.73],
								['l', -0.18, 0.06],
								['l', 0, 0.12],
								['c', 0.03, 0.06, 0.06, 0.45, 0.09, 0.87],
								['c', 0.03, 0.57, 0.03, 0.78, 0, 0.84],
								['c', -0.09, 0.27, -0.39, 0.48, -0.66, 0.48],
								['c', -0.27, 0, -0.57, -0.21, -0.66, -0.48],
								['c', -0.03, -0.06, -0.03, -0.27, 0, -0.84],
								['c', 0.03, -0.42, 0.06, -0.81, 0.09, -0.87],
								['l', 0, -0.12],
								['l', -0.18, -0.06],
								['c', -1.08, -0.3, -1.89, -1.32, -2.16, -2.73],
								['c', -0.09, -0.48, -0.09, -1.32, 0, -1.8],
								['c', 0.15, -0.84, 0.51, -1.53, 1.02, -2.04],
								['c', 0.39, -0.39, 0.84, -0.63, 1.35, -0.75],
								['z'],
								['m', 1.05, 0.9],
								['c', -0.15, -0.09, -0.21, -0.09, -0.45, -0.12],
								['c', -0.15, 0, -0.3, 0.03, -0.39, 0.03],
								['c', -0.57, 0.18, -0.9, 0.72, -1.08, 1.74],
								['c', -0.06, 0.48, -0.06, 1.8, 0, 2.28],
								['c', 0.15, 0.9, 0.42, 1.44, 0.9, 1.65],
								['c', 0.18, 0.09, 0.21, 0.09, 0.51, 0.09],
								['c', 0.3, 0, 0.33, 0, 0.51, -0.09],
								['c', 0.48, -0.21, 0.75, -0.75, 0.9, -1.65],
								['c', 0.03, -0.27, 0.03, -0.54, 0.03, -1.14],
								['c', 0, -0.6, 0, -0.87, -0.03, -1.14],
								['c', -0.15, -0.9, -0.45, -1.44, -0.9, -1.65],
								['z']
							],
							w: 5.955,
							h: 9.75
						},
						'scripts.open': {
							d: [
								['M', -0.54, -3.69],
								['c', 0.15, -0.03, 0.36, -0.06, 0.51, -0.06],
								['c', 1.44, 0, 2.58, 1.11, 2.94, 2.85],
								['c', 0.09, 0.48, 0.09, 1.32, 0, 1.8],
								['c', -0.33, 1.74, -1.47, 2.85, -2.91, 2.85],
								['c', -1.44, 0, -2.58, -1.11, -2.91, -2.85],
								['c', -0.09, -0.48, -0.09, -1.32, 0, -1.8],
								['c', 0.15, -0.84, 0.51, -1.53, 1.02, -2.04],
								['c', 0.39, -0.39, 0.84, -0.63, 1.35, -0.75],
								['z'],
								['m', 1.11, 0.9],
								['c', -0.21, -0.09, -0.27, -0.09, -0.51, -0.12],
								['c', -0.3, 0, -0.42, 0.03, -0.66, 0.15],
								['c', -0.24, 0.12, -0.51, 0.39, -0.66, 0.63],
								['c', -0.54, 0.93, -0.63, 2.64, -0.21, 3.81],
								['c', 0.21, 0.54, 0.51, 0.9, 0.93, 1.11],
								['c', 0.21, 0.09, 0.24, 0.09, 0.54, 0.09],
								['c', 0.3, 0, 0.33, 0, 0.54, -0.09],
								['c', 0.42, -0.21, 0.72, -0.57, 0.93, -1.11],
								['c', 0.36, -0.99, 0.36, -2.37, 0, -3.36],
								['c', -0.21, -0.54, -0.51, -0.9, -0.9, -1.11],
								['z']
							],
							w: 5.955,
							h: 7.5
						},
						'scripts.longphrase': {
							d: [
								['M', 1.47, -15.09],
								['c', 0.36, -0.09, 0.66, -0.18, 0.69, -0.18],
								['c', 0.06, 0, 0.06, 0.54, 0.06, 11.25],
								['l', 0, 11.25],
								['l', -0.63, 0.15],
								['c', -0.66, 0.18, -1.44, 0.39, -1.5, 0.39],
								['c', -0.03, 0, -0.03, -3.39, -0.03, -11.25],
								['l', 0, -11.25],
								['l', 0.36, -0.09],
								['c', 0.21, -0.06, 0.66, -0.18, 1.05, -0.27],
								['z']
							],
							w: 2.16,
							h: 23.04
						},
						'scripts.mediumphrase': {
							d: [
								['M', 1.47, -7.59],
								['c', 0.36, -0.09, 0.66, -0.18, 0.69, -0.18],
								['c', 0.06, 0, 0.06, 0.39, 0.06, 7.5],
								['l', 0, 7.5],
								['l', -0.63, 0.15],
								['c', -0.66, 0.18, -1.44, 0.39, -1.5, 0.39],
								['c', -0.03, 0, -0.03, -2.28, -0.03, -7.5],
								['l', 0, -7.5],
								['l', 0.36, -0.09],
								['c', 0.21, -0.06, 0.66, -0.18, 1.05, -0.27],
								['z']
							],
							w: 2.16,
							h: 15.54
						},
						'scripts.shortphrase': {
							d: [
								['M', 1.47, -7.59],
								['c', 0.36, -0.09, 0.66, -0.18, 0.69, -0.18],
								['c', 0.06, 0, 0.06, 0.21, 0.06, 3.75],
								['l', 0, 3.75],
								['l', -0.42, 0.09],
								['c', -0.57, 0.18, -1.65, 0.45, -1.71, 0.45],
								['c', -0.03, 0, -0.03, -0.72, -0.03, -3.75],
								['l', 0, -3.75],
								['l', 0.36, -0.09],
								['c', 0.21, -0.06, 0.66, -0.18, 1.05, -0.27],
								['z']
							],
							w: 2.16,
							h: 8.04
						},
						'scripts.snap': {
							d: [
								['M', 4.5, -3.39],
								['c', 0.36, -0.03, 0.96, -0.03, 1.35, 0],
								['c', 1.56, 0.15, 3.15, 0.9, 4.2, 2.01],
								['c', 0.24, 0.27, 0.33, 0.42, 0.33, 0.6],
								['c', 0, 0.27, 0.03, 0.24, -2.46, 2.22],
								['c', -1.29, 1.02, -2.4, 1.86, -2.49, 1.92],
								['c', -0.18, 0.09, -0.3, 0.09, -0.48, 0],
								['c', -0.09, -0.06, -1.2, -0.9, -2.49, -1.92],
								['c', -2.49, -1.98, -2.46, -1.95, -2.46, -2.22],
								['c', 0, -0.18, 0.09, -0.33, 0.33, -0.6],
								['c', 1.05, -1.08, 2.64, -1.86, 4.17, -2.01],
								['z'],
								['m', 1.29, 1.17],
								['c', -1.47, -0.15, -2.97, 0.3, -4.14, 1.2],
								['l', -0.18, 0.15],
								['l', 0.06, 0.09],
								['c', 0.15, 0.12, 3.63, 2.85, 3.66, 2.85],
								['c', 0.03, 0, 3.51, -2.73, 3.66, -2.85],
								['l', 0.06, -0.09],
								['l', -0.18, -0.15],
								['c', -0.84, -0.66, -1.89, -1.08, -2.94, -1.2],
								['z']
							],
							w: 10.38,
							h: 6.84
						},
						'noteheads.slash.whole': {
							d: [
								['M', 5, -5],
								['l', 1, 1],
								['l', -5, 5],
								['l', -1, -1],
								['z'],
								['m', 4, 6],
								['l', -5, -5],
								['l', 2, -2],
								['l', 5, 5],
								['z'],
								['m', 0, -2],
								['l', 1, 1],
								['l', -5, 5],
								['l', -1, -1],
								['z'],
								['m', -4, 6],
								['l', -5, -5],
								['l', 2, -2],
								['l', 5, 5],
								['z']
							],
							w: 10.81,
							h: 15.63
						},
						'noteheads.slash.quarter': {
							d: [['M', 9, -6], ['l', 0, 4], ['l', -9, 9], ['l', 0, -4], ['z']],
							w: 9,
							h: 9
						},
						'noteheads.harmonic.quarter': {
							d: [
								['M', 3.63, -4.02],
								['c', 0.09, -0.06, 0.18, -0.09, 0.24, -0.03],
								['c', 0.03, 0.03, 0.87, 0.93, 1.83, 2.01],
								['c', 1.5, 1.65, 1.8, 1.98, 1.8, 2.04],
								['c', 0, 0.06, -0.3, 0.39, -1.8, 2.04],
								['c', -0.96, 1.08, -1.8, 1.98, -1.83, 2.01],
								['c', -0.06, 0.06, -0.15, 0.03, -0.24, -0.03],
								['c', -0.12, -0.09, -3.54, -3.84, -3.6, -3.93],
								['c', -0.03, -0.03, -0.03, -0.09, -0.03, -0.15],
								['c', 0.03, -0.06, 3.45, -3.84, 3.63, -3.96],
								['z']
							],
							w: 7.5,
							h: 8.165
						},
						'noteheads.triangle.quarter': { d: [['M', 0, 0], ['l', 9, 0], ['l', -4.5, -9], ['z']], w: 9, h: 9 }
					},
					a = function (e) {
						for (var t = [], r = 0, n = e.length; r < n; r++) {
							t[r] = [];
							for (var i = 0, a = e[r].length; i < a; i++) t[r][i] = e[r][i];
						}
						return t;
					},
					s = {
						printSymbol: function (e, t, r, n, s) {
							if (!i[r]) return null;
							var o = a(i[r].d);
							(o[0][1] += e), (o[0][2] += t);
							for (var c = '', l = 0; l < o.length; l++) c += o[l].join(' ');
							return (s.path = c), n.path(s);
						},
						getPathForSymbol: function (e, t, r, n, s) {
							if (((n = n || 1), (s = s || 1), !i[r])) return null;
							var o = a(i[r].d);
							return (
								(1 === n && 1 === s) ||
									(function (e, t, r) {
										for (var n = 0, i = e.length; n < i; n++) {
											var a,
												s,
												o = e[n];
											for (a = 1, s = o.length; a < s; a++) o[a] *= a % 2 ? t : r;
										}
									})(o, n, s),
								(o[0][1] += e),
								(o[0][2] += t),
								o
							);
						},
						getSymbolWidth: function (e) {
							return i[e] ? i[e].w : 0;
						},
						symbolHeightInPitches: function (e) {
							return (i[e] ? i[e].h : 0) / n.STEP;
						},
						getSymbolAlign: function (e) {
							return 'scripts' === e.substring(0, 7) && 'scripts.roll' !== e ? 'center' : 'left';
						},
						getYCorr: function (e) {
							switch (e) {
								case '0':
								case '1':
								case '2':
								case '3':
								case '4':
								case '5':
								case '6':
								case '7':
								case '8':
								case '9':
								case '+':
								case 'flags.d64th':
								case 'scripts.trill':
								case 'scripts.upbow':
								case 'scripts.downbow':
									return -2;
								case 'timesig.common':
								case 'timesig.cut':
								default:
									return 0;
								case 'flags.d32nd':
								case 'rests.half':
								case 'rests.8th':
								case 'rests.quarter':
								case 'rests.16th':
								case 'rests.32nd':
								case 'rests.64th':
								case 'scripts.ufermata':
								case 'scripts.wedge':
								case 'scripts.roll':
								case 'scripts.shortphrase':
								case 'scripts.longphrase':
									return -1;
								case 'flags.u32nd':
								case 'rests.whole':
								case 'scripts.dfermata':
									return 1;
								case 'flags.u64th':
									return 3;
								case 'f':
								case 'm':
								case 'p':
								case 's':
								case 'z':
									return -4;
							}
						},
						setSymbol: function (e, t) {
							i[e] = t;
						}
					};
				e.exports = s;
			},
			5810: function (e) {
				function t(e) {
					switch (e) {
						case 'B#':
							return 'H#';
						case 'B♯':
							return 'H♯';
						case 'B':
							return 'H';
						case 'Bb':
						case 'B♭':
							return 'B';
					}
					return e;
				}
				e.exports = function (e, r, n) {
					for (var i = e.split('\n'), a = 0; a < i.length; a++) {
						var s = i[a].match(/^([ABCDEFG][♯♭]?)?([^\/]+)?(\/([ABCDEFG][#b♯♭]?))?/);
						if (s) {
							var o = s[1] || '',
								c = s[2] || '',
								l = s[4] || '';
							n && ((o = t(o)), (l = t(l)));
							var h = r ? '' : '',
								u = l ? '/' + l : '';
							i[a] = [o, c, u].join(h);
						}
					}
					return i.join('\n');
				};
			},
			4750: function (e, t, r) {
				var n = r(3987),
					i = r(2435),
					a = r(4331),
					s = r(2187),
					o = r(8832);
				e.exports = function (e, t, r, c, l) {
					if (!t.invisible) {
						var h = t.children.length > 0 && 'TempoElement' === t.children[0].type;
						(t.elemset = []), o.beginGroup(e.paper, e.controller);
						for (var u = 0; u < t.children.length; u++) {
							var d = t.children[u];
							'TempoElement' === d.type ? n(e, d) : i(e, d, r);
						}
						var f = t.type;
						if (
							('note' === t.type || 'rest' === t.type) &&
							((t.counters = e.controller.classes.getCurrent()),
							(f = (f += ' d' + Math.round(1e3 * t.durationClass) / 1e3).replace(/\./g, '-')),
							t.abcelem.pitches)
						)
							for (var p = 0; p < t.abcelem.pitches.length; p++) f += ' p' + t.abcelem.pitches[p].pitch;
						var m = o.endGroup(f, t.type);
						if (m) {
							if ((t.cloned && (t.cloned.overrideClasses = m.className.baseVal), t.overrideClasses)) {
								var g = m.classList && m.classList.length > 0 ? m.classList[0] + ' ' : '';
								m.setAttribute('class', g + t.overrideClasses);
							}
							if (h) (t.startChar = t.abcelem.startChar), (t.endChar = t.abcelem.endChar), c.add(t, m, !1, l);
							else {
								t.elemset.push(m);
								var v = !1;
								('note' !== t.type && 'tabNumber' !== t.type) || (v = !0), c.add(t, m, v, l);
							}
						} else t.elemset.length > 0 && c.add(t, t.elemset[0], 'note' === t.type, l);
						if (
							(t.klass && s(t.elemset, 'mark', '', '#00ff00'),
							t.hint && s(t.elemset, 'abcjs-hint', '', null),
							(t.abcelem.abselem = t),
							t.heads && t.heads.length > 0)
						) {
							t.notePositions = [];
							for (var b = 0; b < t.heads.length; b++)
								t.notePositions.push({ x: t.heads[b].x + t.heads[b].w / 2, y: l.zero - t.heads[b].pitch * a.STEP });
						}
					}
				};
			},
			7489: function (e, t, r) {
				var n = r(6454),
					i = r(7199);
				function a(e, t, r, n, a, s) {
					(r = i(e.calcY(r))), (a = i(e.calcY(a))), (t = i(t)), (n = i(n));
					var o = i(r + s);
					return 'M' + t + ' ' + r + ' L' + n + ' ' + a + 'L' + n + ' ' + i(a + s) + ' L' + t + ' ' + o + 'z';
				}
				function s(e, t, r, n) {
					return t + (n - e) * r;
				}
				e.exports = function (e, t) {
					if (0 !== t.beams.length) {
						for (var r = '', i = 0; i < t.beams.length; i++) {
							var o = t.beams[i];
							if (o.split) {
								for (
									var c = ((m = o.startX), (g = o.startY), (v = o.endX), (o.endY - g) / (v - m)), l = [], h = 0;
									h < o.split.length;
									h += 2
								)
									l.push([o.split[h], o.split[h + 1]]);
								for (h = 0; h < l.length; h++) {
									var u = s(o.startX, o.startY, c, l[h][0]),
										d = s(o.startX, o.startY, c, l[h][1]);
									r += a(e, l[h][0], u, l[h][1], d, o.dy);
								}
							} else r += a(e, o.startX, o.startY, o.endX, o.endY, o.dy);
						}
						var f = ('abcjs-d' + t.duration).replace(/\./g, '-'),
							p = e.controller.classes.generate('beam-elem ' + f);
						return [n(e, { path: r, stroke: 'none', fill: e.foregroundColor, class: p })];
					}
					var m, g, v;
				};
			},
			129: function (e, t, r) {
				var n = r(6764),
					i = r(4331),
					a = r(5759);
				function s(e, t, r, i) {
					return n(
						'M %f %f C %f %f %f %f %f %f C %f %f %f %f %f %f z',
						e + r[0],
						t + i[0],
						e + r[1],
						t + i[1],
						e + r[2],
						t + i[2],
						e + r[3],
						t + i[3],
						e + r[4],
						t + i[4],
						e + r[5],
						t + i[5],
						e + r[6],
						t + i[6]
					);
				}
				var o = function (e, t, r, o, c, l, h) {
					var u;
					if (l) {
						e.paper.openGroup({ klass: e.controller.classes.generate('staff-extra voice-name'), 'data-name': c });
						var d = r + (o - r) / 2;
						(d -= e.controller.getTextSize.baselineToCenter(l, 'voicefont', 'staff-extra voice-name', 0, 1)),
							a(e, {
								x: e.padding.left,
								y: d,
								text: l,
								type: 'voicefont',
								klass: 'staff-extra voice-name',
								anchor: 'start',
								centerVertically: !0
							});
					}
					return (
						'brace' === c
							? (u = (function (e, t, r, n, i) {
									var a = n - r,
										o = s(
											t,
											r,
											[7.5, -8, 21, 0, 18.5, -10.5, 7.5],
											[0, a / 5.5, a / 3.14, a / 2, a / 2.93, a / 4.88, 0]
										);
									return (
										(o += s(
											t,
											r,
											[0, 17.5, -7.5, 6.6, -5, 20, 0],
											[a / 2, a / 1.46, a / 1.22, a, a / 1.19, a / 1.42, a / 2]
										)),
										e.paper.path({
											path: o,
											stroke: e.foregroundColor,
											fill: e.foregroundColor,
											class: e.controller.classes.generate(i),
											'data-name': i
										})
									);
							  })(e, t, r, o, c))
							: 'bracket' === c &&
							  (u = (function (e, t, r, a, s) {
									t += i.STEP;
									var o = 0.75 * i.STEP,
										c = 0.75 * i.STEP,
										l = a - r,
										h = n('M %f %f l %f %f l %f %f l %f %f z', t, r - c, 0, l + 2 * c, o, 0, 0, -(l + 2 * c)),
										u = 2 * i.STEP,
										d = i.STEP;
									return (
										(h += n(
											'M %f %f q %f %f %f %f q %f %f %f %f z',
											t + o,
											r - c,
											0.6 * u,
											0.2 * d,
											u,
											-d,
											0.1 * -u,
											0.3 * d,
											-u,
											d + i.STEP
										)),
										(h += n(
											'M %f %f q %f %f %f %f q %f %f %f %f z',
											t + o,
											r + c + l,
											0.6 * u,
											0.2 * -d,
											u,
											d,
											0.1 * -u,
											0.3 * -d,
											-u,
											-d - i.STEP
										)),
										e.paper.path({
											path: h,
											stroke: e.foregroundColor,
											fill: e.foregroundColor,
											class: e.controller.classes.generate(s),
											'data-name': s
										})
									);
							  })(e, t, r, o, c)),
						l && (u = e.paper.closeGroup()),
						h.wrapSvgEl({ el_type: c, startChar: -1, endChar: -1 }, u),
						u
					);
				};
				e.exports = function (e, t, r) {
					var n = t.startVoice.staff.absoluteY - 10 * i.STEP;
					return (
						t.endVoice && t.endVoice.staff
							? (t.endY = t.endVoice.staff.absoluteY - 2 * i.STEP)
							: t.lastContinuedVoice && t.lastContinuedVoice.staff
							? (t.endY = t.lastContinuedVoice.staff.absoluteY - 2 * i.STEP)
							: (t.endY = t.startVoice.staff.absoluteY - 2 * i.STEP),
						o(e, t.x, n, t.endY, t.type, t.header, r)
					);
				};
			},
			3245: function (e, t, r) {
				var n = r(6764),
					i = r(6454),
					a = r(7199),
					s = function (e, t, r, s, o, c, l) {
						(t = a(t)), (r = a(r)), (s = a(s)), (o = a(o)), (c = a(c)), (l = a(l));
						var h = n('M %f %f L %f %f M %f %f L %f %f', c, t, l, r, c, s, l, o);
						return i(e, {
							path: h,
							highlight: 'stroke',
							stroke: e.foregroundColor,
							class: e.controller.classes.generate('dynamics decoration'),
							'data-name': 'dynamics'
						});
					};
				e.exports = function (e, t, r) {
					void 0 === t.pitch && window.console.error('Crescendo Element y-coordinate not set.');
					var n,
						i = e.calcY(t.pitch) + 4,
						a = t.anchor1 ? t.anchor1.x : 0,
						o = t.anchor2 ? t.anchor2.x : 800;
					return (
						(n = '<' === t.dir ? s(e, i + 4, i, i + 4, i + 8, a, o) : s(e, i, i + 4, i + 8, i + 4, a, o)),
						r.wrapSvgEl({ el_type: 'dynamicDecoration', startChar: -1, endChar: -1 }, n),
						[n]
					);
				};
			},
			1547: function (e) {
				e.exports = function (e, t, r) {
					var n = e.paper.rectBeneath(t);
					return (
						r &&
							e.paper.text(r, {
								x: 0,
								y: t.y + 7,
								'text-anchor': 'start',
								'font-size': '14px',
								fill: 'rgba(0,0,255,.4)',
								stroke: 'rgba(0,0,255,.4)'
							}),
						n
					);
				};
			},
			5012: function (e, t, r) {
				var n = r(5537),
					i = r(7611),
					a = r(5668),
					s = r(4331),
					o = r(3524);
				function c(e, t, r, i) {
					n(e, t, r, i);
					var a = t.height * s.STEP;
					return (e.y += a), t;
				}
				function l(e, t, r, n) {
					var i = -(r.staffs[r.staffs.length - 1].bottom - 2),
						a = (n.staffs[0].top - 10 + i) * s.STEP;
					a < t && e.moveY(t - a);
				}
				e.exports = function (e, t, r, n, s, h, u, d, f, p) {
					var m = new o(e.paper, d, f);
					e.paper.openGroup(),
						e.moveY(e.padding.top),
						a(e, r.topText, m),
						e.paper.closeGroup(),
						e.moveY(e.spacing.music);
					for (var g = [], v = 0; v < r.lines.length; v++) {
						t.incrLine();
						var b = r.lines[v];
						if (b.staff) {
							e.paper.openGroup(),
								b.vskip && e.moveY(b.vskip),
								g.length >= 1 && l(e, e.spacing.staffSeparation, g[g.length - 1], b.staffGroup);
							var y = c(e, b.staffGroup, m, v);
							(y.line = p + v), g.push(y), e.paper.closeGroup();
						} else b.nonMusic && (e.paper.openGroup(), a(e, b.nonMusic, m), e.paper.closeGroup());
					}
					return (
						t.reset(),
						r.bottomText &&
							r.bottomText.rows &&
							r.bottomText.rows.length > 0 &&
							(e.paper.openGroup(), e.moveY(24), a(e, r.bottomText, m), e.paper.closeGroup()),
						i(e, s, u, h),
						{ staffgroups: g, selectables: m.getElements() }
					);
				};
			},
			9879: function (e, t, r) {
				var n = r(4777);
				e.exports = function (e, t, r) {
					void 0 === t.pitch && window.console.error('Dynamic Element y-coordinate not set.');
					var i = n(e, t.anchor.x, t.pitch, t.dec, {
						scalex: 1,
						scaley: 1,
						klass: e.controller.classes.generate('decoration dynamics'),
						fill: e.foregroundColor,
						stroke: 'none',
						name: 'dynamics'
					});
					return r.wrapSvgEl({ el_type: 'dynamicDecoration', startChar: -1, endChar: -1, decoration: t.dec }, i), [i];
				};
			},
			5947: function (e, t, r) {
				var n = r(6764),
					i = r(5759),
					a = r(6454),
					s = r(7199);
				e.exports = function (e, t, r, o, c) {
					void 0 === t.pitch && window.console.error('Ending Element y-coordinate not set.');
					var l = s(e.calcY(t.pitch)),
						h = '';
					t.anchor1 && ((r = s(t.anchor1.x + t.anchor1.w)), (h += n('M %f %f L %f %f ', r, l, r, s(l + 20)))),
						t.anchor2 && ((o = s(t.anchor2.x)), (h += n('M %f %f L %f %f ', o, l, o, s(l + 20)))),
						(h += n('M %f %f L %f %f ', r, l, o, l)),
						e.paper.openGroup({ klass: e.controller.classes.generate('ending'), 'data-name': 'ending' }),
						a(e, { path: h, stroke: e.foregroundColor, fill: e.foregroundColor, 'data-name': 'line' }),
						t.anchor1 &&
							i(e, {
								x: s(r + 5),
								y: s(e.calcY(t.pitch - 0.5)),
								text: t.text,
								type: 'repeatfont',
								klass: 'ending',
								anchor: 'start',
								noClass: !0,
								name: t.text
							});
					var u = e.paper.closeGroup();
					return c.wrapSvgEl({ el_type: 'ending', startChar: -1, endChar: -1 }, u), [u];
				};
			},
			9045: function (e, t, r) {
				var n = r(6764),
					i = r(6454),
					a = r(7199);
				function s(e, t, r) {
					return a(e + r * t);
				}
				var o = [[3.5, -4.8]],
					c = [
						[1.5, -1],
						[0.3, -0.3],
						[-3.5, 3.8]
					],
					l = [[-1.5, 2]],
					h = [
						[3, 4],
						[3, -4]
					],
					u = [
						[-3, 4],
						[-3, -4]
					];
				function d(e, t) {
					for (var r = '', n = 0; n < e.length; n++) r += 'l' + e[n][0] + ' ' + s(e[n][1], t, e[n][0]);
					return r;
				}
				var f = function (e, t, r, a, s) {
					var f,
						p = n('M %f %f', t, r);
					for (p += d(o, s), f = 0; f < a; f++) p += d(h, s);
					for (p += d(c, s), f = 0; f < a; f++) p += d(u, s);
					return (
						(p += d(l, s) + 'z'),
						i(e, {
							path: p,
							highlight: 'stroke',
							stroke: e.foregroundColor,
							class: e.controller.classes.generate('decoration'),
							'data-name': 'glissando'
						})
					);
				};
				e.exports = function (e, t, r) {
					(t.anchor1 &&
						t.anchor2 &&
						t.anchor1.heads &&
						t.anchor2.heads &&
						0 !== t.anchor1.heads.length &&
						0 !== t.anchor2.heads.length) ||
						window.console.error('Glissando Element not set.');
					var n,
						i,
						a = e.calcY(t.anchor1.heads[0].pitch),
						o = e.calcY(t.anchor2.heads[0].pitch),
						c = t.anchor1.x + t.anchor1.w / 2,
						l = t.anchor2.x + t.anchor2.w / 2,
						h = (function (e, t, r, n) {
							var i = r - e,
								a = n - t;
							return Math.sqrt(i * i + a * a);
						})(c, a, l, o),
						u = t.anchor1.w / 2 + 4,
						d = t.anchor2.w / 2 + 4,
						p = (function (e, t, r, n) {
							return (n - t) / (r - e);
						})(c, a, l, o),
						m = s(a, p, u),
						g = (s(o, p, -d), (n = h - u - d), (i = 5), Math.max(2, Math.floor((n - 2 * i) / 6))),
						v = f(e, c + u, m, g, p);
					return r.wrapSvgEl({ el_type: 'glissando', startChar: -1, endChar: -1 }, v), [v];
				};
			},
			8832: function (e, t, r) {
				var n = r(7199);
				function i() {
					this.ingroup = !1;
				}
				(i.prototype.beginGroup = function (e, t) {
					(this.paper = e),
						(this.controller = t),
						(this.path = []),
						(this.lastM = [0, 0]),
						(this.ingroup = !0),
						this.paper.openGroup();
				}),
					(i.prototype.isInGroup = function () {
						return this.ingroup;
					}),
					(i.prototype.addPath = function (e) {
						if (0 !== (e = e || []).length) {
							(e[0][0] = 'm'),
								(e[0][1] = n(e[0][1] - this.lastM[0])),
								(e[0][2] = n(e[0][2] - this.lastM[1])),
								(this.lastM[0] += e[0][1]),
								(this.lastM[1] += e[0][2]),
								this.path.push(e[0]);
							for (var t = 1, r = e.length; t < r; t++)
								'm' === e[t][0] && ((this.lastM[0] += e[t][1]), (this.lastM[1] += e[t][2])), this.path.push(e[t]);
						}
					}),
					(i.prototype.endGroup = function (e, t) {
						this.ingroup = !1;
						for (var r = 0; r < this.path.length; r++) this.path[r].join(' ');
						this.path = [];
						var n = this.paper.closeGroup();
						return (
							n &&
								(n.setAttribute('class', this.controller.classes.generate(e)),
								n.setAttribute('fill', this.controller.renderer.foregroundColor),
								n.setAttribute('stroke', 'none'),
								n.setAttribute('data-name', t)),
							n
						);
					});
				var a = new i();
				e.exports = a;
			},
			5668: function (e, t, r) {
				var n = r(4169),
					i = r(5759);
				e.exports = function (e, t, r) {
					for (var a = 0; a < t.rows.length; a++) {
						var s = t.rows[a];
						if (s.absmove) e.absolutemoveY(s.absmove);
						else if (s.move) e.moveY(s.move);
						else if (s.text) {
							var o = s.left ? s.left : 0,
								c = i(e, { x: o, y: e.y, text: s.text, type: s.font, klass: s.klass, name: s.name, anchor: s.anchor });
							s.absElemType &&
								r.wrapSvgEl(
									{ el_type: s.absElemType, name: s.name, startChar: s.startChar, endChar: s.endChar, text: s.text },
									c
								);
						} else if (s.separator) n(e, s.separator);
						else if (s.startGroup) e.paper.openGroup({ klass: s.klass, 'data-name': s.name });
						else if (s.endGroup) {
							var l = e.paper.closeGroup();
							s.absElemType &&
								r.wrapSvgEl(
									{ el_type: s.absElemType, name: s.name, startChar: s.startChar, endChar: s.endChar, text: '' },
									l
								);
						}
					}
				};
			},
			6637: function (e, t, r) {
				var n = r(6764),
					i = r(7199);
				e.exports = function (e, t, r, a, s, o, c) {
					var l = e.foregroundColor;
					(t = i(t)), (r = i(r));
					var h = i(a - c),
						u = i(a + c);
					if (e.firefox112) {
						var d = {
							x1: t,
							x2: r,
							y1: (a += c / 2),
							y2: a,
							stroke: e.foregroundColor,
							'stroke-width': Math.abs(2 * c)
						};
						return s && (d.class = s), o && (d['data-name'] = o), e.paper.lineToBack(d);
					}
					var f = { path: n('M %f %f L %f %f L %f %f L %f %f z', t, h, r, h, r, u, t, u), stroke: 'none', fill: l };
					return o && (f['data-name'] = o), s && (f.class = s), e.paper.pathToBack(f);
				};
			},
			6454: function (e) {
				e.exports = function (e, t, r) {
					return e.paper.path(t);
				};
			},
			3624: function (e, t, r) {
				var n = r(8832),
					i = r(7199);
				e.exports = function (e, t, r, a, s, o, c) {
					if (r < 0 || a < s) {
						var l = i(s);
						(s = i(a)), (a = l);
					} else (a = i(a)), (s = i(s));
					t = i(t);
					var h = i(t + r);
					if (e.firefox112) {
						var u = { x1: (t += r / 2), x2: t, y1: a, y2: s, stroke: e.foregroundColor, 'stroke-width': Math.abs(r) };
						return o && (u.class = o), c && (u['data-name'] = c), e.paper.lineToBack(u);
					}
					for (
						var d = [['M', t, a], ['L', t, s], ['L', h, s], ['L', h, a], ['z']], f = ((u = { path: '' }), 0);
						f < d.length;
						f++
					)
						u.path += d[f].join(' ');
					return (
						o && (u.class = o),
						c && (u['data-name'] = c),
						n.isInGroup() || ((u.stroke = 'none'), (u.fill = e.foregroundColor)),
						e.paper.pathToBack(u)
					);
				};
			},
			4777: function (e, t, r) {
				var n = r(5759),
					i = r(6020),
					a = r(8832);
				e.exports = function (e, t, r, s, o) {
					var c, l, h, u, d, f;
					if (!s) return null;
					if (s.length > 1 && s.indexOf('.') < 0) {
						var p = a.isInGroup() ? '' : o.klass;
						e.paper.openGroup({ 'data-name': o.name, klass: p });
						for (var m = 0, g = 0; g < s.length; g++) {
							var v = s[g];
							(l = i.getYCorr(v)),
								(c = i.printSymbol(t + m, e.calcY(r + l), v, e.paper, { stroke: o.stroke, fill: o.fill }))
									? g < s.length - 1 &&
									  (m +=
											((h = v),
											(u = s[g + 1]),
											(d = i.getSymbolWidth(v)),
											(f = void 0),
											(f = d),
											'f' === h && 'f' === u && (f = (2 * f) / 3),
											'p' === h && 'p' === u && (f = (5 * f) / 6),
											'f' === h && 'z' === u && (f = (5 * f) / 8),
											f))
									: n(
											e,
											{ x: t, y: e.y, text: 'no symbol:' + s, type: 'debugfont', klass: 'debug-msg', anchor: 'start' },
											!1
									  );
						}
						return e.paper.closeGroup();
					}
					return (
						(l = i.getYCorr(s)),
						(c = a.isInGroup()
							? i.printSymbol(t, e.calcY(r + l), s, e.paper, { 'data-name': o.name })
							: i.printSymbol(t, e.calcY(r + l), s, e.paper, {
									klass: o.klass,
									stroke: o.stroke,
									fill: o.fill,
									'data-name': o.name
							  }))
							? c
							: (n(
									e,
									{ x: t, y: e.y, text: 'no symbol:' + s, type: 'debugfont', klass: 'debug-msg', anchor: 'start' },
									!1
							  ),
							  null)
					);
				};
			},
			2435: function (e, t, r) {
				var n = r(5759),
					i = r(3624),
					a = r(7865),
					s = r(4777);
				e.exports = function (e, t, r) {
					void 0 === t.pitch && window.console.error(t.type + ' Relative Element y-coordinate not set.');
					var o = e.calcY(t.pitch);
					switch (t.type) {
						case 'symbol':
							if (null === t.c) return null;
							var c = 'symbol';
							t.klass && (c += ' ' + t.klass),
								(t.graphelem = s(e, t.x, t.pitch, t.c, {
									scalex: t.scalex,
									scaley: t.scaley,
									klass: e.controller.classes.generate(c),
									name: t.name
								}));
							break;
						case 'debug':
							t.graphelem = n(
								e,
								{
									x: t.x,
									y: e.calcY(15),
									text: '' + t.c,
									type: 'debugfont',
									klass: e.controller.classes.generate('debug-msg'),
									anchor: 'start',
									centerVertically: !1,
									dim: t.dim
								},
								!1
							);
							break;
						case 'tabNumber':
							var l = 'tabnumberfont',
								h = 'tab-number';
							t.isGrace && ((l = 'tabgracefont'), (o += 2.5), (h = 'tab-grace')),
								(t.graphelem = n(
									e,
									{
										x: t.x,
										y: o,
										text: '' + t.c,
										type: l,
										klass: e.controller.classes.generate(h),
										anchor: 'middle',
										centerVertically: !1,
										dim: t.dim,
										cursor: 'default'
									},
									!1
								));
							break;
						case 'barNumber':
							t.graphelem = n(
								e,
								{
									x: t.x,
									y: o,
									text: '' + t.c,
									type: 'measurefont',
									klass: e.controller.classes.generate('bar-number'),
									anchor: 'middle',
									dim: t.dim,
									name: 'bar-number'
								},
								!0
							);
							break;
						case 'lyric':
							t.graphelem = n(
								e,
								{
									x: t.x,
									y: o,
									text: t.c,
									type: 'vocalfont',
									klass: e.controller.classes.generate('lyric'),
									anchor: 'middle',
									dim: t.dim,
									name: 'lyric'
								},
								!1
							);
							break;
						case 'chord':
							t.graphelem = n(
								e,
								{
									x: t.x,
									y: o,
									text: t.c,
									type: 'gchordfont',
									klass: e.controller.classes.generate('chord'),
									anchor: 'middle',
									dim: t.dim,
									lane: t.getLane(),
									name: 'chord'
								},
								!1
							);
							break;
						case 'decoration':
							t.graphelem = n(
								e,
								{
									x: t.x,
									y: o + 6,
									text: t.c,
									type: 'annotationfont',
									klass: e.controller.classes.generate('annotation'),
									anchor: t.anchor,
									centerVertically: !0,
									dim: t.dim
								},
								!1
							);
							break;
						case 'text':
							t.graphelem = n(
								e,
								{
									x: t.x,
									y: o,
									text: t.c,
									type: 'annotationfont',
									klass: e.controller.classes.generate('annotation'),
									anchor: 'start',
									centerVertically: t.centerVertically,
									dim: t.dim,
									lane: t.getLane(),
									name: 'annotation'
								},
								!1
							);
							break;
						case 'multimeasure-text':
							t.graphelem = n(
								e,
								{
									x: t.x + t.w / 2,
									y: o,
									text: t.c,
									type: 'tempofont',
									klass: e.controller.classes.generate('rest'),
									anchor: 'middle',
									centerVertically: !1,
									dim: t.dim
								},
								!1
							);
							break;
						case 'part':
							t.graphelem = n(
								e,
								{
									x: t.x,
									y: o,
									text: t.c,
									type: 'partsfont',
									klass: e.controller.classes.generate('part'),
									anchor: 'start',
									dim: t.dim,
									name: t.c
								},
								!0
							);
							break;
						case 'bar':
							t.graphelem = i(e, t.x, t.linewidth + e.lineThickness, o, r || e.calcY(t.pitch2), null, 'bar');
							break;
						case 'stem':
							var u = t.linewidth > 0 ? t.linewidth + e.lineThickness : t.linewidth - e.lineThickness;
							t.graphelem = i(e, t.x, u, o, e.calcY(t.pitch2), 'abcjs-stem', 'stem');
							break;
						case 'ledger':
							t.graphelem = a(e, t.x, t.x + t.w, t.pitch, 'abcjs-ledger', 'ledger', 0.35 + e.lineThickness);
					}
					return (
						1 !== t.scalex &&
							t.graphelem &&
							(function (e, t, r, n, i, a) {
								e.setAttributeOnElement(t, {
									style: 'transform:scale(' + r + ',' + n + ');transform-origin:' + i + 'px ' + a + 'px;'
								});
							})(e.paper, t.graphelem, t.scalex, t.scaley, t.x, o),
						t.graphelem
					);
				};
			},
			7199: function (e) {
				e.exports = function (e) {
					return parseFloat(e.toFixed(2));
				};
			},
			3524: function (e, t, r) {
				var n = r(5741),
					i = r(5829);
				function a(e, t, r) {
					(this.elements = []), (this.paper = e), (this.tuneNumber = r), (this.selectTypes = t);
				}
				(a.prototype.getElements = function () {
					return this.elements;
				}),
					(a.prototype.add = function (e, t, r, n) {
						if (this.canSelect(e)) {
							var i;
							(i =
								void 0 === this.selectTypes
									? { selectable: !1, 'data-index': this.elements.length }
									: { selectable: !0, tabindex: 0, 'data-index': this.elements.length }),
								this.paper.setAttributeOnElement(t, i);
							var a = { absEl: e, svgEl: t, isDraggable: r };
							void 0 !== n && (a.staffPos = n), this.elements.push(a);
						}
					}),
					(a.prototype.canSelect = function (e) {
						return !(
							!1 === this.selectTypes ||
							!e ||
							!e.abcelem ||
							(!0 !== this.selectTypes &&
								!(void 0 === this.selectTypes
									? 'note' === e.abcelem.el_type || 'tabNumber' === e.abcelem.el_type
									: this.selectTypes.indexOf(e.abcelem.el_type) >= 0))
						);
					}),
					(a.prototype.wrapSvgEl = function (e, t) {
						var r = { tuneNumber: this.tuneNumber, abcelem: e, elemset: [t], highlight: n, unhighlight: i };
						this.add(r, t, !1);
					}),
					(e.exports = a);
			},
			4169: function (e) {
				e.exports = function (e, t) {
					var r = Math.round(e.y),
						n = (e.controller.width - t) / 2,
						i = n + t,
						a =
							'M ' +
							n +
							' ' +
							r +
							' L ' +
							i +
							' ' +
							r +
							' L ' +
							i +
							' ' +
							(r + 1) +
							' L ' +
							n +
							' ' +
							(r + 1) +
							' L ' +
							n +
							' ' +
							r +
							' z';
					e.paper.pathToBack({
						path: a,
						stroke: 'rgba(0,0,0,0)',
						fill: 'rgba(0,0,0,255)',
						class: e.controller.classes.generate('defined-text')
					});
				};
			},
			7611: function (e) {
				e.exports = function (e, t, r, n) {
					var i = (t + e.padding.right) * r,
						a = (e.y + e.padding.bottom) * r;
					if ((e.isPrint && (a = Math.max(a, 1056)), '' !== e.ariaLabel)) {
						var s = 'Sheet Music';
						e.abctune &&
							e.abctune.metaText &&
							e.abctune.metaText.title &&
							(s += ' for "' + e.abctune.metaText.title + '"'),
							e.paper.setTitle(s);
						var o = e.ariaLabel ? e.ariaLabel : s;
						e.paper.setAttribute('aria-label', o);
					}
					e.paper.insertStyles(
						'.abcjs-dragging-in-progress text, .abcjs-dragging-in-progress tspan {' +
							[
								'-webkit-touch-callout: none;',
								'-webkit-user-select: none;',
								'-khtml-user-select: none;',
								'-moz-user-select: none;',
								'-ms-user-select: none;',
								'user-select: none;'
							].join(' ') +
							'}'
					);
					var c = { overflow: 'hidden' };
					'resize' === n
						? e.paper.setResponsiveWidth(i, a)
						: ((c.width = ''),
						  (c.height = a + 'px'),
						  r < 1 ? ((c.width = i + 'px'), e.paper.setSize(i / r, a / r)) : e.paper.setSize(i, a)),
						e.paper.setScale(r),
						e.paper.setParentStyles(c);
				};
			},
			6764: function (e) {
				function t(e) {
					return (
						(t =
							'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
								? function (e) {
										return typeof e;
								  }
								: function (e) {
										return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
											? 'symbol'
											: typeof e;
								  }),
						t(e)
					);
				}
				e.exports = function () {
					for (var e, r, n, i, a, s = 0, o = arguments[s++], c = []; o; ) {
						if ((r = /^[^\x25]+/.exec(o))) c.push(r[0]);
						else if ((r = /^\x25{2}/.exec(o))) c.push('%');
						else {
							if (!(r = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(o))) throw 'Huh ?!';
							if (null == (e = arguments[r[1] || s++]) || null == e) throw 'Too few arguments.';
							if (/[^s]/.test(r[7]) && 'number' != typeof e) throw 'Expecting number but found ' + t(e);
							switch (r[7]) {
								case 'b':
									e = e.toString(2);
									break;
								case 'c':
									e = String.fromCharCode(e);
									break;
								case 'd':
									e = parseInt(e);
									break;
								case 'e':
									e = r[6] ? e.toExponential(r[6]) : e.toExponential();
									break;
								case 'f':
									e = r[6] ? parseFloat(e).toFixed(r[6]) : parseFloat(e);
									break;
								case 'o':
									e = e.toString(8);
									break;
								case 's':
									e = (e = String(e)) && r[6] ? e.substring(0, r[6]) : e;
									break;
								case 'u':
									e = Math.abs(e);
									break;
								case 'x':
									e = e.toString(16);
									break;
								case 'X':
									e = e.toString(16).toUpperCase();
							}
							(e = /[def]/.test(r[7]) && r[2] && e > 0 ? '+' + e : e),
								(i = r[3] ? ('0' == r[3] ? '0' : r[3][1]) : ' '),
								(a = r[5] - String(e).length),
								(n = r[5] ? str_repeat(i, a) : ''),
								c.push(r[4] ? e + n : n + e);
						}
						o = o.substring(r[0].length);
					}
					return c.join('');
				};
			},
			5537: function (e, t, r) {
				var n = r(4331),
					i = r(129),
					a = r(3145),
					s = r(7641),
					o = r(1547),
					c = r(3624),
					l = r(5668);
				function h(e, t, r, a, s) {
					if (r)
						for (var o = 0; o < r.length; o++)
							r[o].isStartVoice(a) && ((r[o].startY = t - 10 * n.STEP), (r[o].elemset = i(e, r[o], s)));
				}
				function u(e, t, r) {
					for (var i = 0; i < r.length; i++)
						for (var a = t[r[i]].children, s = 0; s < a.length; s++) {
							var c = a[s],
								l = c.getFixedCoords();
							if (!c.invisible && void 0 !== l.t && void 0 !== l.b) {
								var h = (l.t - l.b) * n.STEP;
								o(e, {
									x: l.x,
									y: e.calcY(l.t),
									width: l.w,
									height: h,
									fill: '#88e888',
									'fill-opacity': 0.4,
									stroke: '#4aa93d',
									'stroke-opacity': 0.8
								});
								for (var u = 0; u < c.children.length; u++) {
									var d = c.children[u],
										f = d.getChordDim();
									if (f) {
										var p = e.calcY(d.pitch);
										(p += d.dim.font.size * d.getLane()),
											o(e, {
												x: f.left,
												y: p,
												width: f.right - f.left,
												height: d.dim.font.size,
												fill: 'none',
												stroke: '#4aa93d',
												'stroke-opacity': 0.8
											});
									}
								}
							}
						}
				}
				e.exports = function (e, t, r, i) {
					for (var d, f, p, m = e.y, g = 0; g < t.staffs.length; g++) {
						var v = t.staffs[g];
						e.moveY(n.STEP, v.top),
							(v.absoluteY = e.y),
							e.showDebug &&
								(e.showDebug.indexOf('box') >= 0 && v.voices && u(e, t.voices, v.voices),
								e.showDebug.indexOf('grid') >= 0 &&
									(e.paper.dottedLine({
										x1: e.padding.left,
										x2: e.padding.left + e.controller.width,
										y1: m,
										y2: m,
										stroke: '#0000ff'
									}),
									o(e, {
										x: e.padding.left,
										y: e.calcY(v.originalTop),
										width: e.controller.width,
										height: e.calcY(v.originalBottom) - e.calcY(v.originalTop),
										fill: e.foregroundColor,
										stroke: e.foregroundColor,
										'fill-opacity': 0.1,
										'stroke-opacity': 0.1
									}),
									(d = 0),
									E(v, 'chordHeightAbove'),
									E(v, 'chordHeightBelow'),
									E(v, 'dynamicHeightAbove'),
									E(v, 'dynamicHeightBelow'),
									E(v, 'endingHeightAbove'),
									E(v, 'lyricHeightAbove'),
									E(v, 'lyricHeightBelow'),
									E(v, 'partHeightAbove'),
									E(v, 'tempoHeightAbove'),
									E(v, 'volumeHeightAbove'),
									E(v, 'volumeHeightBelow'))),
							e.moveY(n.STEP, -v.bottom),
							e.showDebug &&
								e.showDebug.indexOf('grid') >= 0 &&
								e.paper.dottedLine({
									x1: e.padding.left,
									x2: e.padding.left + e.controller.width,
									y1: e.y,
									y2: e.y,
									stroke: '#0000aa'
								});
					}
					for (var b = 2, y = 0, x = 0; x < t.voices.length; x++) {
						var w = t.voices[x].staff,
							k = t.voices[x].tabNameInfos;
						if (((e.y = w.absoluteY), e.controller.classes.incrVoice(), !t.voices[x].duplicate)) {
							if ((f || (f = e.calcY(10)), (p = e.calcY(b)), 0 !== w.lines)) {
								w.linePitch && (b = w.linePitch), e.controller.classes.newMeasure();
								var C = s(e, t.startx, t.w, w.lines, w.linePitch, 0.35);
								(p = C[1]),
									(w.bottomLine = p),
									(w.topLine = C[0]),
									w.hasTab && (y = w.topLine),
									w.hasStaff && ((y = w.hasStaff.topLine), (t.voices[x].barto = !0), (t.voices[x].topLine = f));
							}
							h(e, w.absoluteY, t.brace, x, r), h(e, w.absoluteY, t.bracket, x, r);
						}
						a(e, t.voices[x], y, r, { top: m, zero: e.y, height: t.height * n.STEP });
						var T = 0;
						if (k) {
							var _ = { rows: [] };
							_.rows.push({ absmove: p + 2 }),
								_.rows.push({
									left: t.startx + 8,
									text: k.name,
									font: 'tablabelfont',
									klass: 'text instrument-name',
									anchor: 'start'
								}),
								_.rows.push({ move: k.textSize.height }),
								l(e, _),
								(T = k.textSize.height);
						}
						e.controller.classes.newMeasure(), t.voices[x].duplicate || (y = e.calcY(2 + T));
					}
					e.controller.classes.newMeasure();
					var S = t.staffs.length;
					function E(t, r) {
						var i = [
							'rgb(207,27,36)',
							'rgb(168,214,80)',
							'rgb(110,161,224)',
							'rgb(191,119,218)',
							'rgb(195,30,151)',
							'rgb(31,170,177)',
							'rgb(220,166,142)'
						];
						if (t.positionY && t.positionY[r]) {
							var a = t.specialY[r] * n.STEP;
							'chordHeightAbove' === r &&
								t.specialY.chordLines &&
								t.specialY.chordLines.above &&
								(a *= t.specialY.chordLines.above),
								'chordHeightBelow' === r &&
									t.specialY.chordLines &&
									t.specialY.chordLines.below &&
									(a *= t.specialY.chordLines.below),
								o(
									e,
									{
										x: e.padding.left,
										y: e.calcY(t.positionY[r]),
										width: e.controller.width,
										height: a,
										fill: i[d],
										stroke: i[d],
										'fill-opacity': 0.4,
										'stroke-opacity': 0.4
									},
									r.substr(0, 4)
								),
								(d += 1) > 6 && (d = 0);
						}
					}
					S > 1 && ((f = t.staffs[0].topLine), (p = t.staffs[S - 1].bottomLine), c(e, t.startx, 0.6, f, p, null)),
						(e.y = m);
				};
			},
			7865: function (e, t, r) {
				var n = r(6637);
				e.exports = function (e, t, r, i, a, s, o) {
					var c = e.calcY(i);
					return n(e, t, r, c, a, s, o);
				};
			},
			7641: function (e, t, r) {
				var n = r(7865);
				e.exports = function (e, t, r, i, a, s) {
					var o = 'abcjs-top-line',
						c = 2;
					a && (c = a), e.paper.openGroup({ prepend: !0, klass: e.controller.classes.generate('abcjs-staff') });
					var l = 0,
						h = 0;
					if (1 === i) n(e, t, r, 6, o, null, s + e.lineThickness), (l = e.calcY(10)), (h = e.calcY(2));
					else
						for (var u = i - 1; u >= 0; u--) {
							var d = (u + 1) * c;
							(h = e.calcY(d)), 0 === l && (l = h), n(e, t, r, d, o, null, s + e.lineThickness), (o = void 0);
						}
					return e.paper.closeGroup(), [l, h];
				};
			},
			3987: function (e, t, r) {
				var n = r(2435),
					i = r(5759);
				e.exports = function (e, t) {
					var r = t.x;
					void 0 === t.pitch && window.console.error('Tempo Element y-coordinate not set.'),
						(t.tempo.el_type = 'tempo');
					var a,
						s = e.calcY(t.pitch) + 2;
					if (t.tempo.preString) {
						a = i(
							e,
							{
								x: r,
								y: s,
								text: t.tempo.preString,
								type: 'tempofont',
								klass: 'abcjs-tempo',
								anchor: 'start',
								noClass: !0,
								'dominant-baseline': 'ideographic',
								name: 'pre'
							},
							!0
						);
						var o = e.controller.getTextSize.calc(t.tempo.preString, 'tempofont', 'tempo', a).width;
						r += o + o / t.tempo.preString.length;
					}
					if (t.note) {
						t.note.setX(r);
						for (var c = 0; c < t.note.children.length; c++) n(e, t.note.children[c], r);
						r += t.note.w + 5;
						var l = '= ' + t.tempo.bpm;
						a = i(e, {
							x: r,
							y: s,
							text: l,
							type: 'tempofont',
							klass: 'abcjs-tempo',
							anchor: 'start',
							noClass: !0,
							name: 'beats'
						});
						var h = e.controller.getTextSize.calc(l, 'tempofont', 'tempo', a).width;
						r += h + h / l.length;
					}
					t.tempo.postString &&
						i(
							e,
							{
								x: r,
								y: s,
								text: t.tempo.postString,
								type: 'tempofont',
								klass: 'abcjs-tempo',
								anchor: 'start',
								noClass: !0,
								name: 'post'
							},
							!0
						);
				};
			},
			5759: function (e, t, r) {
				var n = r(7199);
				e.exports = function (e, t, r) {
					var i,
						a = t.y;
					if (t.lane) {
						var s = 0.25 * t.dim.font.size;
						a += (t.dim.font.size + s) * t.lane;
					}
					t.dim ? ((i = t.dim).attr.class = t.klass) : (i = e.controller.getFontAndAttr.calc(t.type, t.klass)),
						t.anchor && (i.attr['text-anchor'] = t.anchor),
						(i.attr.x = t.x),
						(i.attr.y = a),
						t.centerVertically || (i.attr.y += i.font.size),
						'debugfont' === t.type && (console.log('Debug msg: ' + t.text), (i.attr.stroke = '#ff0000')),
						t.cursor && (i.attr.cursor = t.cursor);
					var o = t.text.replace(/\n\n/g, '\n \n');
					(o = o.replace(/^\n/, ' \n')),
						i.font.box &&
							(r || e.paper.openGroup({ klass: i.attr.class, fill: e.foregroundColor, 'data-name': t.name }),
							'end' === i.attr['text-anchor']
								? (i.attr.x -= i.font.padding)
								: 'start' === i.attr['text-anchor'] && (i.attr.x += i.font.padding),
							(i.attr.y += i.font.padding),
							delete i.attr.class),
						t.noClass && delete i.attr.class,
						(i.attr.x = n(i.attr.x)),
						(i.attr.y = n(i.attr.y)),
						t.name && (i.attr['data-name'] = t.name);
					var c = e.paper.text(o, i.attr);
					if (i.font.box) {
						var l = c.getBBox(),
							h = 0;
						'middle' === i.attr['text-anchor']
							? (h = l.width / 2 + i.font.padding)
							: 'end' === i.attr['text-anchor'] && (h = l.width + 2 * i.font.padding);
						var u = 0;
						t.centerVertically && (u = l.height - i.font.padding),
							e.paper.rect({
								'data-name': 'box',
								x: Math.round(t.x - h),
								y: Math.round(a - u),
								width: Math.round(l.width + 2 * i.font.padding),
								height: Math.round(l.height + 2 * i.font.padding)
							}),
							r || (c = e.paper.closeGroup());
					}
					return c;
				};
			},
			3272: function (e, t, r) {
				var n = r(6764),
					i = r(7199),
					a = function (e, t, r) {
						e.anchor1 && e.anchor2
							? e.anchor1.pitch === e.anchor2.pitch && 0 === e.internalNotes.length
								? (e.isTie = !0)
								: (e.isTie = !1)
							: (e.isTie = !0),
							e.isTie
								? (e.calcTieDirection(), e.calcX(t, r), e.calcTieY())
								: (e.calcSlurDirection(), e.calcX(t, r), e.calcSlurY()),
							e.avoidCollisionAbove();
					},
					s = function (e, t, r, a, s, o, c, l, h) {
						var u = l ? 1.2 : 1.5;
						(t = i(t + 6)), (r = i(r + 4)), (a += o ? u : -u), (s += o ? u : -u);
						var d,
							f = i(e.calcY(a)),
							p = i(e.calcY(s)),
							m = r - t,
							g = p - f,
							v = Math.sqrt(m * m + g * g),
							b = m / v,
							y = g / v,
							x = v / 3.5,
							w = l ? 10 : 25,
							k = (o ? -1 : 1) * Math.min(w, Math.max(4, x)),
							C = i(t + x * b - k * y),
							T = i(f + x * y + k * b),
							_ = i(r - x * b - k * y),
							S = i(p - x * y + k * b);
						if ((c ? (c += ' slur') : (c = 'slur'), (c += l ? ' tie' : ' legato'), h)) {
							c += ' dotted';
							var E = n('M %f %f C %f %f %f %f %f %f', t, f, C, T, _, S, r, p);
							d = e.paper.path({
								path: E,
								stroke: e.foregroundColor,
								fill: 'none',
								'stroke-dasharray': '5 5',
								class: e.controller.classes.generate(c),
								'data-name': l ? 'tie' : 'slur'
							});
						} else {
							var M = n(
								'M %f %f C %f %f %f %f %f %f C %f %f %f %f %f %f z',
								t,
								f,
								C,
								T,
								_,
								S,
								r,
								p,
								i(_ - 2 * y),
								i(S + 2 * b),
								i(C - 2 * y),
								i(T + 2 * b),
								t,
								f
							);
							d = e.paper.path({
								path: M,
								stroke: 'none',
								fill: e.foregroundColor,
								class: e.controller.classes.generate(c),
								'data-name': l ? 'tie' : 'slur'
							});
						}
						return d;
					};
				e.exports = function (e, t, r, n, i) {
					a(t, r, n);
					var o = '';
					t.anchor1
						? (o += 'abcjs-start-m' + t.anchor1.parent.counters.measure + '-n' + t.anchor1.parent.counters.note)
						: (o += 'abcjs-start-edge'),
						t.anchor2
							? (o += ' abcjs-end-m' + t.anchor2.parent.counters.measure + '-n' + t.anchor2.parent.counters.note)
							: (o += ' abcjs-end-edge'),
						t.hint && (o = 'abcjs-hint');
					var c = t.fixedY ? 1.5 : 0,
						l = s(e, t.startX, t.endX, t.startY + c, t.endY + c, t.above, o, t.isTie, t.dotted);
					return i.wrapSvgEl({ el_type: 'slur', startChar: -1, endChar: -1 }, l), [l];
				};
			},
			4322: function (e, t, r) {
				var n = r(6764),
					i = r(5759),
					a = r(6454),
					s = r(7199);
				function o(e, t, r, i) {
					return n('M %f %f L %f %f', s(e), s(t), s(r), s(i));
				}
				e.exports = function (e, t, r) {
					e.paper.openGroup({
						klass: e.controller.classes.generate('triplet ' + t.durationClass),
						'data-name': 'triplet'
					}),
						t.hasBeam ||
							(function (e, t, r, n, i) {
								(r = e.calcY(r)), (i = e.calcY(i));
								var s = 5,
									c = '';
								(c += o(t, r, t, r + s)), (c += o(n, i, n, i + s));
								var l = t + (n - t) / 2,
									h = 8,
									u = (i - r) / (n - t),
									d = l - h;
								c += o(t, r, d, r + (d - t) * u);
								var f = l + h;
								(c += o(f, r + (f - t) * u, n, i)),
									a(e, { path: c, stroke: e.foregroundColor, 'data-name': 'triplet-bracket' });
							})(e, t.anchor1.x, t.startNote, t.anchor2.x + t.anchor2.w, t.endNote),
						i(
							e,
							{
								x: t.xTextPos,
								y: e.calcY(t.yTextPos - 1),
								text: '' + t.number,
								type: 'tripletfont',
								anchor: 'middle',
								centerVertically: !0,
								noClass: !0,
								name: '' + t.number
							},
							!0
						);
					var n = e.paper.closeGroup();
					return r.wrapSvgEl({ el_type: 'triplet', startChar: -1, endChar: -1 }, n), n;
				};
			},
			3145: function (e, t, r) {
				var n = r(9045),
					i = r(3245),
					a = r(9879),
					s = r(4322),
					o = r(5947),
					c = r(3272),
					l = r(7489),
					h = r(5759),
					u = r(4750);
				e.exports = function (e, t, r, d, f) {
					var p = t.w - 1;
					e.staffbottom = t.staff.bottom;
					var m,
						g,
						v = e.foregroundColor;
					if ((t.color && (e.foregroundColor = t.color), t.header)) {
						var b = h(
							e,
							{
								x: e.padding.left,
								y: e.calcY(t.headerPosition),
								text: t.header,
								type: 'voicefont',
								klass: 'staff-extra voice-name',
								anchor: 'start',
								centerVertically: !0,
								name: 'voice-name'
							},
							!0
						);
						d.wrapSvgEl({ el_type: 'voiceName', startChar: -1, endChar: -1, text: t.header }, b);
					}
					var y,
						x = !1;
					for (m = 0; m < t.children.length; m++) {
						('note' !== (g = t.children[m]).type && 'rest' !== g.type) || (x = !0);
						var w = !1;
						'staff-extra' === g.type ||
							e.controller.classes.isInMeasure() ||
							(e.controller.classes.startMeasure(), (w = !0)),
							t.staff.isTabStaff && ((g.invisible = !1), 'bar' == g.type && g.abcelem.lastBar && (r = t.topLine)),
							u(e, g, t.barto || m === t.children.length - 1 ? r : 0, d, f),
							('note' === g.type ||
								('rest' === (y = g).type && !(!y.abcelem || !y.abcelem.rest || 'spacer' === y.abcelem.rest.type))) &&
								e.controller.classes.incrNote(),
							'bar' === g.type && !w && x && e.controller.classes.incrMeasure();
					}
					for (e.controller.classes.startMeasure(), m = 0; m < t.beams.length; m++) {
						var k = t.beams[m];
						'bar' === k ? e.controller.classes.incrMeasure() : l(e, k, d);
					}
					for (e.controller.classes.startMeasure(), m = 0; m < t.otherchildren.length; m++)
						if ('bar' === (g = t.otherchildren[m])) e.controller.classes.incrMeasure();
						else
							switch (g.type) {
								case 'GlissandoElem':
									g.elemset = n(e, g, d);
									break;
								case 'CrescendoElem':
									g.elemset = i(e, g, d);
									break;
								case 'DynamicDecoration':
									g.elemset = a(e, g, d);
									break;
								case 'TripletElem':
									s(e, g, d);
									break;
								case 'EndingElem':
									g.elemset = o(e, g, t.startx + 10, p, d);
									break;
								case 'TieElem':
									g.elemset = c(e, g, t.startx + 10, p, d);
									break;
								default:
									console.log(g), u(e, g, t.startx + 10, p, d, f);
							}
					e.foregroundColor = v;
				};
			},
			5253: function (e, t, r) {
				var n = r(4331),
					i = r(1897),
					a = r(8510),
					s = r(3736),
					o = r(5588),
					c = r(4726),
					l = r(1134),
					h = r(9316),
					u = r(8068),
					d = r(1564),
					f = r(1954),
					p = r(1328),
					m = r(9799),
					g = r(5012),
					v = r(4321),
					b = function (e, t) {
						(t = t || {}),
							(this.oneSvgPerLine = t.oneSvgPerLine),
							(this.selectionColor = t.selectionColor),
							(this.dragColor = t.dragColor ? t.dragColor : t.selectionColor),
							(this.dragging = !!t.dragging),
							(this.selectTypes = t.selectTypes),
							(this.responsive = t.responsive),
							(this.space = 3 * n.SPACE),
							(this.initialClef = t.initialClef),
							(this.scale = t.scale ? parseFloat(t.scale) : 0),
							(this.classes = new f({ shouldAddClasses: t.add_classes })),
							this.scale > 0.1 || (this.scale = void 0),
							t.staffwidth
								? ((this.staffwidthScreen = t.staffwidth), (this.staffwidthPrint = t.staffwidth))
								: ((this.staffwidthScreen = 740), (this.staffwidthPrint = 680)),
							(this.listeners = []),
							t.clickListener && this.addSelectListener(t.clickListener),
							(this.renderer = new a(e)),
							this.renderer.setPaddingOverride(t),
							t.showDebug && (this.renderer.showDebug = t.showDebug),
							t.jazzchords && (this.jazzchords = t.jazzchords),
							t.germanAlphabet && (this.germanAlphabet = t.germanAlphabet),
							t.lineThickness && (this.lineThickness = t.lineThickness),
							(this.renderer.controller = this),
							(this.renderer.foregroundColor = t.foregroundColor ? t.foregroundColor : 'currentColor'),
							void 0 !== t.ariaLabel && (this.renderer.ariaLabel = t.ariaLabel),
							(this.renderer.minPadding = t.minPadding ? t.minPadding : 0),
							this.reset();
					};
				function y(e) {
					for (
						var t = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), r = 0;
						r < e.attributes.length;
						r++
					) {
						var n = e.attributes[r];
						'height' !== n.name && 'aria-label' != n.name && t.setAttribute(n.name, n.value);
					}
					return t;
				}
				(b.prototype.reset = function () {
					(this.selected = []),
						(this.staffgroups = []),
						this.engraver && this.engraver.reset(),
						(this.engraver = null),
						this.renderer.reset(),
						(this.dragTarget = null),
						(this.dragIndex = -1),
						(this.dragMouseStart = { x: -1, y: -1 }),
						(this.dragYStep = 0),
						this.lineThickness && this.renderer.setLineThickness(this.lineThickness);
				}),
					(b.prototype.engraveABC = function (e, t, r) {
						void 0 === e[0] && (e = [e]), this.reset();
						for (var n = 0; n < e.length; n++)
							void 0 === t && (t = n),
								(this.getFontAndAttr = new p(e[n].formatting, this.classes)),
								(this.getTextSize = new m(this.getFontAndAttr, this.renderer.paper)),
								this.engraveTune(e[n], t, r);
					}),
					(b.prototype.adjustNonScaledItems = function (e) {
						(this.width /= e), this.renderer.adjustNonScaledItems(e);
					}),
					(b.prototype.getMeasureWidths = function (e) {
						this.reset(),
							(this.getFontAndAttr = new p(e.formatting, this.classes)),
							(this.getTextSize = new m(this.getFontAndAttr, this.renderer.paper)),
							this.setupTune(e, 0),
							this.constructTuneElements(e),
							d(this.renderer, e, 0, this.space);
						for (var t, r = [], n = !0, i = 0; i < e.lines.length; i++) {
							var a = e.lines[i];
							if (a.staff) {
								if (
									(n && ((t = { left: 0, measureWidths: [], total: 0 }), r.push(t), (n = !1)),
									a.staffGroup.voices.length > 0)
								)
									for (var s = a.staffGroup.voices[0], o = !1, c = 0, l = 0; l < s.children.length; l++) {
										var h = s.children[l];
										o || h.isClef || h.isKeySig || ((o = !0), (t.left = h.x), (c = h.x)),
											'bar' === h.type && (t.measureWidths.push(h.x - c), (t.total += h.x - c), (c = h.x));
									}
							} else n = !0;
						}
						return r;
					}),
					(b.prototype.setupTune = function (e, t) {
						this.classes.reset(),
							void 0 !== e.formatting.jazzchords && (this.jazzchords = e.formatting.jazzchords),
							this.renderer.newTune(e),
							(this.engraver = new i(this.getTextSize, t, {
								bagpipes: e.formatting.bagpipes,
								flatbeams: e.formatting.flatbeams,
								graceSlurs: !1 !== e.formatting.graceSlurs,
								percmap: e.formatting.percmap,
								initialClef: this.initialClef,
								jazzchords: this.jazzchords,
								germanAlphabet: this.germanAlphabet
							})),
							this.engraver.setStemHeight(this.renderer.spacing.stemHeight),
							(this.engraver.measureLength = e.getMeterFraction().num / e.getMeterFraction().den),
							e.formatting.staffwidth
								? (this.width = 1.33 * e.formatting.staffwidth)
								: (this.width = this.renderer.isPrint ? this.staffwidthPrint : this.staffwidthScreen);
						var r = e.formatting.scale ? e.formatting.scale : this.scale;
						return (
							'resize' === this.responsive && (r = void 0),
							void 0 === r && (r = this.renderer.isPrint ? 0.75 : 1),
							this.adjustNonScaledItems(r),
							r
						);
					}),
					(b.prototype.constructTuneElements = function (e) {
						var t, r;
						e.topText = new l(
							e.metaText,
							e.metaTextInfo,
							e.formatting,
							e.lines,
							this.width,
							this.renderer.isPrint,
							this.renderer.padding.left,
							this.renderer.spacing,
							this.getTextSize
						);
						var n = !1,
							i = !1;
						for (t = 0; t < e.lines.length; t++)
							if ((r = e.lines[t]).staff)
								(i = !0),
									(r.staffGroup = this.engraver.createABCLine(r.staff, n ? null : e.metaText.tempo, t)),
									(n = !0);
							else if (r.subtitle) {
								if (i) {
									var a = this.width / 2 + this.renderer.padding.left;
									r.nonMusic = new c(
										this.renderer.spacing.subtitle,
										e.formatting,
										r.subtitle,
										a,
										this.renderer.padding.left,
										this.getTextSize
									);
								}
							} else
								void 0 !== r.text
									? ((i = !0),
									  (r.nonMusic = new s(
											r.text,
											r.vskip,
											this.getFontAndAttr,
											this.renderer.padding.left,
											this.width,
											this.getTextSize
									  )))
									: void 0 !== r.separator &&
									  r.separator.lineLength &&
									  ((i = !0),
									  (r.nonMusic = new o(r.separator.spaceAbove, r.separator.lineLength, r.separator.spaceBelow)));
						e.bottomText = new h(
							e.metaText,
							this.width,
							this.renderer.isPrint,
							this.renderer.padding.left,
							this.renderer.spacing,
							this.getTextSize
						);
					}),
					(b.prototype.engraveTune = function (e, t, r) {
						var n = this.setupTune(e, t);
						this.constructTuneElements(e);
						var i = d(this.renderer, e, this.width, this.space);
						e.tablatures && v.layoutTablatures(this.renderer, e);
						var a = g(this.renderer, this.classes, e, this.width, i, this.responsive, n, this.selectTypes, t, r);
						if (((this.staffgroups = a.staffgroups), (this.selectables = a.selectables), this.oneSvgPerLine)) {
							var s = this.renderer.paper.svg.parentNode;
							this.svgs = (function (e, t, r, n) {
								r || (r = 'Untitled');
								var i = t.querySelector('svg');
								'resize' === n && (t.style.paddingBottom = '');
								for (
									var a = i.querySelector('style'),
										s = 'resize' === n ? i.viewBox.baseVal.width : i.getAttribute('width'),
										o = t.querySelectorAll('svg > g'),
										c = 0,
										l = [],
										h = 0;
									h < o.length;
									h++
								) {
									var u = o[h],
										d = u.getBBox(),
										f = d.y - c,
										p = d.height + f,
										m = document.createElement('div'),
										g = 'overflow: hidden;';
									'resize' !== n && (g += 'height:' + p + 'px;'), m.setAttribute('style', g);
									var v = y(i),
										b = 'Sheet Music for "' + r + '" section ' + (h + 1);
									v.setAttribute('aria-label', b),
										'resize' !== n && v.setAttribute('height', p),
										'resize' === n && (v.style.position = '');
									var x = e.firefox112 ? p + 1 : p;
									v.setAttribute('viewBox', '0 ' + c + ' ' + s + ' ' + x), v.appendChild(a.cloneNode(!0));
									var w = document.createElement('title');
									(w.innerText = b),
										v.appendChild(w),
										v.appendChild(u),
										m.appendChild(v),
										l.push(v),
										t.appendChild(m),
										(c = d.y + d.height);
								}
								return t.removeChild(i), l;
							})(this.renderer, s, e.metaText.title, this.responsive);
						} else this.svgs = [this.renderer.paper.svg];
						u(this, this.svgs);
					}),
					(b.prototype.getDim = function (e) {
						if (!e.dim) {
							var t = e.svgEl.getBBox();
							e.dim = {
								left: Math.round(t.x),
								top: Math.round(t.y),
								right: Math.round(t.x + t.width),
								bottom: Math.round(t.y + t.height)
							};
						}
						return e.dim;
					}),
					(b.prototype.addSelectListener = function (e) {
						this.listeners[this.listeners.length] = e;
					}),
					(e.exports = b);
			},
			1954: function (e) {
				var t = function (e) {
					(this.shouldAddClasses = e.shouldAddClasses), this.reset();
				};
				(t.prototype.reset = function () {
					(this.lineNumber = null),
						(this.voiceNumber = null),
						(this.measureNumber = null),
						(this.measureTotalPerLine = []),
						(this.noteNumber = null);
				}),
					(t.prototype.incrLine = function () {
						null === this.lineNumber ? (this.lineNumber = 0) : this.lineNumber++,
							(this.voiceNumber = null),
							(this.measureNumber = null),
							(this.noteNumber = null);
					}),
					(t.prototype.incrVoice = function () {
						null === this.voiceNumber ? (this.voiceNumber = 0) : this.voiceNumber++,
							(this.measureNumber = null),
							(this.noteNumber = null);
					}),
					(t.prototype.isInMeasure = function () {
						return null !== this.measureNumber;
					}),
					(t.prototype.newMeasure = function () {
						this.measureNumber && (this.measureTotalPerLine[this.lineNumber] = this.measureNumber),
							(this.measureNumber = null),
							(this.noteNumber = null);
					}),
					(t.prototype.startMeasure = function () {
						(this.measureNumber = 0), (this.noteNumber = 0);
					}),
					(t.prototype.incrMeasure = function () {
						this.measureNumber++, (this.noteNumber = 0);
					}),
					(t.prototype.incrNote = function () {
						this.noteNumber++;
					}),
					(t.prototype.measureTotal = function () {
						for (var e = 0, t = 0; t < this.lineNumber; t++)
							e += this.measureTotalPerLine[t] ? this.measureTotalPerLine[t] : 0;
						return this.measureNumber && (e += this.measureNumber), e;
					}),
					(t.prototype.getCurrent = function (e) {
						return {
							line: this.lineNumber,
							measure: this.measureNumber,
							measureTotal: this.measureTotal(),
							voice: this.voiceNumber,
							note: this.noteNumber
						};
					}),
					(t.prototype.generate = function (e) {
						if (!this.shouldAddClasses) return '';
						var t = [];
						if ((e && e.length > 0 && t.push(e), 'tab-number' === e)) return t.join(' ');
						if ('text instrument-name' === e) return 'abcjs-text abcjs-instrument-name';
						if (
							(null !== this.lineNumber && t.push('l' + this.lineNumber),
							null !== this.measureNumber && t.push('m' + this.measureNumber),
							null !== this.measureNumber && t.push('mm' + this.measureTotal()),
							null !== this.voiceNumber && t.push('v' + this.voiceNumber),
							e &&
								(e.indexOf('note') >= 0 || e.indexOf('rest') >= 0 || e.indexOf('lyric') >= 0) &&
								null !== this.noteNumber &&
								t.push('n' + this.noteNumber),
							t.length > 0)
						) {
							t = (t = t.join(' ')).split(' ');
							for (var r = 0; r < t.length; r++)
								0 !== t[r].indexOf('abcjs-') && t[r].length > 0 && (t[r] = 'abcjs-' + t[r]);
						}
						return t.join(' ');
					}),
					(e.exports = t);
			},
			1328: function (e) {
				var t = function (e, t) {
					(this.formatting = e), (this.classes = t);
				};
				(t.prototype.updateFonts = function (e) {
					e.gchordfont && (this.formatting.gchordfont = e.gchordfont),
						e.tripletfont && (this.formatting.tripletfont = e.tripletfont),
						e.annotationfont && (this.formatting.annotationfont = e.annotationfont),
						e.vocalfont && (this.formatting.vocalfont = e.vocalfont);
				}),
					(t.prototype.calc = function (e, t) {
						var r;
						r =
							'string' == typeof e
								? (r = this.formatting[e])
									? {
											face: r.face,
											size: Math.round((4 * r.size) / 3),
											decoration: r.decoration,
											style: r.style,
											weight: r.weight,
											box: r.box
									  }
									: { face: 'Arial', size: Math.round(16), decoration: 'underline', style: 'normal', weight: 'normal' }
								: {
										face: e.face,
										size: Math.round((4 * e.size) / 3),
										decoration: e.decoration,
										style: e.style,
										weight: e.weight,
										box: e.box
								  };
						var n = this.formatting.fontboxpadding ? this.formatting.fontboxpadding : 0.1;
						return (
							(r.padding = r.size * n),
							{
								font: r,
								attr: {
									'font-size': r.size,
									'font-style': r.style,
									'font-family': r.face,
									'font-weight': r.weight,
									'text-decoration': r.decoration,
									class: this.classes.generate(t)
								}
							}
						);
					}),
					(e.exports = t);
			},
			9799: function (e) {
				var t = function (e, t) {
					(this.getFontAndAttr = e), (this.svg = t);
				};
				(t.prototype.updateFonts = function (e) {
					this.getFontAndAttr.updateFonts(e);
				}),
					(t.prototype.attr = function (e, t) {
						return this.getFontAndAttr.calc(e, t);
					}),
					(t.prototype.calc = function (e, t, r, n) {
						var i;
						i =
							'string' == typeof t
								? this.attr(t, r)
								: {
										font: { face: t.face, size: t.size, decoration: t.decoration, style: t.style, weight: t.weight },
										attr: {
											'font-size': t.size,
											'font-style': t.style,
											'font-family': t.face,
											'font-weight': t.weight,
											'text-decoration': t.decoration,
											class: this.getFontAndAttr.classes.generate(r)
										}
								  };
						var a = this.svg.getTextSize(e, i.attr, n);
						return i.font.box ? { height: a.height + 4 * i.font.padding, width: a.width + 4 * i.font.padding } : a;
					}),
					(t.prototype.baselineToCenter = function (e, t, r, n, i) {
						return 0.5 * this.calc(e, t, r).height + (i - n - 2) * this.attr(t, r).font.size;
					}),
					(e.exports = t);
			},
			2187: function (e) {
				e.exports = function (e, t, r, n) {
					if (e)
						for (var i = 0; i < e.length; i++) {
							var a = e[i],
								s = a.getAttribute('highlight');
							s || (s = 'fill'), a.setAttribute(s, n);
							var o = a.getAttribute('class');
							o || (o = ''),
								(o = (o = o.replace(r, '')).replace(t, '')),
								t.length > 0 && (o.length > 0 && ' ' !== o[o.length - 1] && (o += ' '), (o += t)),
								a.setAttribute('class', o);
						}
				};
			},
			4331: function (e) {
				var t = { FONTEM: 360, FONTSIZE: 30 };
				(t.STEP = (93 * t.FONTSIZE) / 720),
					(t.SPACE = 10),
					(t.TOPNOTE = 15),
					(t.STAVEHEIGHT = 100),
					(t.INDENT = 50),
					(e.exports = t);
			},
			5741: function (e, t, r) {
				var n = r(2187);
				e.exports = function (e, t) {
					void 0 === e && (e = 'abcjs-note_selected'), void 0 === t && (t = '#ff0000'), n(this.elemset, e, '', t);
				};
			},
			8068: function (e, t, r) {
				var n = r(4331);
				function i(e) {
					'keyboard' === this.dragMechanism &&
						0 !== this.dragYStep &&
						this.dragTarget &&
						f.bind(this)(this.dragTarget, this.dragYStep, this.selectables.length, this.dragIndex, e),
						(this.dragYStep = 0);
				}
				function a(e) {
					switch (e.keyCode) {
						case 38:
						case 40:
							e.preventDefault();
					}
				}
				function s(e) {
					var t = !1,
						r = e.target.dataset.index;
					switch (e.keyCode) {
						case 13:
						case 32:
							(t = !0),
								(this.dragTarget = this.selectables[r]),
								(this.dragIndex = r),
								(this.dragMechanism = 'keyboard'),
								u.bind(this)(e);
							break;
						case 38:
							(t = !0),
								(this.dragTarget = this.selectables[r]),
								(this.dragIndex = r),
								this.dragTarget &&
									this.dragTarget.isDraggable &&
									(this.dragging &&
										this.dragTarget.isDraggable &&
										this.dragTarget.absEl.highlight(void 0, this.dragColor),
									this.dragYStep--,
									this.dragTarget.svgEl.setAttribute('transform', 'translate(0,' + this.dragYStep * n.STEP + ')'));
							break;
						case 40:
							(t = !0),
								(this.dragTarget = this.selectables[r]),
								(this.dragIndex = r),
								(this.dragMechanism = 'keyboard'),
								this.dragTarget &&
									this.dragTarget.isDraggable &&
									(this.dragging &&
										this.dragTarget.isDraggable &&
										this.dragTarget.absEl.highlight(void 0, this.dragColor),
									this.dragYStep++,
									this.dragTarget.svgEl.setAttribute('transform', 'translate(0,' + this.dragYStep * n.STEP + ')'));
							break;
						case 9:
							0 !== this.dragYStep && u.bind(this)(e);
					}
					t && e.preventDefault();
				}
				function o(e, t) {
					var r,
						n,
						i,
						a = (function (e, t) {
							for (var r = 0; r < e.length; r++) if (t.dataset.index === e[r].svgEl.dataset.index) return r;
							return -1;
						})(
							e.selectables,
							(function (e) {
								if ('svg' === e.tagName) return e;
								for (var t = e.getAttribute('selectable'); !t; )
									t = !e.parentElement || 'svg' === (e = e.parentElement).tagName || e.getAttribute('selectable');
								return e;
							})(t.target)
						);
					return (
						a >= 0
							? ((i = (function (e, t, r) {
									return (e.x <= t.offsetX &&
										e.x + e.width >= t.offsetX &&
										e.y <= t.offsetY &&
										e.y + e.height >= t.offsetY) ||
										Math.abs(t.layerY / r - t.offsetY) < 3
										? [t.offsetX, t.offsetY]
										: [t.layerX, t.layerY];
							  })(e.selectables[a].svgEl.getBBox(), t, e.scale)),
							  (r = i[0]),
							  (n = i[1]))
							: ((i = (function (e) {
									var t,
										r,
										n = 1,
										i = 1,
										a = e.target.closest('svg'),
										s = 0;
									return (
										a &&
											a.viewBox &&
											a.viewBox.baseVal &&
											(0 !== a.viewBox.baseVal.width && (n = a.viewBox.baseVal.width / a.clientWidth),
											0 !== a.viewBox.baseVal.height && (i = a.viewBox.baseVal.height / a.clientHeight),
											(s = a.viewBox.baseVal.y)),
										e.target && 'svg' === e.target.tagName
											? ((t = e.offsetX), (r = e.offsetY))
											: ((t = e.layerX), (r = e.layerY)),
										[(t *= n), (r *= i) + s]
									);
							  })(t)),
							  (a = (function (e, t, r) {
									for (var n = 9999999, i = -1, a = 0; a < e.selectables.length && n > 0; a++) {
										var s = e.selectables[a];
										if ((e.getDim(s), s.dim.left < t && s.dim.right > t && s.dim.top < r && s.dim.bottom > r))
											(i = a), (n = 0);
										else if (s.dim.top < r && s.dim.bottom > r) {
											var o = Math.min(Math.abs(s.dim.left - t), Math.abs(s.dim.right - t));
											o < n && ((n = o), (i = a));
										} else if (s.dim.left < t && s.dim.right > t) {
											var c = Math.min(Math.abs(s.dim.top - r), Math.abs(s.dim.bottom - r));
											c < n && ((n = c), (i = a));
										} else {
											var l =
													Math.abs(t - s.dim.left) > Math.abs(t - s.dim.right)
														? Math.abs(t - s.dim.right)
														: Math.abs(t - s.dim.left),
												h =
													Math.abs(r - s.dim.top) > Math.abs(r - s.dim.bottom)
														? Math.abs(r - s.dim.bottom)
														: Math.abs(r - s.dim.top),
												u = Math.sqrt(l * l + h * h);
											u < n && ((n = u), (i = a));
										}
									}
									return i >= 0 && n <= 12 ? i : -1;
							  })(e, (r = i[0]), (n = i[1])))),
						{ x: r, y: n, clickedOn: a }
					);
				}
				function c(e) {
					if (e && e.target && e.touches && !(e.touches.length < 1)) {
						var t = e.target.getBoundingClientRect(),
							r = e.touches[0].pageX - t.left,
							n = e.touches[0].pageY - t.top;
						(e.touches[0].offsetX = r),
							(e.touches[0].offsetY = n),
							(e.touches[0].layerX = e.touches[0].pageX),
							(e.touches[0].layerY = e.touches[0].pageY);
					}
				}
				function l(e) {
					var t = e;
					'touchstart' === e.type && (c(e), e.touches.length > 0 && (t = e.touches[0]));
					var r = o(this, t);
					r.clickedOn >= 0 &&
						('touchstart' === e.type || 0 === e.button) &&
						this.selectables[r.clickedOn] &&
						((this.dragTarget = this.selectables[r.clickedOn]),
						(this.dragIndex = r.clickedOn),
						(this.dragMechanism = 'mouse'),
						(this.dragMouseStart = { x: r.x, y: r.y }),
						this.dragging &&
							this.dragTarget.isDraggable &&
							((function (e, t) {
								if (e) {
									var r = v(e.svg);
									(r[t] = !0), b(e.svg, r);
								}
							})(this.renderer.paper, 'abcjs-dragging-in-progress'),
							this.dragTarget.absEl.highlight(void 0, this.dragColor)));
				}
				function h(e) {
					var t = e;
					if (
						('touchmove' === e.type && (c(e), e.touches.length > 0 && (t = e.touches[0])),
						(this.lastTouchMove = e),
						this.dragTarget &&
							this.dragging &&
							this.dragTarget.isDraggable &&
							'mouse' === this.dragMechanism &&
							this.dragMouseStart)
					) {
						var r = o(this, t),
							i = Math.round((r.y - this.dragMouseStart.y) / n.STEP);
						i !== this.dragYStep &&
							((this.dragYStep = i),
							this.dragTarget.svgEl.setAttribute('transform', 'translate(0,' + i * n.STEP + ')'));
					}
				}
				function u(e) {
					var t = e;
					'touchend' === e.type &&
						this.lastTouchMove &&
						(c(this.lastTouchMove),
						this.lastTouchMove &&
							this.lastTouchMove.touches &&
							this.lastTouchMove.touches.length > 0 &&
							(t = this.lastTouchMove.touches[0])),
						this.dragTarget &&
							(m.bind(this)(),
							this.dragTarget.absEl &&
								this.dragTarget.absEl.highlight &&
								((this.selected = [this.dragTarget.absEl]),
								this.dragTarget.absEl.highlight(void 0, this.selectionColor)),
							f.bind(this)(this.dragTarget, this.dragYStep, this.selectables.length, this.dragIndex, t),
							this.dragTarget.svgEl &&
								this.dragTarget.svgEl.focus &&
								(this.dragTarget.svgEl.focus(), (this.dragTarget = null), (this.dragIndex = -1)),
							(function (e, t) {
								if (e) {
									var r = v(e.svg);
									delete r[t], b(e.svg, r);
								}
							})(this.renderer.svg, 'abcjs-dragging-in-progress'));
				}
				function d(e) {
					e >= 0 &&
						e < this.selectables.length &&
						((this.dragTarget = this.selectables[e]),
						(this.dragIndex = e),
						(this.dragMechanism = 'keyboard'),
						u.bind(this)({ target: this.dragTarget.svgEl }));
				}
				function f(e, t, r, n, i) {
					var a = [];
					if (e.absEl.elemset) {
						for (var s = {}, o = 0; o < e.absEl.elemset.length; o++) {
							var c = e.absEl.elemset[o];
							if (c) for (var l = c.getAttribute('class').split(' '), h = 0; h < l.length; h++) s[l[h]] = !0;
						}
						for (var u = 0; u < Object.keys(s).length; u++) a.push(Object.keys(s)[u]);
					}
					for (var f = {}, m = 0; m < a.length; m++)
						p(a[m], 'abcjs-v', f, 'voice'), p(a[m], 'abcjs-l', f, 'line'), p(a[m], 'abcjs-m', f, 'measure');
					e.staffPos && (f.staffPos = e.staffPos);
					for (var g = i.target; g && g.dataset && !g.dataset.name && 'svg' !== g.tagName.toLowerCase(); )
						g = g.parentNode;
					for (var v = i.target; v && v.dataset && !v.dataset.index && 'svg' !== v.tagName.toLowerCase(); )
						v = v.parentNode;
					v &&
						v.dataset &&
						((f.name = v.dataset.name), (f.clickedName = g.dataset.name), (f.parentClasses = v.classList)),
						g && g.classList && (f.clickedClasses = g.classList),
						(f.selectableElement = e.svgEl);
					for (var b = 0; b < this.listeners.length; b++)
						this.listeners[b](
							e.absEl.abcelem,
							e.absEl.tuneNumber,
							a.join(' '),
							f,
							{ step: t, max: r, index: n, setSelection: d.bind(this) },
							i
						);
				}
				function p(e, t, r, n) {
					if (0 === e.indexOf(t)) {
						var i = e.replace(t, ''),
							a = parseInt(i, 10);
						'' + a === i && (r[n] = a);
					}
				}
				function m() {
					for (var e = 0; e < this.selected.length; e++)
						this.selected[e].unhighlight(void 0, this.renderer.foregroundColor);
					this.selected = [];
				}
				function g(e, t) {
					m.bind(this)();
					for (var r = 0; r < this.staffgroups.length; r++)
						for (var n = this.staffgroups[r].voices, i = 0; i < n.length; i++)
							for (var a = n[i].children, s = 0; s < a.length; s++) {
								var o = a[s].abcelem.startChar,
									c = a[s].abcelem.endChar;
								((t > o && e < c) || (t === e && t === c)) &&
									((this.selected[this.selected.length] = a[s]), a[s].highlight(void 0, this.selectionColor));
							}
				}
				function v(e) {
					var t = e.getAttribute('class');
					t || (t = '');
					for (var r = t.split(' '), n = {}, i = 0; i < r.length; i++) n[r[i]] = !0;
					return n;
				}
				function b(e, t) {
					var r = [];
					for (var n in t) t.hasOwnProperty(n) && r.push(n);
					e.setAttribute('class', r.join(' '));
				}
				e.exports = function (e, t) {
					if (((e.rangeHighlight = g), e.dragging))
						for (var r = 0; r < e.selectables.length; r++) {
							var n = e.selectables[r];
							'true' === n.svgEl.getAttribute('selectable') &&
								(n.svgEl.setAttribute('tabindex', 0),
								n.svgEl.setAttribute('data-index', r),
								n.svgEl.addEventListener('keydown', a.bind(e)),
								n.svgEl.addEventListener('keyup', s.bind(e)),
								n.svgEl.addEventListener('focus', i.bind(e)));
						}
					for (var o = 0; o < t.length; o++)
						t[o].addEventListener('touchstart', l.bind(e), { passive: !0 }),
							t[o].addEventListener('touchmove', h.bind(e), { passive: !0 }),
							t[o].addEventListener('touchend', u.bind(e), { passive: !0 }),
							t[o].addEventListener('mousedown', l.bind(e)),
							t[o].addEventListener('mousemove', h.bind(e)),
							t[o].addEventListener('mouseup', u.bind(e));
				};
			},
			5829: function (e, t, r) {
				var n = r(2187);
				e.exports = function (e, t) {
					void 0 === e && (e = 'abcjs-note_selected'), void 0 === t && (t = '#000000'), n(this.elemset, '', e, t);
				};
			},
			6251: function (e, t, r) {
				var n = r(6658),
					i = r(4331),
					a = r(3721),
					s = function (e) {
						return void 0 === e ? 0 : Math.floor(Math.log(e) / Math.log(2));
					};
				function o(e, t, r, n) {
					if (!e.children) return n;
					for (var i = 0; i < e.children.length; i++) {
						var a = e.children[i];
						t && void 0 !== a.top && 'flags.ugrace' === a.c
							? (n = Math.max(n, a.top - r))
							: t || void 0 === a.bottom || 'flags.ugrace' !== a.c || (n = Math.max(n, r - a.bottom + 7));
					}
					return n;
				}
				function c(e, t, r) {
					var n = t.heads[e ? 0 : t.heads.length - 1],
						i = r.heads[e ? 0 : r.heads.length - 1],
						a = n.x;
					e && (a += n.w - 0.6);
					var s = i.x;
					return [a, (s += e ? i.w : 0.6)];
				}
				e.exports = function (e) {
					if (0 !== e.elems.length && !e.allrests) {
						var t = (function (e, t) {
								var r = e ? i.STEP : -i.STEP;
								return t && (r *= 0.4), r;
							})(e.stemsUp, e.isgrace),
							r = e.elems[0],
							l = e.elems[e.elems.length - 1],
							h = 0,
							u = e.stemsUp ? r.abcelem.maxpitch : r.abcelem.minpitch;
						(h = o(r, e.stemsUp, u, h)), (h = o(l, e.stemsUp, u, h)), (h = Math.max(e.stemHeight, h + 3));
						var d =
								((g = e.average),
								(v = e.elems.length),
								(b = h),
								(y = e.stemsUp),
								(x = r.abcelem.averagepitch),
								(w = l.abcelem.averagepitch),
								(k = e.isflat),
								(C = e.min),
								(T = e.max),
								(_ = e.isgrace),
								(S = b - 2),
								(E = b - 2),
								(M = Math.round(y ? Math.max(g + S, T + E) : Math.min(g - S, C - E))),
								(N = (function (e, t, r, n) {
									if (n) return 0;
									var i = e - t,
										a = r / 2;
									return i > a && (i = a), i < -a && (i = -a), i;
								})(x, w, v, k)),
								(A = M + Math.floor(N / 2)),
								(B = M + Math.floor(-N / 2)),
								_ || (((y && M < 6) || (!y && M > 6)) && ((A = 6), (B = 6))),
								[A, B]),
							f = c(e.stemsUp, r, l);
						e.addBeam({ startX: f[0], endX: f[1], startY: d[0], endY: d[1], dy: t });
						for (
							var p = (function (e, t, r, n, i) {
									for (var o = [], l = [], h = 0; h < e.length; h++) {
										var u = e[h];
										if (!u.abcelem.rest) {
											var d = u.heads[t ? 0 : u.heads.length - 1],
												f = d.x + (t ? d.w : 0),
												p = a(r.startX, r.startY, r.endX, r.endY, f),
												m = t ? -1.5 : 1.5;
											n && (m = (2 * m) / 3);
											var g = u.abcelem.duration;
											0 === g && (g = 0.25);
											for (var v = s(g); v < -3; v++) {
												var b = -4 - v;
												if (
													(l[b]
														? (l[b].single = !1)
														: (l[b] = { x: f + (t ? -0.6 : 0), y: p + m * (b + 1), durlog: v, single: !0 }),
													h > 0 && u.abcelem.beambr && u.abcelem.beambr <= b + 1)
												) {
													l[b].split || (l[b].split = [l[b].x]);
													var y = c(t, e[h - 1], u);
													l[b].split[l[b].split.length - 1] >= y[0] && (y[0] += u.w),
														l[b].split.push(y[0]),
														l[b].split.push(y[1]);
												}
											}
											for (var x = l.length - 1; x >= 0; x--)
												if (h === e.length - 1 || s(e[h + 1].abcelem.duration) > -x - 4) {
													var w = f,
														k = p + m * (x + 1);
													l[x].single &&
														((w = 0 === h ? f + 5 : f - 5),
														(k = a(r.startX, r.startY, r.endX, r.endY, w) + m * (x + 1)));
													var C = { startX: l[x].x, endX: w, startY: l[x].y, endY: k, dy: i };
													if (void 0 !== l[x].split) {
														var T = l[x].split;
														C.endX <= T[T.length - 1] && (T[T.length - 1] -= u.w),
															T.push(C.endX),
															(C.split = l[x].split);
													}
													o.push(C), (l = l.slice(0, x));
												}
										}
									}
									return o;
								})(e.elems, e.stemsUp, e.beams[0], e.isgrace, t),
								m = 0;
							m < p.length;
							m++
						)
							e.addBeam(p[m]);
						!(function (e, t, r, s, o) {
							for (var c = 0; c < e.length; c++) {
								var l = e[c];
								if (!l.abcelem.rest) {
									var h = !l.addExtra,
										u = h ? o : l,
										d = l.heads[t ? 0 : l.heads.length - 1],
										f = 0.2,
										p = d.pitch + (t ? f : -f),
										m = t ? d.w : 0;
									h || (m += d.dx);
									var g = d.x + m,
										v = a(r.startX, r.startY, r.endX, r.endY, g),
										b = t ? -0.6 : 0.6;
									t || (v -= s / 2 / i.STEP),
										h && (m += l.heads[0].dx),
										'noteheads.slash.quarter' === d.c && (t ? (p += 1) : (p -= 1));
									var y = new n(null, m, 0, p, { type: 'stem', pitch2: v, linewidth: b });
									y.setX(u.x), u.addRight(y);
								}
							}
						})(e.elems, e.stemsUp, e.beams[0], t, e.mainNote);
					}
					var g, v, b, y, x, w, k, C, T, _, S, E, M, N, A, B;
				};
			},
			3721: function (e) {
				e.exports = function (e, t, r, n, i) {
					return t + ((n - t) / (r - e)) * (i - e);
				};
			},
			4760: function (e) {
				function t(e, t, r) {
					if (t)
						for (var n = 0; n < t.length; n++)
							if (t[n].header) {
								var i = r.calc(t[n].header, 'voicefont', '');
								e = Math.max(e, i.width);
							}
					return e;
				}
				function r(e, t, r) {
					if (e) for (var i = 0; i < e.length; i++) n(t, e[i]), (r = Math.max(r, e[i].getWidth()));
					return r;
				}
				function n(e, t) {
					t.x = e;
				}
				e.exports = function (e, n, i, a, s) {
					var o,
						c,
						l = e.padding.left,
						h = 0;
					for (o = 0; o < i.length; o++)
						i[o].header && ((c = n.calc(i[o].header, 'voicefont', '')), (h = Math.max(h, c.width)));
					(h = t(h, a, n)), (h = t(h, s, n)) && (h += n.calc('A', 'voicefont', '').width);
					var u = 0;
					return (u = r(a, (l += h), u)), l + (u = r(s, l, u));
				};
			},
			1564: function (e, t, r) {
				var n = r(6759),
					i = r(6934),
					a = r(735),
					s = r(4760),
					o = function (e, t, r, n, i, o, l) {
						for (var h = s(e, n.getTextSize, n.voices, n.brace, n.bracket), u = r, d = 0; d < 8; d++) {
							var f = a(u, e, l, n, h);
							if (
								((u = c(
									o,
									i.stretchlast,
									t + e.padding.left,
									n.w,
									u,
									f.spacingUnits,
									f.minSpace,
									e.padding.left + e.padding.right
								)),
								l && console.log('setXSpace', d, n.w, u, n.minspace),
								null === u)
							)
								break;
						}
						!(function (e) {
							for (var t = 0; t < e.length; t++)
								for (var r = e[t], n = 1; n < r.children.length - 1; n++) {
									var i = r.children[n];
									if (i.abcelem.rest && ('whole' === i.abcelem.rest.type || 'multimeasure' === i.abcelem.rest.type)) {
										var a = r.children[n - 1],
											s = r.children[n + 1];
										i.center(a, s);
									}
								}
						})(n.voices);
					};
				function c(e, t, r, n, i, a, s, o) {
					if (e)
						if (void 0 === t) {
							if (n / r < 0.66) return null;
						} else if (!(1 - (n + o) / r < t)) return null;
					return Math.abs(r - n) < 2 ? null : a > 0 ? ((i = (r - (n - a * i)) / a) * s > 50 && (i = 50 / s), i) : null;
				}
				e.exports = function (e, t, r, a) {
					var s,
						c,
						l = r;
					for (s = 0; s < t.lines.length; s++)
						(c = t.lines[s]).staff &&
							(o(e, r, a, c.staffGroup, t.formatting, s === t.lines.length - 1, !1),
							c.staffGroup.w > l && (l = c.staffGroup.w));
					for (s = 0; s < t.lines.length; s++)
						if ((c = t.lines[s]).staffGroup && c.staffGroup.voices) {
							for (var h = 0; h < c.staffGroup.voices.length; h++) n(c.staffGroup.voices[h]);
							i(e, c.staffGroup);
						}
					for (s = 0; s < t.lines.length; s++) (c = t.lines[s]).staffGroup && c.staffGroup.setHeight();
					return l;
				};
			},
			6934: function (e, t, r) {
				var n = r(4331),
					i = 1;
				function a(e, t, r, n) {
					if (e.specialY[r]) {
						var a = e.specialY[r];
						n && (a *= n), (e.top += a + i), (t[r] = e.top);
					}
				}
				function s(e, t, r) {
					var n, i;
					for (n = 0; n < t.children.length; n++) o(e, (i = t.children[n]), r);
					for (n = 0; n < t.otherchildren.length; n++)
						switch ((i = t.otherchildren[n]).type) {
							case 'CrescendoElem':
								c(e, i);
								break;
							case 'DynamicDecoration':
								l(e, i);
								break;
							case 'EndingElem':
								h(e, i);
						}
				}
				function o(e, t, r) {
					for (var n = 0; n < t.children.length; n++) {
						var i = t.children[n];
						for (var a in t.specialY)
							t.specialY.hasOwnProperty(a) &&
								i[a] &&
								((i.pitch = e[a]),
								void 0 === i.top &&
									('TempoElement' === i.type ? u(e, i) : d(e, i, r), t.pushTop(i.top), t.pushBottom(i.bottom)));
					}
				}
				function c(e, t) {
					t.dynamicHeightAbove ? (t.pitch = e.dynamicHeightAbove) : (t.pitch = e.dynamicHeightBelow);
				}
				function l(e, t) {
					t.volumeHeightAbove ? (t.pitch = e.volumeHeightAbove) : (t.pitch = e.volumeHeightBelow);
				}
				function h(e, t) {
					t.pitch = e.endingHeightAbove - 2;
				}
				function u(e, t) {
					if (((t.pitch = e.tempoHeightAbove), (t.top = e.tempoHeightAbove), (t.bottom = e.tempoHeightAbove), t.note)) {
						var r = t.pitch - t.totalHeightInPitches + 1;
						(t.note.top = r), (t.note.bottom = r);
						for (var n = 0; n < t.note.children.length; n++) {
							var i = t.note.children[n];
							(i.top += r), (i.bottom += r), (i.pitch += r), void 0 !== i.pitch2 && (i.pitch2 += r);
						}
					}
				}
				function d(e, t, r) {
					switch (t.type) {
						case 'part':
							(t.top = e.partHeightAbove + t.height), (t.bottom = e.partHeightAbove);
							break;
						case 'text':
						case 'chord':
							t.chordHeightAbove
								? ((t.top = e.chordHeightAbove), (t.bottom = e.chordHeightAbove))
								: ((t.top = e.chordHeightBelow), (t.bottom = e.chordHeightBelow));
							break;
						case 'lyric':
							t.lyricHeightAbove
								? ((t.top = e.lyricHeightAbove), (t.bottom = e.lyricHeightAbove))
								: ((t.top = e.lyricHeightBelow + r.vocal / n.STEP),
								  (t.bottom = e.lyricHeightBelow + r.vocal / n.STEP),
								  (t.pitch -= r.vocal / n.STEP));
							break;
						case 'debug':
							(t.top = e.chordHeightAbove), (t.bottom = e.chordHeightAbove);
					}
					(void 0 !== t.pitch && void 0 !== t.top) ||
						console.error('RelativeElement position not set.', t.type, t.pitch, t.top, e);
				}
				e.exports = function (e, t) {
					for (var r, o = 0; o < t.staffs.length; o++) {
						var c = t.staffs[o],
							l = {
								tempoHeightAbove: 0,
								partHeightAbove: 0,
								volumeHeightAbove: 0,
								dynamicHeightAbove: 0,
								endingHeightAbove: 0,
								chordHeightAbove: 0,
								lyricHeightAbove: 0,
								lyricHeightBelow: 0,
								chordHeightBelow: 0,
								volumeHeightBelow: 0,
								dynamicHeightBelow: 0
							};
						if (
							(e.showDebug &&
								e.showDebug.indexOf('box') >= 0 &&
								((c.originalTop = c.top), (c.originalBottom = c.bottom)),
							a(c, l, 'lyricHeightAbove'),
							a(c, l, 'chordHeightAbove', c.specialY.chordLines.above),
							c.specialY.endingHeightAbove &&
								(c.specialY.chordHeightAbove ? (c.top += 2) : (c.top += c.specialY.endingHeightAbove + i),
								(l.endingHeightAbove = c.top)),
							c.specialY.dynamicHeightAbove && c.specialY.volumeHeightAbove
								? ((c.top += Math.max(c.specialY.dynamicHeightAbove, c.specialY.volumeHeightAbove) + i),
								  (l.dynamicHeightAbove = c.top),
								  (l.volumeHeightAbove = c.top))
								: (a(c, l, 'dynamicHeightAbove'), a(c, l, 'volumeHeightAbove')),
							a(c, l, 'partHeightAbove'),
							a(c, l, 'tempoHeightAbove'),
							c.specialY.lyricHeightBelow &&
								((c.specialY.lyricHeightBelow += e.spacing.vocal / n.STEP),
								(l.lyricHeightBelow = c.bottom),
								(c.bottom -= c.specialY.lyricHeightBelow + i)),
							c.specialY.chordHeightBelow)
						) {
							l.chordHeightBelow = c.bottom;
							var h = c.specialY.chordHeightBelow;
							c.specialY.chordLines.below && (h *= c.specialY.chordLines.below), (c.bottom -= h + i);
						}
						c.specialY.volumeHeightBelow && c.specialY.dynamicHeightBelow
							? ((l.volumeHeightBelow = c.bottom),
							  (l.dynamicHeightBelow = c.bottom),
							  (c.bottom -= Math.max(c.specialY.volumeHeightBelow, c.specialY.dynamicHeightBelow) + i))
							: c.specialY.volumeHeightBelow
							? ((l.volumeHeightBelow = c.bottom), (c.bottom -= c.specialY.volumeHeightBelow + i))
							: c.specialY.dynamicHeightBelow &&
							  ((l.dynamicHeightBelow = c.bottom), (c.bottom -= c.specialY.dynamicHeightBelow + i)),
							e.showDebug && e.showDebug.indexOf('box') >= 0 && (c.positionY = l);
						for (var u = 0; u < c.voices.length; u++) s(l, t.voices[c.voices[u]], e.spacing);
						if (void 0 !== r) {
							var d = r + (c.top - 10),
								f = e.spacing.systemStaffSeparation / n.STEP - d;
							f > 0 && (c.top += f);
						}
						r = 2 - c.bottom;
					}
				};
			},
			735: function (e, t, r) {
				var n = r(937);
				function i(e) {
					for (var t = 0; t < e.length; t++) if (!n.layoutEnded(e[t])) return !1;
					return !0;
				}
				function a(e) {
					return e.durationindex - (e.children[e.i] && e.children[e.i].duration > 0 ? 0 : 5e-7);
				}
				e.exports = function (e, t, r, s, o) {
					var c,
						l = 0,
						h = 1e3,
						u = o;
					s.startx = u;
					var d,
						f,
						p = 0;
					for (r && console.log('init layout', e), c = 0; c < s.voices.length; c++) n.beginLayout(u, s.voices[c]);
					for (var m = 0; !i(s.voices); ) {
						for (p = null, c = 0; c < s.voices.length; c++)
							n.layoutEnded(s.voices[c]) || (p && !(a(s.voices[c]) < p)) || (p = a(s.voices[c]));
						var g = [],
							v = [];
						for (c = 0; c < s.voices.length; c++) a(s.voices[c]) - p > 1e-7 ? v.push(s.voices[c]) : g.push(s.voices[c]);
						m = 0;
						var b = 0;
						for (c = 0; c < g.length; c++)
							n.getNextX(g[c]) > u &&
								((u = n.getNextX(g[c])), (m = n.getSpacingUnits(g[c])), (b = g[c].spacingduration));
						(l += m), (h = Math.min(h, m)), r && console.log('currentduration: ', p, l, h);
						var y = void 0;
						for (c = 0; c < g.length; c++) {
							var x = g[c];
							0 === x.voicenumber && (y = c);
							var w = void 0 !== y && g[y].voicenumber !== x.voicenumber ? g[y] : void 0;
							(f = w),
								((d = x) &&
									d.staff &&
									d.staff.voices &&
									0 !== d.staff.voices.length &&
									f &&
									f.staff &&
									f.staff.voices &&
									0 !== f.staff.voices.length &&
									d.staff.voices[0] === f.staff.voices[0]) ||
									(w = void 0);
							var k = n.layoutOneItem(u, e, x, t.minPadding, w),
								C = k - u;
							if (C > 0) {
								u = k;
								for (var T = 0; T < c; T++) n.shiftRight(C, g[T]);
							}
						}
						for (c = 0; c < v.length; c++) (v[c].spacingduration -= b), n.updateNextX(u, e, v[c]);
						for (c = 0; c < g.length; c++) {
							var _ = g[c];
							n.updateIndices(_);
						}
					}
					for (c = 0; c < s.voices.length; c++)
						n.getNextX(s.voices[c]) > u && ((u = n.getNextX(s.voices[c])), (m = n.getSpacingUnits(s.voices[c])));
					return (
						(function (e) {
							for (var t = 0, r = 0; r < e.length; r++) {
								var n = e[r];
								if (n.children.length > 0) {
									var i = n.children.length - 1,
										a = n.children[i];
									if ('bar' === a.abcelem.el_type) {
										var s = a.children[0].x;
										s > t ? (t = s) : (a.children[0].x = t);
									}
								}
							}
						})(s.voices),
						(l += m),
						s.setWidth(u),
						{ spacingUnits: l, minSpace: h }
					);
				};
			},
			3294: function (e, t, r) {
				var n = r(3721);
				function i(e) {
					return e.stemsUp;
				}
				e.exports = function (e) {
					if (e.anchor1 && e.anchor2) {
						e.hasBeam = !!e.anchor1.parent.beam && e.anchor1.parent.beam === e.anchor2.parent.beam;
						var t = e.anchor1.parent.beam;
						if (
							(!e.hasBeam ||
								(t.elems[0] === e.anchor1.parent && t.elems[t.elems.length - 1] === e.anchor2.parent) ||
								(e.hasBeam = !1),
							e.hasBeam)
						) {
							var r = i(t) ? e.anchor1.x + e.anchor1.w : e.anchor1.x;
							(e.yTextPos = (function (e, t, r) {
								if (0 === r.beams.length) return 0;
								r = r.beams[0];
								var i = e + (t - e) / 2;
								return n(r.startX, r.startY, r.endX, r.endY, i);
							})(r, e.anchor2.x, t)),
								(e.yTextPos += i(t) ? 3 : -2),
								(e.xTextPos = ((o = r), (c = e.anchor2.x), o + (c - o) / 2)),
								(e.top = e.yTextPos + 1),
								(e.bottom = e.yTextPos - 2),
								i(t) && (e.endingHeightAbove = 4);
						} else {
							(e.startNote = Math.max(e.anchor1.parent.top, 9) + 4),
								(e.endNote = Math.max(e.anchor2.parent.top, 9) + 4),
								'rest' === e.anchor1.parent.type && 'rest' !== e.anchor2.parent.type
									? (e.startNote = e.endNote)
									: 'rest' === e.anchor2.parent.type && 'rest' !== e.anchor1.parent.type && (e.endNote = e.startNote);
							for (var a = 0, s = 0; s < e.middleElems.length; s++) a = Math.max(a, e.middleElems[s].top);
							((a += 4) > e.startNote || a > e.endNote) && ((e.startNote = a), (e.endNote = a)),
								e.flatBeams &&
									((e.startNote = Math.max(e.startNote, e.endNote)), (e.endNote = Math.max(e.startNote, e.endNote))),
								(e.yTextPos = e.startNote + (e.endNote - e.startNote) / 2),
								(e.xTextPos = e.anchor1.x + (e.anchor2.x + e.anchor2.w - e.anchor1.x) / 2),
								(e.top = e.yTextPos + 1);
						}
					}
					var o, c;
					delete e.middleElems, delete e.flatBeams;
				};
			},
			937: function (e) {
				var t = function () {};
				(t.beginLayout = function (e, t) {
					(t.i = 0), (t.durationindex = 0), (t.startx = e), (t.minx = e), (t.nextx = e), (t.spacingduration = 0);
				}),
					(t.layoutEnded = function (e) {
						return e.i >= e.children.length;
					}),
					(t.getNextX = function (e) {
						return Math.max(e.minx, e.nextx);
					}),
					(t.getSpacingUnits = function (e) {
						return Math.sqrt(8 * e.spacingduration);
					}),
					(t.layoutOneItem = function (e, t, r, n, i) {
						var a = r.children[r.i];
						if (!a) return 0;
						var s = e - r.minx,
							o = r.durationindex + a.duration > 0 ? n : 0;
						if ('note' === a.abcelem.el_type && !a.abcelem.rest && 0 !== r.voicenumber && i) {
							var c = i.children[i.i],
								l =
									c &&
									((a.abcelem.maxpitch <= c.abcelem.maxpitch + 1 && a.abcelem.maxpitch >= c.abcelem.minpitch - 1) ||
										(a.abcelem.minpitch <= c.abcelem.maxpitch + 1 && a.abcelem.minpitch >= c.abcelem.minpitch - 1));
							if (
								(l &&
									a.abcelem.minpitch === c.abcelem.minpitch &&
									a.abcelem.maxpitch === c.abcelem.maxpitch &&
									c.heads &&
									c.heads.length > 0 &&
									a.heads &&
									a.heads.length > 0 &&
									c.heads[0].c === a.heads[0].c &&
									(l = !1),
								l)
							) {
								var h = c.heads && c.heads.length > 0 ? c.heads[0].realWidth : c.fixed.w;
								a.adjustedWidth || (a.adjustedWidth = h + a.w), (a.w = a.adjustedWidth);
								for (var u = 0; u < a.children.length; u++) {
									var d = a.children[u];
									d.name.indexOf('accidental') < 0 &&
										(d.adjustedWidth || (d.adjustedWidth = d.dx + h), (d.dx = d.adjustedWidth));
								}
							}
						}
						var f = (function (e, t) {
							var r = 0;
							return ('note' !== e.type && 'bar' !== e.type) || (r = t), -e.extraw + r;
						})(a, o);
						return (
							s < f &&
								(0 === r.i ||
									'bar' !== a.type ||
									('part' !== r.children[r.i - 1].type && 'tempo' !== r.children[r.i - 1].type)) &&
								(e += f - s),
							a.setX(e),
							(r.spacingduration = a.duration),
							(r.minx =
								e +
								(function (e) {
									return e.w;
								})(a)),
							r.i !== r.children.length - 1 && (r.minx += a.minspacing),
							this.updateNextX(e, t, r),
							e
						);
					}),
					(t.shiftRight = function (e, t) {
						var r = t.children[t.i];
						r && (r.setX(r.x + e), (t.minx += e), (t.nextx += e));
					}),
					(t.updateNextX = function (e, t, r) {
						r.nextx = e + t * Math.sqrt(8 * r.spacingduration);
					}),
					(t.updateIndices = function (e) {
						this.layoutEnded(e) ||
							((e.durationindex += e.children[e.i].duration),
							'bar' === e.children[e.i].type && (e.durationindex = Math.round(64 * e.durationindex) / 64),
							e.i++);
					}),
					(e.exports = t);
			},
			6759: function (e, t, r) {
				var n = r(6251),
					i = r(3721),
					a = r(3294);
				function s(e) {
					for (var t = 0; t < e.elems.length; t++) {
						var r = e.elems[t];
						if (r.top)
							for (var n = l(r, e), i = 0; i < r.children.length; i++) {
								var a = r.children[i];
								if ('ornament' === a.klass && a.bottom - 1.5 < n) {
									var s = n - a.bottom + 1.5;
									(a.bottom += s), (a.top += s), (a.pitch += s), (n = r.top = a.top);
								}
							}
					}
				}
				function o(e, t) {
					var r = t.getChordDim();
					if (r) {
						for (var n = 0; n < e.length; n++)
							if (e[n] < r.left) return n > 0 && t.putChordInLane(n), void (e[n] = r.right);
						e.push(r.right), t.putChordInLane(e.length - 1);
					}
				}
				function c(e) {
					for (var t = 0, r = 0; r < e.children.length; r++) e.children[r].chordHeightBelow && t++;
					return t;
				}
				function l(e, t) {
					return (t = t.beams[0]), i(t.startX, t.startY, t.endX, t.endY, e.x);
				}
				e.exports = function (e) {
					for (var t = 0; t < e.beams.length; t++)
						if ('BeamElem' === e.beams[t].type) {
							n(e.beams[t]), s(e.beams[t]);
							for (var r = 0; r < e.beams[t].elems.length; r++) e.adjustRange(e.beams[t].elems[r]);
						}
					for (
						e.staff.specialY.chordLines = (function (e) {
							var t,
								r,
								n,
								i = [0],
								a = [0];
							for (t = 0; t < e.length; t++) {
								for (r = 0; r < e[t].children.length; r++) (n = e[t].children[r]).chordHeightAbove && o(i, n);
								for (r = e[t].children.length - 1; r >= 0; r--) (n = e[t].children[r]).chordHeightBelow && o(a, n);
							}
							return (
								(i.length > 1 || a.length > 1) &&
									(function (e, t, r) {
										for (var n = 0; n < e.length; n++) {
											c(e[n]);
											for (var i = 0; i < e[n].children.length; i++) {
												var a = e[n].children[i];
												a.chordHeightAbove && a.invertLane(t);
											}
										}
									})(e, i.length, a.length),
								{ above: i.length, below: a.length }
							);
						})(e.children),
							t = 0;
						t < e.otherchildren.length;
						t++
					) {
						var i = e.otherchildren[t];
						'TripletElem' === i.type && (a(i), e.adjustRange(i));
					}
					(e.staff.top = Math.max(e.staff.top, e.top)), (e.staff.bottom = Math.min(e.staff.bottom, e.bottom));
				};
			},
			8510: function (e, t, r) {
				var n = r(4331),
					i = r(4101),
					a = function (e) {
						(this.paper = new i(e)),
							(this.controller = null),
							(this.space = 3 * n.SPACE),
							(this.padding = {}),
							this.reset(),
							(this.firefox112 = navigator.userAgent.indexOf('Firefox/112.0') >= 0);
					};
				(a.prototype.reset = function () {
					this.paper.clear(),
						(this.y = 0),
						(this.abctune = null),
						(this.path = null),
						(this.isPrint = !1),
						(this.lineThickness = 0),
						this.initVerticalSpace();
				}),
					(a.prototype.newTune = function (e) {
						(this.abctune = e),
							this.setVerticalSpace(e.formatting),
							(this.isPrint = 'print' === e.media),
							this.setPadding(e);
					}),
					(a.prototype.setLineThickness = function (e) {
						this.lineThickness = e;
					}),
					(a.prototype.setPaddingOverride = function (e) {
						this.paddingOverride = {
							top: e.paddingtop,
							bottom: e.paddingbottom,
							right: e.paddingright,
							left: e.paddingleft
						};
					}),
					(a.prototype.setPadding = function (e) {
						function t(t, r, n, i, a) {
							void 0 !== e.formatting[n]
								? (t.padding[r] = e.formatting[n])
								: void 0 !== t.paddingOverride[r]
								? (t.padding[r] = t.paddingOverride[r])
								: t.isPrint
								? (t.padding[r] = i)
								: (t.padding[r] = a);
						}
						t(this, 'top', 'topmargin', 38, 15),
							t(this, 'bottom', 'botmargin', 38, 15),
							t(this, 'left', 'leftmargin', 68, 15),
							t(this, 'right', 'rightmargin', 68, 15);
					}),
					(a.prototype.adjustNonScaledItems = function (e) {
						(this.padding.top /= e),
							(this.padding.bottom /= e),
							(this.padding.left /= e),
							(this.padding.right /= e),
							(this.abctune.formatting.headerfont.size /= e),
							(this.abctune.formatting.footerfont.size /= e);
					}),
					(a.prototype.initVerticalSpace = function () {
						this.spacing = {
							composer: 7.56,
							graceBefore: 8.67,
							graceInside: 10.67,
							graceAfter: 16,
							info: 0,
							lineSkipFactor: 1.1,
							music: 7.56,
							paragraphSkipFactor: 0.4,
							parts: 11.33,
							slurHeight: 1,
							staffSeparation: 61.33,
							stemHeight: 36.67,
							subtitle: 3.78,
							systemStaffSeparation: 48,
							text: 18.9,
							title: 7.56,
							top: 30.24,
							vocal: 0,
							words: 0
						};
					}),
					(a.prototype.setVerticalSpace = function (e) {
						void 0 !== e.staffsep && (this.spacing.staffSeparation = (4 * e.staffsep) / 3),
							void 0 !== e.composerspace && (this.spacing.composer = (4 * e.composerspace) / 3),
							void 0 !== e.partsspace && (this.spacing.parts = (4 * e.partsspace) / 3),
							void 0 !== e.textspace && (this.spacing.text = (4 * e.textspace) / 3),
							void 0 !== e.musicspace && (this.spacing.music = (4 * e.musicspace) / 3),
							void 0 !== e.titlespace && (this.spacing.title = (4 * e.titlespace) / 3),
							void 0 !== e.sysstaffsep && (this.spacing.systemStaffSeparation = (4 * e.sysstaffsep) / 3),
							void 0 !== e.subtitlespace && (this.spacing.subtitle = (4 * e.subtitlespace) / 3),
							void 0 !== e.topspace && (this.spacing.top = (4 * e.topspace) / 3),
							void 0 !== e.vocalspace && (this.spacing.vocal = (4 * e.vocalspace) / 3),
							void 0 !== e.wordsspace && (this.spacing.words = (4 * e.wordsspace) / 3);
					}),
					(a.prototype.calcY = function (e) {
						return this.y - e * n.STEP;
					}),
					(a.prototype.moveY = function (e, t) {
						void 0 === t && (t = 1), (this.y += e * t);
					}),
					(a.prototype.absolutemoveY = function (e) {
						this.y = e;
					}),
					(e.exports = a);
			},
			4101: function (e) {
				var t = 'http://www.w3.org/2000/svg';
				function r(e) {
					(this.svg = s()), (this.currentGroup = []), e.appendChild(this.svg);
				}
				function n(e, t, r) {
					var n = r - e;
					return 'M ' + e + ' ' + t + ' l ' + n + ' 0 l 0 1  l ' + -n + ' 0  z ';
				}
				function i(e, t, r) {
					var n = r - t;
					return 'M ' + e + ' ' + t + ' l 0 ' + n + ' l 1 0  l 0 ' + -n + '  z ';
				}
				(r.prototype.clear = function () {
					if (this.svg) {
						var e = this.svg.parentNode;
						(this.svg = s()), (this.currentGroup = []), e && ((e.innerHTML = ''), e.appendChild(this.svg));
					}
				}),
					(r.prototype.setTitle = function (e) {
						var t = document.createElement('title'),
							r = document.createTextNode(e);
						t.appendChild(r), this.svg.insertBefore(t, this.svg.firstChild);
					}),
					(r.prototype.setResponsiveWidth = function (e, t) {
						if (
							(this.svg.setAttribute('viewBox', '0 0 ' + e + ' ' + t),
							this.svg.setAttribute('preserveAspectRatio', 'xMinYMin meet'),
							this.svg.removeAttribute('height'),
							this.svg.removeAttribute('width'),
							(this.svg.style.display = 'inline-block'),
							(this.svg.style.position = 'absolute'),
							(this.svg.style.top = '0'),
							(this.svg.style.left = '0'),
							this.svg.parentNode)
						) {
							var r = this.svg.parentNode.getAttribute('class');
							r
								? r.indexOf('abcjs-container') < 0 && this.svg.parentNode.setAttribute('class', r + ' abcjs-container')
								: this.svg.parentNode.setAttribute('class', 'abcjs-container'),
								(this.svg.parentNode.style.display = 'inline-block'),
								(this.svg.parentNode.style.position = 'relative'),
								(this.svg.parentNode.style.width = '100%');
							var n = (t / e) * 100;
							(this.svg.parentNode.style['padding-bottom'] = n + '%'),
								(this.svg.parentNode.style['vertical-align'] = 'middle'),
								(this.svg.parentNode.style.overflow = 'hidden');
						}
					}),
					(r.prototype.setSize = function (e, t) {
						this.svg.setAttribute('width', e), this.svg.setAttribute('height', t);
					}),
					(r.prototype.setAttribute = function (e, t) {
						this.svg.setAttribute(e, t);
					}),
					(r.prototype.setScale = function (e) {
						1 !== e
							? ((this.svg.style.transform = 'scale(' + e + ',' + e + ')'),
							  (this.svg.style['-ms-transform'] = 'scale(' + e + ',' + e + ')'),
							  (this.svg.style['-webkit-transform'] = 'scale(' + e + ',' + e + ')'),
							  (this.svg.style['transform-origin'] = '0 0'),
							  (this.svg.style['-ms-transform-origin-x'] = '0'),
							  (this.svg.style['-ms-transform-origin-y'] = '0'),
							  (this.svg.style['-webkit-transform-origin-x'] = '0'),
							  (this.svg.style['-webkit-transform-origin-y'] = '0'))
							: ((this.svg.style.transform = ''),
							  (this.svg.style['-ms-transform'] = ''),
							  (this.svg.style['-webkit-transform'] = ''));
					}),
					(r.prototype.insertStyles = function (e) {
						var r = document.createElementNS(t, 'style');
						(r.textContent = e), this.svg.insertBefore(r, this.svg.firstChild);
					}),
					(r.prototype.setParentStyles = function (e) {
						for (var t in e) e.hasOwnProperty(t) && this.svg.parentNode && (this.svg.parentNode.style[t] = e[t]);
						this.dummySvg && (document.querySelector('body').removeChild(this.dummySvg), (this.dummySvg = null));
					}),
					(r.prototype.rect = function (e) {
						var t = [],
							r = e.x,
							a = e.y,
							s = e.x + e.width,
							o = e.y + e.height;
						return (
							t.push(n(r, a, s)),
							t.push(n(r, o, s)),
							t.push(i(s, a, o)),
							t.push(i(r, o, a)),
							this.path({ path: t.join(' '), stroke: 'none', 'data-name': e['data-name'] })
						);
					}),
					(r.prototype.dottedLine = function (e) {
						var r = document.createElementNS(t, 'line');
						r.setAttribute('x1', e.x1),
							r.setAttribute('x2', e.x2),
							r.setAttribute('y1', e.y1),
							r.setAttribute('y2', e.y2),
							r.setAttribute('stroke', e.stroke),
							r.setAttribute('stroke-dasharray', '5,5'),
							this.svg.insertBefore(r, this.svg.firstChild);
					}),
					(r.prototype.rectBeneath = function (e) {
						var r = document.createElementNS(t, 'rect');
						r.setAttribute('x', e.x),
							r.setAttribute('width', e.width),
							r.setAttribute('y', e.y),
							r.setAttribute('height', e.height),
							e.stroke && r.setAttribute('stroke', e.stroke),
							e['stroke-opacity'] && r.setAttribute('stroke-opacity', e['stroke-opacity']),
							e.fill && r.setAttribute('fill', e.fill),
							e['fill-opacity'] && r.setAttribute('fill-opacity', e['fill-opacity']),
							this.svg.insertBefore(r, this.svg.firstChild);
					}),
					(r.prototype.text = function (e, r, n) {
						var i = document.createElementNS(t, 'text');
						for (var a in (i.setAttribute('stroke', 'none'), r)) r.hasOwnProperty(a) && i.setAttribute(a, r[a]);
						for (var s = ('' + e).split('\n'), o = 0; o < s.length; o++) {
							var c = document.createElementNS(t, 'tspan');
							if (
								(c.setAttribute('x', r.x ? r.x : 0), 0 !== o && c.setAttribute('dy', '1.2em'), -1 !== s[o].indexOf(''))
							) {
								var l = s[o].split('');
								if (((c.textContent = l[0]), l[1])) {
									var h = document.createElementNS(t, 'tspan');
									h.setAttribute('dy', '-0.3em'),
										h.setAttribute('style', 'font-size:0.7em'),
										(h.textContent = l[1]),
										c.appendChild(h);
								}
								if (l[2]) {
									var u = l[1] ? '0.4em' : '0.1em',
										d = document.createElementNS(t, 'tspan');
									d.setAttribute('dy', u),
										d.setAttribute('style', 'font-size:0.7em'),
										(d.textContent = l[2]),
										c.appendChild(d);
								}
							} else c.textContent = s[o];
							i.appendChild(c);
						}
						return n ? n.appendChild(i) : this.append(i), i;
					}),
					(r.prototype.guessWidth = function (e, t) {
						var r,
							n = this.createDummySvg(),
							i = this.text(e, t, n);
						try {
							(r = i.getBBox()),
								(r =
									isNaN(r.height) || !r.height
										? { width: t['font-size'] / 2, height: t['font-size'] + 2 }
										: { width: r.width, height: r.height });
						} catch (e) {
							r = { width: t['font-size'] / 2, height: t['font-size'] + 2 };
						}
						return n.removeChild(i), r;
					}),
					(r.prototype.createDummySvg = function () {
						return (
							this.dummySvg ||
								((this.dummySvg = s()),
								this.dummySvg.setAttribute(
									'style',
									['display: block !important;', 'height: 1px;', 'width: 1px;', 'position: absolute;'].join('')
								),
								document.querySelector('body').appendChild(this.dummySvg)),
							this.dummySvg
						);
					});
				var a = {};
				function s() {
					var e = document.createElementNS(t, 'svg');
					return (
						e.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink'),
						e.setAttribute('role', 'img'),
						e.setAttribute('fill', 'currentColor'),
						e.setAttribute('stroke', 'currentColor'),
						e
					);
				}
				(r.prototype.getTextSize = function (e, t, r) {
					if (('number' == typeof e && (e = '' + e), !e || e.match(/^\s+$/))) return { width: 0, height: 0 };
					var n;
					if (e.length < 20 && ((n = e + JSON.stringify(t)), a[n])) return a[n];
					var i,
						s = !r;
					r || (r = this.text(e, t));
					try {
						(i = r.getBBox()),
							(i = isNaN(i.height) || !i.height ? this.guessWidth(e, t) : { width: i.width, height: i.height });
					} catch (r) {
						i = this.guessWidth(e, t);
					}
					return (
						s && (this.currentGroup.length > 0 ? this.currentGroup[0].removeChild(r) : this.svg.removeChild(r)),
						n && (a[n] = i),
						i
					);
				}),
					(r.prototype.openGroup = function (e) {
						e = e || {};
						var r = document.createElementNS(t, 'g');
						return (
							e.klass && r.setAttribute('class', e.klass),
							e.fill && r.setAttribute('fill', e.fill),
							e.stroke && r.setAttribute('stroke', e.stroke),
							e['data-name'] && r.setAttribute('data-name', e['data-name']),
							e.prepend ? this.prepend(r) : this.append(r),
							this.currentGroup.unshift(r),
							r
						);
					}),
					(r.prototype.closeGroup = function () {
						var e = this.currentGroup.shift();
						return e && 0 === e.children.length ? (e.parentElement.removeChild(e), null) : e;
					}),
					(r.prototype.path = function (e) {
						var r = document.createElementNS(t, 'path');
						for (var n in e)
							e.hasOwnProperty(n) &&
								('path' === n
									? r.setAttributeNS(null, 'd', e.path)
									: 'klass' === n
									? r.setAttributeNS(null, 'class', e[n])
									: void 0 !== e[n] && r.setAttributeNS(null, n, e[n]));
						return this.append(r), r;
					}),
					(r.prototype.pathToBack = function (e) {
						var r = document.createElementNS(t, 'path');
						for (var n in e)
							e.hasOwnProperty(n) &&
								('path' === n
									? r.setAttributeNS(null, 'd', e.path)
									: 'klass' === n
									? r.setAttributeNS(null, 'class', e[n])
									: r.setAttributeNS(null, n, e[n]));
						return this.prepend(r), r;
					}),
					(r.prototype.lineToBack = function (e) {
						for (var r = document.createElementNS(t, 'line'), n = Object.keys(e), i = 0; i < n.length; i++)
							r.setAttribute(n[i], e[n[i]]);
						return this.prepend(r), r;
					}),
					(r.prototype.append = function (e) {
						this.currentGroup.length > 0 ? this.currentGroup[0].appendChild(e) : this.svg.appendChild(e);
					}),
					(r.prototype.prepend = function (e) {
						this.currentGroup.length > 0
							? this.currentGroup[0].appendChild(e)
							: this.svg.insertBefore(e, this.svg.firstChild);
					}),
					(r.prototype.setAttributeOnElement = function (e, t) {
						for (var r in t) t.hasOwnProperty(r) && e.setAttributeNS(null, r, t[r]);
					}),
					(r.prototype.moveElementToChild = function (e, t) {
						e.appendChild(t);
					}),
					(e.exports = r);
			},
			1185: function (e) {
				e.exports = '6.2.2';
			}
		}),
		(t = {}),
		(r = (function r(n) {
			var i = t[n];
			if (void 0 !== i) return i.exports;
			var a = (t[n] = { exports: {} });
			return e[n](a, a.exports, r), a.exports;
		})(1045)),
		r
	);
	var e, t, r;
});
