package garbomuffin.ping.commands;

import org.bukkit.command.CommandSender;
import org.bukkit.entity.*;
import org.bukkit.craftbukkit.v1_12_R1.entity.*;

public class Ping extends BaseCommand {
    @Override
    public void command(CommandSender cs, String[] args){
        if (args.length == 0){
            if (cs.hasPermission("ping.self") || cs.isOp() || !(cs instanceof Player)){
                if (isPlayer(cs)){
                    cs.sendMessage(getConfigEntry("your-ping")
                            .format("ping", ping(cs))
                            .toString()
                    );
                }else{
                    cs.sendMessage(getConfigEntry("specify-player").toString());
                }
            }else{
                cs.sendMessage(getConfigEntry("no-permission-self").toString());
            }
        }else{
            if (cs.hasPermission("ping.other") || cs.isOp() || !(cs instanceof Player)){
                Player player = getPlayer(args[0]);
                if (player != null && player.isOnline()){
                    cs.sendMessage(getConfigEntry("player-ping")
                            .format("ping", ping(player))
                            .format("player", player.getName())
                            .toString()
                    );
                }else{
                    cs.sendMessage(getConfigEntry("not-online")
                            .format("player", args[0])
                            .toString()
                    );
                }
            }else{
                cs.sendMessage(getConfigEntry("no-permission-other")
                        .format("player", args[0])
                        .toString());
            }
        }
    }
    
    private int ping(CommandSender cs){
        Player player = (Player) cs;
        return ((CraftPlayer) player).getHandle().ping;
    }
}
