var InventoryOption = "120, 10, 20";

var totalWeight = 0;
var totalWeightOther = 0;

var playerMaxWeight = 0;
var otherMaxWeight = 0;

var otherLabel = "";

var ClickedItemData = {};

var SelectedAttachment = null;
var AttachmentScreenActive = false;
var ControlPressed = false;
var disableRightMouse = false;
var selectedItem = null;

var IsDragging = false;

var tems = [];

tems.id = 0;

$(document).on('keydown', function() {
    switch(event.keyCode) {
        case 27: // ESC
            Inventory.Close();
            break;
        case 113: // ESC
            Inventory.Close();
            break;
        case 9: // TAB
            Inventory.Close();
            break;
        case 17: // TAB
            ControlPressed = true;
            break;
    }
});

$(document).on('keyup', function(){
    switch(event.keyCode) {
        case 17: // TAB
            ControlPressed = false;
            break;
    }
});

$(document).on("mouseenter", ".item-slot", function(e){
    e.preventDefault();
    if ($(this).data("item") != null) {
        $(".ply-iteminfo-container").fadeIn(150);
        FormatItemInfo($(this).data("item"));
    } else {
        $(".ply-iteminfo-container").fadeOut(100);
    }
});

// Autostack Quickmove
function GetFirstFreeSlot($toInv, $fromSlot) {
    var retval = null;
    $.each($toInv.find('.item-slot'), function(i, slot){
        if ($(slot).data('item') === undefined) {
            if (retval === null) {
                retval = (i + 1);
            }
        }
    });
    return retval;
}

function CanQuickMove() {
    var otherinventory = otherLabel.toLowerCase();
    var retval = true;
    // if (otherinventory == "grond") {
    //     retval = false
    // } else if (otherinventory.split("-")[0] == "dropped") {
    //     retval = false;
    // }
    if (otherinventory.split("-")[0] == "player") {
        retval = false;
    }
    return retval;
}

$(document).on('mousedown', '.item-slot', function(event){
    switch(event.which) {
        case 3:
            fromSlot = $(this).attr("data-slot");
            fromInventory = $(this).parent();

            if ($(fromInventory).attr('data-inventory') == "player") {
                toInventory = $(".other-inventory");
            } else {
                toInventory = $(".player-inventory");
            }
            toSlot = GetFirstFreeSlot(toInventory, $(this));
            if ($(this).data('item') === undefined) {
                return;
            }
            toAmount = $(this).data('item').count;
            if (ControlPressed) {
                if (toAmount > 1) {
                    toAmount = Math.round(toAmount / 2)
                }
            }
            if (CanQuickMove()) {
                if (toSlot === null) {
                    InventoryError(fromInventory, fromSlot);
                    return;
                }
                if (fromSlot == toSlot && fromInventory == toInventory) {
                    return;
                }
                if (toAmount >= 0) {
                    if (updateweights(fromSlot, toSlot, fromInventory, toInventory, toAmount)) {
                        swap(fromSlot, toSlot, fromInventory, toInventory, toAmount);
                    }
                }
            } else {
                InventoryError(fromInventory, fromSlot);
            }
            break;
    }
});



function renk(){
	
	 $("#qbus-inventory").css({"display":"none"})
	 $(".tema-container").css({"display":"block"})
	  $(".tema-container").animate({
            left: 0+"vw"
        }, 200);
}

function kiyafet(){
	
	 $("#qbus-inventory").css({"display":"none"})
	 $(".kiyafet-container").css({"display":"block"})
	  $(".kiyafet-container").animate({
            left: 0+"vw"
        }, 200);
}

function kiyafet_kapat(){
	
	
	  $(".kiyafet-container").animate({
            left: 1000+"vw"
        }, 200);
	 $("#qbus-inventory").css({"display":"block"})
	 $(".kiyafet-container").css({"display":"none"})
}

