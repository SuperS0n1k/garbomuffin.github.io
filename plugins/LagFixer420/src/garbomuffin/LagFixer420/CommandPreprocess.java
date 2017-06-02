package garbomuffin.LagFixer420;

import org.bukkit.ChatColor;
import org.bukkit.event.*;
import org.bukkit.event.player.*;

public class CommandPreprocess implements Listener {
    // this can't be defined in plugin.yml or whatever because spigot:tps takes priority
    @EventHandler
    public void PlayerCommand(PlayerCommandPreprocessEvent event) {
        if (event.getMessage().equalsIgnoreCase("/tps") || event.getMessage().toLowerCase().startsWith("/tps ")){
            // make sure they have access to the command
            if (!event.getPlayer().hasPermission("bukkit.command.tps") && !event.getPlayer().isOp()) return;
            
            event.getPlayer().sendMessage(
                    ChatColor.GOLD + "TPS from last 1m, 5m, 15m: "
                    + ChatColor.GREEN +
                    "*20.0, *20.0, *20.0"
            );
            event.setCancelled(true);
        }
    }
}
