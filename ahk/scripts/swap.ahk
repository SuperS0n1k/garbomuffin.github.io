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

^m::
MouseMove, 652, 406
MouseGetPos, ireallydontcareaboutthexcoordinate, topy

loop
{
	MouseGetPos, mousex, mousey
	
	PixelGetColor, color, %mousex%, %mousey%
	Tooltip, %mousey%
	
	if color=0xFFFFFF
	{
	
		if (mousey > topy)
		{
			newy := mousey - 30
			Tooltip, a
		}
		else
		{
			newy := mousey + 30
			Tooltip, b
		}
		
		MouseMove, mousex, newy
		SendInput, {Space}
	}
}

; Reloading
^!r::Reload

; Exiting
^!e::ExitApp
