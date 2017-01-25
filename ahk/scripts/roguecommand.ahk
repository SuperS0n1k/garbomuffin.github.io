#NoEnv
#MaxHotkeysPerInterval 99000000
#HotkeyInterval 99000000
#KeyHistory 0
ListLines Off
Process, Priority, , A
SetBatchLines, -1
SetKeyDelay, -1, -1
SetMouseDelay, -1
SetDefaultMouseSpeed, 0
SetWinDelay, -1
SetControlDelay, -1
SendMode Input

#SingleInstance force

CoordMode, Pixel, Screen
CoordMode, Mouse, Screen

loop
{
	PixelGetColor, color, 734, 326
	
	if color=0xAE6342 ; light
	{
		MouseMove, 671, 350
	}
	else if color=0x984034 ; dark
	{
		MouseMove, 671, 500
	}
}

; Reloading it for testing new stuff.
^!r::Reload

; Exiting, for obvious reasons.
^!e::ExitApp
