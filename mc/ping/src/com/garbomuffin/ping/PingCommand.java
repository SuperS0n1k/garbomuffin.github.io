package com.garbomuffin.ping;

import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.metadata.MetadataValue;

import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

public class PingCommand implements CommandExecutor {
    private final PingPlugin plugin;
    private final PingGetter pingGetter;

    public PingCommand(PingPlugin plugin) {
        this.plugin = plugin;
        this.pingGetter = new PingGetter(plugin);
    }

    private Player getTargetPlayer(CommandSender cs, String[] args) {
        if (args.length > 0) {
            String name = args[0];
            return this.plugin.getServer().getPlayerExact(name);
        } else if (cs instanceof Player) {
            return (Player) cs;
        } else {
//            Running from console without specifying a player
            return null;
        }
    }

    private long getJoinTime(Player player) {
        List<MetadataValue> metadata = player.getMetadata("PING_FIRST_JOIN");
        return metadata.get(0).asLong();
    }

    private int getTimeSinceJoin(Player player) {
        long joinTime = this.getJoinTime(player);
        long currentTime = (new Date()).getTime();
        long time = (currentTime - joinTime) / 1000;
        return (int) time;
    }

    public boolean onCommand(CommandSender cs, Command command, String label, String[] args) {
        Player targetPlayer = this.getTargetPlayer(cs, args);

//        Offline or no player specified when run from console
        if (targetPlayer == null) {
            if (args.length == 0) {
                cs.sendMessage(this.plugin.getConfigString("console-no-player"));
            } else {
                cs.sendMessage(this.plugin.getConfigString("not-online").replaceAll("%PLAYER%", args[0]));
            }
            return true;
        }

//        Get the ping and handle any of the many errors that could happen
        int ping;
        try {
            ping = this.pingGetter.getPing(targetPlayer);
        } catch (Exception e) {
            Logger logger = this.plugin.getLogger();
            logger.severe("COULD NOT GET PING OF A PLAYER");
            logger.severe("That probably means this version is not supported");
            logger.severe("Stack trace for debugging:");
            e.printStackTrace();

            cs.sendMessage(ChatColor.DARK_RED + "An error occurred. Check the logs for more details.");
            return true;
        }

//        Show warning if player recently joined
//        Do this after getting the ping to avoid showing this when an error occurs
        int timeSince = this.getTimeSinceJoin(targetPlayer);
        if (this.plugin.getRecentJoinTimeFrame() >= 0 && timeSince < this.plugin.getRecentJoinTimeFrame()) {
            String message;
            if (args.length == 0) {
                message = this.plugin.getConfigString("recent-join-warning-self");
            } else {
                message = this.plugin.getConfigString("recent-join-warning");
            }
            message = message.replaceAll("%PLAYER%", targetPlayer.getDisplayName());
            cs.sendMessage(message);
        }

        String message;
        if (args.length == 0) {
            message = this.plugin.getConfigString("self-result");
        } else {
            message = this.plugin.getConfigString("other-result");
        }

        message = message.replaceAll("%PING%", String.valueOf(ping));
        message = message.replaceAll("%PLAYER%", targetPlayer.getDisplayName());
        cs.sendMessage(message);

        return true;
    }
}
