package com.garbomuffin.ping;

import org.bukkit.ChatColor;
import org.bukkit.entity.Player;
import org.bukkit.metadata.FixedMetadataValue;
import org.bukkit.plugin.java.JavaPlugin;

import java.util.Date;

public class PingPlugin extends JavaPlugin {
    @Override
    public void onEnable() {
        this.saveDefaultConfig();

//        commands
        this.getCommand("ping").setExecutor(new PingCommand(this));

        this.getServer().getPluginManager().registerEvents(new PingListeners(this), this);

//        if /reload is used then handle online players as if they joined for the first time
//        /reload resets metadata and as a result all join times turn into null which is bad
        for (Player player : this.getServer().getOnlinePlayers()) {
            this.handlePlayerJoin(player);
        }
    }

    public void handlePlayerJoin(Player player) {
        Date date = new Date();
        long time = date.getTime();
        player.setMetadata("PING_FIRST_JOIN", new FixedMetadataValue(this, time));
    }

    public String getConfigString(String path) {
        String raw = String.valueOf(this.getConfig().get(path));
        return ChatColor.translateAlternateColorCodes('&', raw);
    }

    public int getRecentJoinTimeFrame() {
        return this.getConfig().getInt("recent-join-time");
    }
}
