package com.garbomuffin.ping;

import org.bukkit.entity.Player;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class PingGetter {
    private final PingPlugin plugin;

    public PingGetter(PingPlugin plugin) {
        this.plugin = plugin;
    }

//    https://stackoverflow.com/a/28703938
    private String getVersion() {
        final String packageName = this.plugin.getServer().getClass().getPackage().getName();
        return packageName.substring(packageName.lastIndexOf('.') + 1);
    }

    public int getPing(Player player)
            throws NoSuchFieldException, IllegalAccessException, InvocationTargetException, NoSuchMethodException, ClassNotFoundException {

//        In order to support all versions of Bukkit a lot of dirty stuff has to be done.

//        Get the NMS version
        String version = this.getVersion();

//        Cast the player into a CraftPlayer which has a method we need to get the EntityPlayer
//        Equivalent to: CraftPlayer craftPlayer = (CraftPlayer) player;
        Class craftPlayerClass = Class.forName("org.bukkit.craftbukkit." + version + ".entity.CraftPlayer");
        Object craftPlayer = craftPlayerClass.cast(player);

//        Get the "getHandle()" method and invoke it on the CraftPlayer object
//        Equivalent to: EntityPlayer entityPlayer = craftPlayer.getHandle();
//        This returns an EntityPlayer from net.minecraft.server
        Method getHandleMethod = craftPlayerClass.getMethod("getHandle");
        getHandleMethod.setAccessible(true);
        Object entityPlayerObject = getHandleMethod.invoke(craftPlayer);

//        Get the "ping" parameter of the EntityPlayer we got in the previous step
//        Equivalent to: int ping = entityPlayer.ping;
        Class entityPlayerClass = Class.forName("net.minecraft.server." + version + ".EntityPlayer");
        Field pingField = entityPlayerClass.getField("ping");

//        And finally return the ping
        return (int) pingField.get(entityPlayerObject);
    }
}
