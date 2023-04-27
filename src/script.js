$(function() {

    var sheetID = "1MsD73QEMyxs5y8lPnFZoCTPKLUmmV3dkqrpz39aRtQs";
    var apiKey = "AIzaSyCZMC-2lvjhIywC5liOc48pbQoCP7rrWJE";
    var sheetURL = "https://sheets.googleapis.com/v4/spreadsheets/" + sheetID + "/values/A1:H100?key=" + apiKey;
    
    
    // Retrieve data from Google Sheets
    function getData() {
        $.getJSON(sheetURL, function(data) {
            var table = $("table tbody");
            table.empty();
            var rows = data.values;
            for (var i = 1; i < rows.length; i++) {
                var date = rows[i][0];
                var event = rows[i][1];
                var additionalInfo1 = rows[i][2]; 
                /*
                var additionalInfo2 = rows[i][3];
                var additionalInfo3 = rows[i][4];
                var additionalInfo4 = rows[i][5];
                var additionalInfo5 = rows[i][6];
                var additionalInfo6 = rows[i][7];  // Add this line for column H
                */
                
                var additionalInfo2 = rows[i][3] === "TRUE" ? "Going" : "No";
                var additionalInfo3 = rows[i][4] === "TRUE" ? "Going" : "No";
                var additionalInfo4 = rows[i][5] === "TRUE" ? "Going" : "No";
                var additionalInfo5 = rows[i][6] === "TRUE" ? "Going" : "No";
                var additionalInfo6 = rows[i][7] === "TRUE" ? "Going" : "No";
                                
                
                if (additionalInfo2 === "Going" && additionalInfo3 === "Going" && additionalInfo4 === "Going" && additionalInfo5 === "Going" && additionalInfo6 === "Going") {
                    additionalInfo2 = "ALL IN";
                    additionalInfo3 = "ALL IN";
                    additionalInfo4 = "ALL IN";
                    additionalInfo5 = "ALL IN";
                    additionalInfo6 = "ALL IN";
                    
                  }
              

                
                table.append("<tr><td>" + date + "</td><td>" + event + "</td><td>" + additionalInfo1 + "</td><td>" + additionalInfo2 + "</td><td>" + additionalInfo3 + "</td><td>" + additionalInfo4 + "</td><td>" + additionalInfo5 + "</td><td>" + additionalInfo6 + "</td></tr>"); // Add additionalInfo6 to the HTML
            }
            
            
                        // Sort the table rows based on the dates in the first column
            rows = table.find("tr").toArray();


            
            rows.sort(function(a, b) {
                var date1 = new Date($(a).find("td:first-child").text());
                var date2 = new Date($(b).find("td:first-child").text());
                if (date1 === date2) {
                    var event1 = $(a).find("td:nth-child(2)").text();
                    var event2 = $(b).find("td:nth-child(2)").text();
                    if (event1 === event2) {
                        var additionalInfo1 = $(a).find("td:nth-child(3)").text();
                        var additionalInfo2 = $(b).find("td:nth-child(3)").text();
                        var additionalInfo3 = $(a).find("td:nth-child(4)").text();
                        var additionalInfo4 = $(b).find("td:nth-child(4)").text();
                        var additionalInfo5 = $(a).find("td:nth-child(5)").text();
                        return additionalInfo1.localeCompare(additionalInfo2) ||
                               additionalInfo3.localeCompare(additionalInfo4) ||
                               additionalInfo5.localeCompare(additionalInfo5);
                    }
                    return event1.localeCompare(event2);
                }
                return date1 - date2;
            });
            
            
            
                $.each(rows, function(index, row) {
                table.append(row);
            });
        });
    }

    //getData();

    // Initialize the countdown timer
    var graduationDate = new Date("June 18, 2023").getTime();
    var countdownElem = $("#countdown");

    var countdownInterval = setInterval(function() {
        getData();
        var now = new Date().getTime();
        var distance = graduationDate - now;
        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElem.text("Graduation day has arrived!");
            return;
        }
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var countdownText = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
        countdownElem.text(countdownText);
    }, 1000);

    // Handle form submit event
    $("form").submit(function(event) {
        event.preventDefault();
        var date = $("input[type='date']").val();
        var event = $("input[type='text']").val();
        if (!date || !event) {
            return;
        }
        var table = $("table tbody");
        table.append("<tr><td>" + date + "</td><td>" + event + "</td></tr>");
        // Sort the table rows based on the dates in the first column
        var rows = table.find("tr").toArray();
        rows.sort(function(a, b) {
            var date1 = new Date($(a).find("td:first-child").text());
            var date2 = new Date($(b).find("td:first-child").text());
            return date1 - date2;
        });
        $.each(rows, function(index, row) {
            table.append(row);
        });
        $("input[type='date']").val("");
        $("input[type='text']").val("");
    });

    // Display today's date and the number of days until graduation
    var today = new Date();
    var daysUntilGraduation = Math.floor((graduationDate - today) / (1000 * 60 * 60 * 24));
    var dateElem = $("#date");
    dateElem.text("Today is " + today.toDateString() + ", " + daysUntilGraduation + " days until graduation.");

});
