package garbomuffin.rainbowchat;

import org.bukkit.*;
import org.bukkit.event.*;
import org.bukkit.event.player.*;

public final class ChatEvent implements Listener {
    private int index = 0;
    private final ChatColor[] RAINBOW = {
        ChatColor.RED,
        ChatColor.GOLD,
        ChatColor.YELLOW,
        ChatColor.GREEN,
        ChatColor.DARK_GREEN,
        ChatColor.AQUA,
        ChatColor.BLUE,
        ChatColor.DARK_PURPLE,
        ChatColor.LIGHT_PURPLE
    };
    
    @EventHandler
    private void onChatEvent(AsyncPlayerChatEvent event){
        event.setFormat(
                ChatColor.RESET +
                "<" +
                RAINBOW[index] + 
                "%s" +
                ChatColor.RESET +
                "> %s"
        );
        
        index++;
        if (index == RAINBOW.length){
            index = 0;
        }
    }
}