function renk_kapat(){
	
	  $(".tema-container").animate({
            left: 1000+"vw"
        }, 200);
	 $("#qbus-inventory").css({"display":"block"})
	 $(".tema-container").css({"display":"none"})
	
}





function tema(x){
	 
	 
if(x == 0){
 
tems.id = x;	
tems.slot = {"border-top":"1px solid rgba(66, 66, 66, 0.23)" , "background-color":"rgba(0, 0, 0, 0.27)" };
tems.slot_p = {"color":"rgb(247, 247, 247)"};
tems.item_slot = {"background-color":"rgba(0, 0, 0, 0.27)"};
tems.inv_opt = {"background-color":"rgba(20, 20, 20, 0.5)", "color":"white"};

}
	
if(x == 1){
	
tems.id = x;	
tems.slot = {"border-top":"1px solid #dedede" , "background-color":"white" };//LABEL
tems.slot_p = {"color":"black"};
tems.item_slot = {"background-color":"rgb(255 255 255 / 50%)"};
tems.inv_opt = {"background-color":"rgb(255 255 255 / 50%)", "color":"black"};
 
}


if(x == 2){
	
tems.id = x;	
tems.slot = {"border-top":"1px solid rgb(236 55 55 / 28%)" , "background-color":"rgb(255 57 57 / 25%)" };//LABEL
tems.slot_p = {"color":"white"};
tems.item_slot = {"background-color":"rgb(206 60 60 / 20%)"};
 
tems.inv_opt = {"background-color":"rgb(255 57 57 / 25%)", "color":"white"};
 
}



if(x == 3){
	
tems.id = x;	
tems.slot = {"border-top":"1px solid rgb(255 0 129 / 20%)" , "background-color":"rgb(255 0 129 / 20%)" };//LABEL
tems.slot_p = {"color":"white"};
tems.item_slot = {"background-color":"rgb(255 0 129 / 20%)"};
 
tems.inv_opt = {"background-color":"rgb(255 0 129 / 20%)", "color":"white"};
 
}

if(x == 4){
	
tems.id = x;	
tems.slot = {"border-top":"1px solid rgb(0 0 0 / 50%)" , "background-color":"rgb(0 0 0 / 50%)" };//LABEL
tems.slot_p = {"color":"white"};
tems.item_slot = {"background-color":"rgb(0 0 0 / 50%)"};
 
tems.inv_opt = {"background-color":"rgb(0 0 0 / 50%)", "color":"white"};
 
}
	
	
	
if(x == 5){
	
tems.id = x;	
tems.slot = {"border-top":"1px solid rgb(57 255 237 / 25%)" , "background-color":"rgb(57 255 237 / 25%)" };//LABEL
tems.slot_p = {"color":"white"};
tems.item_slot = {"background-color":"rgb(57 255 237 / 25%)"};
 
tems.inv_opt = {"background-color":"rgb(57 255 237 / 25%)", "color":"white"};
 
}

if(x == 6){
	
tems.id = x;	
tems.slot = {"border-top":"1px solid rgb(66 66 66 / 55%)" , "background-color":"rgb(66 66 66 / 55%)" };//LABEL
tems.slot_p = {"color":"white"};
tems.item_slot = {"background-color":"rgb(66 66 66 / 55%)"};
 
tems.inv_opt = {"background-color":"rgb(66 66 66 / 55%)", "color":"white"};
 
}


if(x == 7){
	
tems.id = x;	
tems.slot = {"border-top":"1px solid rgb(12 80 39 / 55%)" , "background-color":"rgb(12 80 39 / 55%)" };//LABEL
tems.slot_p = {"color":"white"};
tems.item_slot = {"background-color":"rgb(12 80 39 / 55%)"};
 
tems.inv_opt = {"background-color":"rgb(12 80 39 / 55%)", "color":"white"};
 
}
	
		$(".item-slot-label p").css(tems.slot_p);
		$(".item-slot-label").css(tems.slot);
		$(".item-slot").css(tems.item_slot);
		$(".inv-option-item").css(tems.inv_opt);
		
		
		 renk_kapat();
	
}


