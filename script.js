$(document).ready(function() {
    var dispArray = [];
    var restArray = [];
    let dispSelected;

    function getDispensary(userLoc) {
        var location = userLoc;
        var settings = {
            url:
                "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&term=weed&location=" +
                location,
            method: "GET",
            timeout: 0,
            headers: {
                accept: "application/json",
                "x-requested-with": "xmlhttprequest",
                "Access-Control-Allow-Origin": "*",
                Authorization:
                    "Bearer f8a8rHUaTF8-rGjw6Ap5l3RLMBlUolqUUy7wKupzJ1MDPlSWDctHN4Qh197KOHHmaUEHXNA_5wljb3aJAramwCFqZPoaq7gPHRpCE9a7FLrWpwY9eaw3Mr4vw-g1XnYx"
            }
        };

        $.ajax(settings).done(function(response) {
            for (let index = 0; index < 7; index++) {
                dispArray[index] = response.businesses[index];
            }
            localStorage.setItem("dispArray", JSON.stringify(dispArray));
            var item = JSON.parse(localStorage.getItem("dispArray"));
            console.log(item);
            for (index = 0; index < item.length; index++) {
                makeCards(item[index], index);
            }
        });
    }

    function getRestaurants(dispLoc) {
        var location = dispLoc;
        var settings = {
            url:
                "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&term=fastfood&radius=4000&location=" +
                location,
            method: "GET",
            timeout: 0,
            headers: {
                accept: "application/json",
                "x-requested-with": "xmlhttprequest",
                "Access-Control-Allow-Origin": "*",
                Authorization:
                    "Bearer f8a8rHUaTF8-rGjw6Ap5l3RLMBlUolqUUy7wKupzJ1MDPlSWDctHN4Qh197KOHHmaUEHXNA_5wljb3aJAramwCFqZPoaq7gPHRpCE9a7FLrWpwY9eaw3Mr4vw-g1XnYx"
            }
        };

        $.ajax(settings)
            .done(function(response) {
                for (let index = 0; index < 10; index++) {
                    restArray[index] = response.businesses[index];
                }
                localStorage.setItem("restArray", JSON.stringify(restArray));
            })
            .done(function() {
                $(".map").remove();
                let newBoxEl = $("<div>").addClass("box map");
                $(".card-section").append(newBoxEl);
                let anchorEl = $("<a>").addClass("map-anchor");
                newBoxEl.append(anchorEl);
                let mapDiv = $("<div>").attr("id", "map");
                newBoxEl.append(mapDiv);
                anchorEl = document.querySelector(".map-anchor");
                anchorEl.scrollIntoView({ behavior: "smooth" });

                initMap();
            });
        console.log(restArray);
        console.log(dispArray);
    }

    function makeCards(obj, index) {
        var card = $("<div>", {
            class: "card-content",
            value: index
        });
        var media = $("<div>", { class: "media" });
        var col = $("<div>", { class: "column" });
        var imgHolder = $("<div>", { class: "card-image" });
        var fig = $("<figure>", { class: "image is-2by1" });
        var img = $("<img>", {
            class: "business-image",
            src: obj.image_url,
            alt: "Placeholder Image"
        });
        var content = $("<div>", { class: "content comforataa" });
        var busName = $("<div>", {
            id: "businessName",
            text: obj.name
        });
        var busAddy = $("<div>", {
            id: "address",
            text: obj.location.address1
        });
        var busNum = $("<div>", {
            id: "phoneNumber",
            text: obj.phone
        });
        var indivCard = $("<div>", {
            class: "card"
        });

        var rateImg = $("<img>", {
            class: "ratings",
            src: getRating(obj.rating),
            alt: "yelp star rating"
        });

        var yelpLogo = $("<img>", {
            class: "mandatory_logo",
            src: "assets/images/yelp-logo.png",
            alt: "yelp logo",
            style: "height: 60px",
            display: "inline"
        });

        var reviewNum = $("<div>", {
            class: "reviews",
            text: "Based on " + obj.review_count + " reviews",
            style: "color: gray"
        });

        // "style": "margin-bottom: 12px"
        content.append(busName, busAddy, busNum, rateImg, yelpLogo, reviewNum);

        fig.append(img);
        imgHolder.append(fig);
        media.append(content);
        card.append(media);
        col.append(card);
        indivCard.append(imgHolder);
        indivCard.append(col);

        $(".card-section")
            .find(".container")
            .append(indivCard);
    }

    function getRating(number) {
        if (number == 1) {
            var one = "assets/images/regular_1.png";
            return one;
        } else if (number == 1.5) {
            var one_five = "assets/images/regular_1_half.png";
            return one_five;
        } else if (number == 2) {
            var two = "assets/images/regular_2.png";
            return two;
        } else if (number == 2.5) {
            var two_five = "assets/images/regular_2_half.png";
            return two_five;
        } else if (number == 3) {
            var three = "assets/images/regular_3.png";
            return three;
        } else if (number == 3.5) {
            var three_five = "assets/images/regular_3_half.png";
            return three_five;
        } else if (number == 4) {
            var four = "assets/images/regular_4.png";
            return four;
        } else if (number == 4.5) {
            var four_five = "assets/images/regular_4_half.png";
            return four_five;
        } else if (number == 5) {
            var five = "assets/images/regular_5.png";
            return five;
        }
    }

    $(".is-primary").on("click", function() {
        $(".card").empty();
        getDispensary($(".input").val());
    });

    $(".input").bind("keydown", function(e) {
        console.log("keydown!");
        if (e.keyCode === 13) {
            getDispensary($(".input").val());
        }
    });

    $(document).on("click", ".card", function() {
        dispSelected = parseInt(
            $(this)
                .find(".card-content")
                .attr("value")
        );
        var location = $(this)
            .find("#address")
            .text();
        getRestaurants(location);
    });

    $(document).on("click", ".card", function() {
        dispSelected = parseInt(
            $(this)
                .find(".card-content")
                .attr("value")
        );
        var location = $(this)
            .find("#address")
            .text();
        console.log(this);
        getRestaurants(location);
    });

    // Google Maps Init Function
    function initMap() {
        let map;
        let bounds = new google.maps.LatLngBounds();
        let mapOptions = {
            mapTypeId: "roadmap"
        };

        // Display a map on the page
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        // Custom markers
        let iconBase = "assets/images/";
        let icons = {
            dispensary: {
                icon: iconBase + "marker-green.png"
            },
            restaurant: {
                icon: iconBase + "marker-restaurant.png"
            }
        };

        // Display multiple markers on a map
        let infoWindow = new google.maps.InfoWindow(),
            marker,
            i;

        // Loop through our array of markers & place each one on the map
        for (let i = 0; i < restArray.length; i++) {
            let position = new google.maps.LatLng(
                restArray[i].coordinates.latitude,
                restArray[i].coordinates.longitude
            );
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: restArray[i].name,
                icon: icons["restaurant"].icon
            });

            // Info Window Content
            let infoWindowContent =
                "<div><strong>" +
                restArray[i].name +
                "</strong></div>" +
                "<p>" +
                restArray[i].location.address1 +
                "</p>" +
                "<p>" +
                restArray[i].location.city +
                ", " +
                restArray[i].location.state +
                "</p>" +
                "<p>" +
                "Price: " +
                restArray[i].price +
                "</p>" +
                "<a target='_blank' href=" +
                restArray[i].url +
                ">Yelp Page</a> | " +
                '<a target="_blank" href="https://www.google.com/maps/dir/?api=1&origin=' +
                restArray[i].location.address1 +
                "%2C+" +
                restArray[i].location.city +
                "%2C+" +
                restArray[i].location.state +
                "&destination=" +
                dispArray[dispSelected].location.address1 +
                "%2C+" +
                dispArray[dispSelected].location.city +
                "%2C+" +
                dispArray[dispSelected].location.state +
                '&travelmode=driving">Get Directions</a>';

            // Allow each marker to have an info window
            google.maps.event.addListener(
                marker,
                "click",
                (function(marker, i) {
                    return function() {
                        infoWindow.setContent(infoWindowContent);
                        infoWindow.open(map, marker);
                    };
                })(marker, i)
            );

            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
        }

        // Dispensary position
        let disp_Position = new google.maps.LatLng(
            dispArray[dispSelected].coordinates.latitude,
            dispArray[dispSelected].coordinates.longitude
        );
        bounds.extend(disp_Position);

        // Dispensary marker
        disp_marker = new google.maps.Marker({
            position: disp_Position,
            map: map,
            title: dispArray[dispSelected].name,
            icon: icons["dispensary"].icon
        });

        // Dispensary Info Window Content
        let disp_InfoWindowContent =
            "<div><strong>" +
            dispArray[dispSelected].name +
            "</strong></div>" +
            "<p>" +
            dispArray[dispSelected].location.address1 +
            "</p>" +
            "<p>" +
            dispArray[dispSelected].location.city +
            ", " +
            dispArray[dispSelected].location.state +
            "</p>" +
            "<a target='_blank' href=" +
            dispArray[dispSelected].url +
            ">Yelp Page</a>" +
            '<a target="_blank" href="https://www.google.com/maps/search/?api=1&query=' +
            dispArray[dispSelected].location.address1 +
            "%2C+" +
            dispArray[dispSelected].location.city +
            "%2C+" +
            dispArray[dispSelected].location.state +
            "'>Google Maps</a>";

        // Dispensary Info Window Event Listener
        google.maps.event.addListener(
            disp_marker,
            "click",
            (function(marker, i) {
                return function() {
                    infoWindow.setContent(disp_InfoWindowContent);
                    infoWindow.open(map, disp_marker);
                };
            })(marker, i)
        );
    }

});
