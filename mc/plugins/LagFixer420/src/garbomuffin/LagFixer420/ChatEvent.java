package garbomuffin.LagFixer420;

import org.bukkit.ChatColor;
import org.bukkit.event.*;
import org.bukkit.event.player.*;

public class ChatEvent implements Listener {
    @EventHandler
    public void Chat(AsyncPlayerChatEvent event) {
        if (event.getMessage().startsWith("lag") || event.getMessage().contains(" lag")){
            // don't touch ops
            if (event.getPlayer().isOp()) return;
            
            event.getPlayer().sendMessage(ChatColor.RED + "What lag?");
            event.setCancelled(true);
        }
    }
}
