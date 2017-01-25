; Make sure there's only ever 1 instance open.
#SingleInstance force

; Time to move the mouse to the right spot and get it started.
Sleep, 1000

; The actual stuff.
Loop
{
	MouseMove, 100, 0, 10, R
	MouseMove, 0, 100, 10, R
	MouseMove, -100, 0, 10, R
	MouseMove, 0, -100, 10, R
}

; Reloading it for testing new stuff.
^!r::Reload

; Exiting, for obvious reasons.
^!e::ExitApp