$(document).on("click", ".item-slot", function(e){
    e.preventDefault();
    var ItemData = $(this).data("item");

    if (ItemData !== null && ItemData !== undefined) {
        if (ItemData.name !== undefined) {
            if ((ItemData.name).split("_")[0] == "weapon") {
                if (!$("#weapon-attachments").length) {
                    // if (ItemData.info.attachments !== null && ItemData.info.attachments !== undefined && ItemData.info.attachments.length > 0) {
                    $(".inv-options-list").append('<div class="inv-option-item" id="weapon-attachments"><p>PARCALAR</p></div>');
                    $("#weapon-attachments").hide().fadeIn(250);
                    ClickedItemData = ItemData;
                    // }
                } else if (ClickedItemData == ItemData) {
                    $("#weapon-attachments").fadeOut(250, function(){
                        $("#weapon-attachments").remove();
                    });
                    ClickedItemData = {};
                } else {
                    ClickedItemData = ItemData;
                }
            } else {
                ClickedItemData = {};
                if ($("#weapon-attachments").length) {
                    $("#weapon-attachments").fadeOut(250, function(){
                        $("#weapon-attachments").remove();
                    });
                }
            }
        } else {
            ClickedItemData = {};
            if ($("#weapon-attachments").length) {
                $("#weapon-attachments").fadeOut(250, function(){
                    $("#weapon-attachments").remove();
                });
            } 
        }
    } else {
        ClickedItemData = {};
        if ($("#weapon-attachments").length) {
            $("#weapon-attachments").fadeOut(250, function(){
                $("#weapon-attachments").remove();
            });
        } 
    }
});

$(document).on('click', '.weapon-attachments-back', function(e){
    e.preventDefault();
    $("#qbus-inventory").css({"display":"block"});
    $("#qbus-inventory").animate({
        left: 0+"vw"
    }, 200);
    $(".weapon-attachments-container").animate({
        left: -100+"vw"
    }, 200, function(){
        $(".weapon-attachments-container").css({"display":"none"});
    });
    AttachmentScreenActive = false;
});

function FormatAttachmentInfo(data) {
    $.post("http://qb_inventory/GetWeaponData", JSON.stringify({
        weapon: data.name,
        ItemData: ClickedItemData
    }), function(data){
        var AmmoLabel = "9mm";
        var Durability = 100;
        if (data.WeaponData.ammotype == "AMMO_RIFLE") {
            AmmoLabel = "7.62"
        } else if (data.WeaponData.ammotype == "AMMO_SHOTGUN") {
            AmmoLabel = "12 kalibre"
        }
        if (ClickedItemData.info.quality !== undefined) {
            Durability = ClickedItemData.info.quality;
        }

        $(".weapon-attachments-container-title").html(data.WeaponData.label + " | " + AmmoLabel);
        $(".weapon-attachments-container-description").html(data.WeaponData.description);
        $(".weapon-attachments-container-details").html('<span style="font-weight: bold; letter-spacing: .1vh;">Seri Numarası</span><br> ' + ClickedItemData.info.serie + '<br><br><span style="font-weight: bold; letter-spacing: .1vh;">Durability - ' + Durability.toFixed() + '% </span> <div class="weapon-attachments-container-detail-durability"><div class="weapon-attachments-container-detail-durability-total"></div></div>')
        $(".weapon-attachments-container-detail-durability-total").css({
            width: Durability + "%"
        });
        $(".weapon-attachments-container-image").attr('src', './attachment_images/' + data.WeaponData.name + '.png');
        $(".weapon-attachments").html("");

        if (data.AttachmentData !== null && data.AttachmentData !== undefined) {
            if (data.AttachmentData.length > 0) {
                $(".weapon-attachments-title").html('<span style="font-weight: bold; letter-spacing: .1vh;">Parcalar</span>');
                $.each(data.AttachmentData, function(i, attachment){
                    var WeaponType = (data.WeaponData.ammotype).split("_")[1].toLowerCase();
                    $(".weapon-attachments").append('<div class="weapon-attachment" id="weapon-attachment-'+i+'"> <div class="weapon-attachment-label"><p>' + attachment.label + '</p></div> <div class="weapon-attachment-img"><img src="./images/' + WeaponType + '_' + attachment.attachment + '.png"></div> </div>')
                    attachment.id = i;
                    $("#weapon-attachment-"+i).data('AttachmentData', attachment)
                });
            } else {
                $(".weapon-attachments-title").html('<span style="font-weight: bold; letter-spacing: .1vh;">Bu silah eklenti icermiyor</span>');
            }
        } else {
            $(".weapon-attachments-title").html('<span style="font-weight: bold; letter-spacing: .1vh;">Bu silah eklenti icermiyor</span>');
        }

        handleAttachmentDrag()
    });
}

