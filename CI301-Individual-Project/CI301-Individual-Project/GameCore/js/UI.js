﻿class UI {
    // This UI class is based on the https://github.com/Wolfkhan66/Phaser-First-Game-Tutorial repository in which i designed a system class to allow the dynamic creation of text and sprites as UI elements.
    // The code has been remodified and updated for this project.
    constructor() {
        console.log("Constructing UI Elements")
        this.elements = [];

        //MainMenu UI
        this.createText("SplashText", "MainMenu", game.width / 2, game.height / 2, "This is the Main Menu", 20)
        this.createText("SplashContinueText", "MainMenu", game.width / 2, game.height / 2 + 30, "click to continue", 20)
        this.addEvent("SplashContinueText", function () { ui.setScreen("AISelect") }, null);

        //AISelect UI
        this.createText("AISelectText", "AISelect", game.width / 2, game.height / 2, "This is the AISelect", 20)
        this.createText("AISelectContinueText", "AISelect", game.width / 2, game.height / 2 + 30, "click to continue", 20)
        this.addEvent("AISelectContinueText", function () { ui.setScreen("InGame") }, null);

        //InGame UI
        this.createText("InGameText", "InGame", game.width / 2, game.height / 2, "This is the InGame screen", 20)
        this.createText("InGameBackText", "InGame", game.width / 2, game.height / 2 + 30, "click to go back", 20)
        this.addEvent("InGameBackText", function () { ui.setScreen("MainMenu") }, null);
    }

    setScreen(screen) {
        console.log("Changing Screen to: " + screen);
        this.hideAll();
        switch (screen) {
            case "MainMenu":
                this.showUI("MainMenu");
                break;
            case "AISelect":
                this.showUI("AISelect");
                break;
            case "InGame":
                this.showUI("InGame");
                break;
            default:
                console.log(screen + " not found");
        }
    }

    createText(name, UI, x, y, string, size) {
        var textObject = game.add.text(x, y, string, {
            font: size + 'px Arial',
            fill: '#fff'
        });
        this.elements.push({ Name: name, UI: UI, Type: "Text", Object: textObject });
    }

    createSprite(name, UI, x, y, width, height, image) {
        var sprite = game.add.sprite(x, y, image);
        sprite.width = width;
        sprite.height = height;
        this.elements.push({ Name: name, UI: UI, Type: "Sprite", Object: sprite });
    }

    addEvent(name, eventDown, eventUp) {
        this.elements.forEach(function (element) {
            if (element.Name == name) {
                if (eventDown != null) {
                    element.Object.inputEnabled = true;
                    element.Object.events.onInputDown.add(eventDown, this);
                }
                if (eventUp != null) {
                    element.Object.inputEnabled = true;
                    element.Object.events.onInputUp.add(eventUp, this);
                }
            }
        });
    }

    showUI(UIType) {
        this.elements.forEach(function (element) {
            if (element.UI == UIType) {
                element.Object.visible = true;
            }
        });
    }

    hideAll() {
        this.elements.forEach(function (element) {
                element.Object.visible = false;
        });
    }
}