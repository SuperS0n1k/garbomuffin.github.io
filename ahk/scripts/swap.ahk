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

; ctrl+m === start
^m::
MouseMove, 652, 406
MouseGetPos, ireallydontcareaboutthexcoordinate, topy

loop
{
	MouseGetPos, mousex, mousey
	
	PixelGetColor, color, %mousex%, %mousey%
	; Tooltip, %mousey%
	
	if color=0xFFFFFF
	{
	
		if (mousey > topy)
		{
            newy := mousey - 30
		}
		else
		{
			newy := mousey + 30
		}
		
		MouseMove, mousex, newy
        
        PixelGetColor, color, %mousex%, %newy%
        if color=0xFFFFFF
        {
            loop
            {
                PixelGetColor, color, %mousex%, %newy%
                if color=0xFFFFFF
                {
                    
                }
                else
                {
                    Break
                }
            }
        }
        
		SendInput, {Space down}
	}
}

; ctrl+shift+r === reload
^!r::Reload

; ctrl+shift+e === stop
^!e::ExitApp
