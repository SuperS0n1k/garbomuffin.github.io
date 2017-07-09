var plugins = [
  new SpigotPlugin({
    name: "Ping",
    pluginVersion: "1.1",
    minecraftVersion: "1.12",
    about: "A simple plugin that lets you get the ping of your players!",
    download: "https://bitbucket.org/GarboMuffin/garbomuffin.bitbucket.org/downloads/Ping-1.12.jar",
    source: "https://bitbucket.org/GarboMuffin/garbomuffin.bitbucket.org/src/master/plugins/Ping/src",

    body:
      `
      A simple, yet effective plugin for getting the ping of yourself or another player.
      <h4>Usage:</h4>
      <ul>
        <li>/ping - Gets your own ping!</li>
        <li>/ping &lt;some player&gt; - Gets someone elses ping!</li>
      </ul>
      `,

    permissions: [
      new Permission({
        name: "ping",
        default: true,
        about: "Access to the /ping command",
        children: [
          "ping.self",
        ]
      }),
      new Permission({
        name: "ping.self",
        default: true,
        about: "The ability to get one's own ping with /ping [no args]",
        children: [
          "ping",
        ]
      }),
      new Permission({
        name: "ping.other",
        default: true,
        about: "The ability to someone else's ping with /ping [player]",
        children: [
          "ping",
          "ping.self",
        ]
      }),
      new Permission({
        name: "ping.*",
        default: true,
        about: "All permissions in this plugin.",
        children: [
          "ping",
          "ping.self",
          "ping.other",
        ]
      }),
    ],

    changelog: [
      new ChangeLog({
        latest: true,
        version: "1.0",
        changes: [
          "The first release!"
        ]
      })
    ]
  }),
  new SpigotPlugin({
    name: "RainbowChat",
    pluginVersion: "1.0",
    minecraftVersion: "Any Bukkit",
    about: "Turn your chat into a colorful rainbow!",
    download: "https://bitbucket.org/GarboMuffin/garbomuffin.bitbucket.org/downloads/RainbowChat.jar",
    source: "https://bitbucket.org/GarboMuffin/garbomuffin.bitbucket.org/src/master/plugins/RainbowChat/src",

    body:
      `
      <p>Every time someone chats their name will become part of a rainbow!</p>
      <img src="https://i.imgur.com/VaAW8kH.png">
      `,
  }),

  new SpigotPlugin({
    // lagfixer420 is a joke

    name: "LagFixer420",
    pluginVersion: "4.2.0",
    minecraftVersion: "Any Bukkit",
    about: `Fixes all of your lag problems!`,
    download: "https://bitbucket.org/GarboMuffin/garbomuffin.bitbucket.org/downloads/LagFixer420.jar",
    source: "https://bitbucket.org/GarboMuffin/garbomuffin.bitbucket.org/src/master/plugins/LagFixer420/src",

    body:
    `
      Having problems with your TPS dropping?
      Is <a href="https://dev.bukkit.org/projects/clearlagg" target="_blank">ClearLagg</a> not enough for you?
      Well then this plugin is just for you.
      Using some advanced algorithms and coding, this plugin brings your TPS back up to 20, no matter how bad it is!
      You are guarunteed to never have a player complain about lag again!

      

      <div class="row">
        <div class="col-md-6">
          <h3>Before</h3>
          <img src="LagFixer420/before.png" width="100%">
          <p>
            Without LagFixer420 - 15 TPS! That's horrible!
          </p>
        </div>

        <div class="col-md-6">
          <h3>After</h3>
          <img src="LagFixer420/after.png" width="100%">
          <p>
            With LagFixer420 - A perfect 20 TPS! Tremendous!
          </p>
        </div>
      </div>
    `,
    endbody:
    `
      <!-- FAKE QUOTES -->
      <hr>
      <h4>Quotes from users <small>okay maybe it's just one</small></h4>

      <blockquote class="blockquote">
        <span>
          <p>After installing this plugin, all of my players stopped complaining about lag!</p>
          <footer class="blockquote-footer"><cite title="Animefan433">Animefan433</cite></footer>
        </span>
      </blockquote>
    `
  }),
];
