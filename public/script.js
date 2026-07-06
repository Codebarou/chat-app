$(function () {
    var socket = io();
    var pseudo = "";
    var currentUserId;

    socket.on("connect", function () {
        currentUserId = socket.id;
    });

    $("#formPseudo").submit(function (e) {
        e.preventDefault();

        pseudo = $("#pseudoInput").val();
        // si le pseudo est vide
        if (pseudo.trim() === "") {
            alert("Veuillez entrer un pseudo");
            return false;
        } else {
            socket.emit("pseudo joined", {
                pseudo: pseudo,
                userId: currentUserId,
            });

            $("#registerDiv").addClass("hidden");
            $("#chatScreen").removeClass("hidden");
            $("#chatScreen").addClass("flex");
        }
    });

    $("#leftBtn").click(function () {
        $("#registerDiv").removeClass("hidden");
        $("#chatScreen").addClass("hidden");
        $("#chatScreen").removeClass("flex");
    });

    // à l'envoie du message alors :
    $("#formMsg").submit(function (e) {
        e.preventDefault();

        socket.emit("chat message", {
            message: $("#msg").val(),
            pseudo: pseudo,
            userId: currentUserId,
        });
        $("#msg").val("");

        return false;
    });

    // Gestion de la réception des messages du serveur
    socket.on("chat message", function (data) {
        if (data.message.trim() !== "") {
            var newMessage = $("<p>").text(data.message);
            var pseudoElement;

            if (data.userId === currentUserId) {
                // client
                newMessage.addClass(
                    "mb-5 ml-auto flex w-fit max-w-80 flex-col break-words rounded bg-teal-600 p-2.5",
                );
                pseudoElement = $("<span>").text("Vous :");
                pseudoElement.addClass("text-right font-bold text-white");
            } else {
                // autres pov client
                newMessage.addClass(
                    "mb-5 mr-auto flex w-fit max-w-80 flex-col break-words rounded bg-blue-400 p-2.5",
                );
                pseudoElement = $("<span>").text(data.pseudo + " :");
                pseudoElement.addClass("text-left font-bold text-white");
            }

            newMessage.prepend(pseudoElement);

            $("#chat").append(newMessage);
            $("#msg").blur();
        }

        // scroll bar dynamique
        var chatContainer = $("#chat");
        chatContainer.scrollTop(chatContainer[0].scrollHeight);
    });

    socket.on("pseudo joined", function (data) {
        var newPseudo = $("<p>");
        newPseudo.addClass("mb-5 text-center font-medium italic");
        if (data.userId === currentUserId) {
            newPseudo.addClass("text-green-700");
            newPseudo.text("Vous avez rejoins en tant que " + data.pseudo);
        } else {
            newPseudo.addClass("text-black");
            newPseudo.text(data.pseudo + " a rejoins la discussion");
        }
        $("#chat").append(newPseudo);
    });
});