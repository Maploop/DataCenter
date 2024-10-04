var shortcuts = [];
var current_modal = null;

onload = (event) => {
    console.log("loading...");
    add_shortcut_fn("F7", display_acc_confirm);
};

const display_acc_confirm = () => {
    con_say("DISPLAY BOOTING...");
    display_modal_s("login_modal");
};

const modal_close_click = () => {
    console.log('clic');
    current_modal.style.display = "none";
    current_modal = null;
};

const display_modal_s = (id) => {
    var modal = document.getElementById(id);
    modal.style.display = "block";
    current_modal = modal;
};

const add_shortcut_fn = (key, callback) => {
    shortcuts.push({
        key: key,
        callback: callback
    });
};

addEventListener('keydown', (event) => {
    if (!event.code.startsWith("F")) return;
    for (data of shortcuts) {
        if (data.key === event.code)
            data.callback();
    }
});