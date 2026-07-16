window.DashboardConfiguration = {
    "dashboardTitle": "Utopia Status Monitor",
    "footerText": "Copyright © <a target=\"_blank\" href=\"https://www.utopiaxc.com/\">UtopiaXC</a>",
    "defaultView": "card",
    "dataSources": [
        {
            "sourceType": "kuma-server",
            "sourceName": "Kuma - JP TSUKUBA",
            "refreshInterval": 300,
            "announcement": "Kuma - JP TSUKUBA 节点使用 [Uptime Kuma](https://uptimekuma.org/) 作为探针，运行于日本茨城县筑波市的服务器上。  \n本节点用于监控由海外发出的请求是否可达。  ",
            "serverUrl": "https://jp-kuma.utopiaxc.com",
            "rangeDays": 7
        },
        {
            "sourceType": "kuma-server",
            "sourceName": "Kuma - CN DALIAN",
            "refreshInterval": 300,
            "announcement": "Kuma - CN DALIAN 节点使用 [Uptime Kuma](https://uptimekuma.org/) 作为探针，运行于中国辽宁省大连市的服务器上。  \n本节点用于监控由中国大陆发出的请求是否可达。  \n**受到其他软件严重漏洞影响，本监控服务器已暂时停机，恢复时间待定**",
            "serverUrl": "https://cn-kuma.utopiaxc.com",
            "rangeDays": 7
        },
        {
            "sourceType": "uptimerobot",
            "sourceName": "Uptime Robot",
            "refreshInterval": 30000,
            "announcement": "本节点使用 [Uptime Robot ](https://uptimerobot.com/) 作为探针。  \n用于托底冗余。  ",
            "apiKey": "ur1096536-259a5b212183d4af8a668d3d",
            "rangeDays": 7
        }
    ]
};