var AttachmentDraggingData = {};

function handleAttachmentDrag() {
    $(".weapon-attachment").draggable({
        helper: 'clone',
        appendTo: "body",
        scroll: true,
        revertDuration: 0,
        revert: "invalid",
        start: function(event, ui) {
           var ItemData = $(this).data('AttachmentData');
           $(this).addClass('weapon-dragging-class');
           AttachmentDraggingData = ItemData
        },
        stop: function() {
            $(this).removeClass('weapon-dragging-class');
        },
    });
    $(".weapon-attachments-remove").droppable({
        accept: ".weapon-attachment",
        hoverClass: 'weapon-attachments-remove-hover',
        drop: function(event, ui) {
            $.post('http://qb_inventory/RemoveAttachment', JSON.stringify({
                AttachmentData: AttachmentDraggingData,
                WeaponData: ClickedItemData,
            }), function(data){
                if (data.Attachments !== null && data.Attachments !== undefined) {
                    if (data.Attachments.length > 0) {
                        $("#weapon-attachment-" + AttachmentDraggingData.id).fadeOut(150, function(){
                            $("#weapon-attachment-" + AttachmentDraggingData.id).remove();
                            AttachmentDraggingData = null;
                        });
                    } else {
                        $("#weapon-attachment-" + AttachmentDraggingData.id).fadeOut(150, function(){
                            $("#weapon-attachment-" + AttachmentDraggingData.id).remove();
                            AttachmentDraggingData = null;
                            $(".weapon-attachments").html("");
                        });
                        $(".weapon-attachments-title").html('<span style="font-weight: bold; letter-spacing: .1vh;">Bu silah eklenti icermiyor</span>');
                    }
                } else {
                    $("#weapon-attachment-" + AttachmentDraggingData.id).fadeOut(150, function(){
                        $("#weapon-attachment-" + AttachmentDraggingData.id).remove();
                        AttachmentDraggingData = null;
                        $(".weapon-attachments").html("");
                    });
                    $(".weapon-attachments-title").html('<span style="font-weight: bold; letter-spacing: .1vh;">Bu silah eklenti icermiyor</span>');
                }
            });
        },
    });
}

$(document).on('click', '#weapon-attachments', function(e){
    e.preventDefault();
    if (!Inventory.IsWeaponBlocked(ClickedItemData.name)) {
        $(".weapon-attachments-container").css({"display":"block"})
        $("#qbus-inventory").animate({
            left: 100+"vw"
        }, 200, function(){
            $("#qbus-inventory").css({"display":"none"})
        });
        $(".weapon-attachments-container").animate({
            left: 0+"vw"
        }, 200);
        AttachmentScreenActive = true;
        FormatAttachmentInfo(ClickedItemData);    
    } else {
        $.post('http://qb_inventory/Notify', JSON.stringify({
            message: "Bu silah icin eklentiler mevcut degil.",
            type: "error"
        }))
    }
});
