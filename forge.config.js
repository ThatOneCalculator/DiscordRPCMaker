module.exports = {
  packagerConfig: {
    executableName: "Discord RPC Maker",
    icon: "./assets/icon",
    junk: true,
    appCategoryType: "public.app-category.utilities",
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        title: "Discord RPC Maker",
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        name: "Discord RPC Maker",
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          categories: ["Utility"],
          icon: "./assets/icon.png",
          name: "Discord RPC Maker",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          categories: ["Utility"],
          icon: "./assets/icon.png",
          name: "Discord RPC Maker",
        },
      },
    },
  ],
};
