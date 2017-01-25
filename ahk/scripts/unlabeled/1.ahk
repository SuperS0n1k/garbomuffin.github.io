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

MouseMove, 635, 450

interval = 0

loop
{
	MouseGetPos, mousex, mousey
	
	PixelGetColor, color, %mousex%, %mousey%
	Tooltip, %mousey%
	
	if color=0xFFB299
	{
		if mousey < 350
		{
			Tooltip, a
			newy := mousey + 50
		}
		else
		{
			newy := mousey - 50
		}
		MouseMove, %mousex%, %newy%
	}
	
	;
	;if color=0xAE6342 ; light
	;{
	;	MouseMove, 671, 350
	;}
	;else if color=0x984034 ; dark
	;{
	;	MouseMove, 671, 500
	;}
}

; Reloading
^!r::Reload

; Exiting
^!e::ExitApp
