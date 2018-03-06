class UI {
    // This UI class is based on the https://github.com/Wolfkhan66/Phaser-First-Game-Tutorial repository in which i designed a system class to allow the dynamic creation of text and sprites as UI elements.
    // The code has been remodified and updated for this project.
    constructor() {
        console.log("Constructing UI Elements")
        this.elements = [];
        
        //MainMenu UI
        
        //AISelect UI

        //InGame UI
    }

    setScreen(screen) {
        hideAll();
        switch (screen) {
            case "MainMenu":
                showUI("MainMenu");
                break;
            case "AISelect":
                showUI("AISelect");
                break;
            case "InGame":
                showUI("InGame");
                break;
            default:
                console.log(screen + " not found");
        }
    }

    createText(name, UI, x, y, string, size) {
        var textObject = game.add.text(0, 0, string, {
            font: size + 'px Old English Text MT',
            fill: '#fff'
        });
        this.elements.push({ Name: name, UI: UI, Type:"Text", Object: textObject });
    }

    createSprite(name, UI, x, y, width, height, image) {
        var sprite = game.add.sprite(0, 0, image);
        sprite.width = width;
        sprite.height = height;
        this.elements.push({ Name: name, UI: UI, Type:"Sprite", Object: sprite });
    }

    addEventListener(name, eventDown, eventUp) {
        this.elements.forEach(function (object) {
            if (object.Name == name) {
                if (eventDown != null) {
                    object.inputEnabled = true;
                    object.events.onInputDown.add(eventDown, this);
                }
                if (eventUp != null) {
                    object.inputEnabled = true;
                    object.events.onInputUp.add(eventUp, this);
                }
            }
        });
    }

    showUI(UIType) {
        this.elements.forEach(function (object) {
            if (object.UI == UIType) {
                if (object.type == "Text") { object.Text.visible = true; }
                if (object.type == "Sprite") { object.Sprite.visible = true;  }
            }
        });
    }

    hideAll() {
        this.elements.forEach(function (object) {
            if (object.UI == UIType) {
                if (object.type == "Text") { object.Text.visible = false; }
                if (object.type == "Sprite") { object.Sprite.visible = false; }
            }
        });
    }
}