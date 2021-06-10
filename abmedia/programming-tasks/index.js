
// Wrapping everything in a function allows for minification.
(function() {

    let currentTask = 0;
    let consoleBox;
    let currentEpisode = 0;
    const NUMBER_OF_TASKS = [
        4,
        3,
        3,
        4,
        2
    ];

    let sectionTitles = [
        [
            "Simple Calculator",
            "Name Writer",
            "Bits Calculator",
            "BMI Calculator"
        ],
        [
            "Grade Calculator",
            "Better Calculator",
            "Text Length Comparer"
        ],
        [
            "FizzBuzz",
            "The Ultimate Adder",
            "The Mean Calculator"
        ],
        [
            "The Shopping List",
            "Biggest Number Calculator",
            "\"FX\" Table",
            "Standard Deviation"
        ],
        [
            "Members Only",
            "All Matches"
        ]
    ];

    $(document).ready(function() {
        // Start by hiding all of the items in the carousel - except the very first one.
        $(".carouselItem").each(function (index, item) {
            if (index != 0) {
                $(this).hide();
            }
               
            // Hide the answers on all of them - and, in additon to that, hide all of the "Episode 11 simplified answers".
            $(this).find(".carouselAnswer").hide();
            $(this).find(".ep11Code").hide();
        });

        // Configure the control buttons.
        $(".leftButton").click(prevTask);
        $(".rightButton").click(nextTask);

        // Configure all "Show" buttons.
        $(".carouselShowAnswer").click(showAnswer);
        $(".carouselShowQuestion").click(showQuestion);
        $(".carouselEp11Text").click(toggleEp11);

        // Configure all of the buttons.
        $(".currentEpisodeBtn").click(function () { 
            // Set the "currentEpisode".
            currentEpisode = parseInt($(this).attr("data-btn-index"));

            // Reset the "currentTask".
            currentTask = 0;

            // Un-highlight all of the other buttons, but add it for this one.
            $(".currentEpisodeBtn").removeClass("currentEpisodeSelectedBtn");
            $(this).addClass("currentEpisodeSelectedBtn");

            // Refresh everything.
            refresh();
        });

        // Configure the console.
        consoleBox = $(".consoleText");
        consoleBox.text("");
        consoleBox.keydown(consoleChange);

        refresh();
    });

    let prevTask = function() {
        if (currentTask > 0)
            currentTask--;
        refresh();
    }
    
    let nextTask = function() {
        if (currentTask < NUMBER_OF_TASKS[currentEpisode] - 1)
            currentTask++;
        refresh();
    }
    
    let showQuestion = function() {
        $(".carouselGroup").eq(currentEpisode).find(".carouselItem").eq(currentTask).find(".carouselAnswer").hide();
        $(".carouselGroup").eq(currentEpisode).find(".carouselItem").eq(currentTask).find(".carouselQuestion").show();
    }

    let showAnswer = function() {
        $(".carouselGroup").eq(currentEpisode).find(".carouselItem").eq(currentTask).find(".carouselAnswer").show();
        $(".carouselGroup").eq(currentEpisode).find(".carouselItem").eq(currentTask).find(".carouselQuestion").hide();
    }

    let toggleEp11 = function() {

        let carouselAnswer = $(".carouselGroup").eq(currentEpisode).find(".carouselItem").eq(currentTask);
        
        // Check if it was already selected.
        if ($(this).hasClass("selectedBtn")) {

            // Switch to the "Non-Episode 11" version.
            carouselAnswer.find(".nonEp11Code").show();
            carouselAnswer.find(".ep11Code").hide();

            // Deselect the button.
            $(this).removeClass("selectedBtn");

        } else {

            // Switch to the "episode 11" version.
            carouselAnswer.find(".ep11Code").show();
            carouselAnswer.find(".nonEp11Code").hide();

            // Select the button.
            $(this).addClass("selectedBtn");

        }
    }

    let refresh = function() {
        // Refresh the title.
        setTitle();

        // Hide all of the groups, but show the one we want to see.
        $(".carouselGroup").each(function (index, item) {
            if (index == currentEpisode)
                $(this).show();
            else
                $(this).hide();
        });

        // Do the same for the item.
        $(".carouselGroup").eq(currentEpisode).find(".carouselItem").each(function (index, item) {
            if (index == currentTask)
                $(this).show();
            else
                $(this).hide();
        });

        // Start running from the console.
        resetConsole();
        executeProgram();
    }

    let setTitle = function() {
        $(".currentTask").html(sectionTitles[currentEpisode][currentTask]);
    }

    // =========================
    // CONSOLE
    // =========================

    let consoleWaiting = false;
    let consoleWriteLimit = 0;
    let consoleOnError = false;
    let consoleOnContinue = null;
    let consoleOnChange = null;
    let consoleInstructions = [
        // Sequence
        [
            // Calculator Program
            async function() {
                print("Enter the first number", true);
                let firstNum = await input(true);

                print("Enter the second number", true);
                let secondNum = await input(true);
                let added = firstNum + secondNum;
                
                print(firstNum + " + " + secondNum + " = " + added, false);
            },

            // Name Writer
            async function() {
                print("Enter your first name.", true);
                let firstName = await input(false);

                print("Enter your second name.", true);
                let secondName = await input(false);

                print("Enter your age (extension).", true);
                let age = await input(true);
                
                print(firstName + ", " + secondName + " and your age is: " + age, true);
                print(secondName + ", " + firstName + " and your age is: " + age, false);
            },

            // Bits Calculator
            async function() {
                print("Enter a number of bytes", true);
                let bytes = await input(true);
                let kilobytes = bytes / 1024;
                let megabytes = kilobytes / 1024;
                let gigabytes = megabytes / 1024;

                print("Kilobytes: " + kilobytes, true);
                print("Megabytes: " + megabytes, true);
                print("Gigabytes: " + gigabytes, true);

                print("Enter a number of gigabytes", true);
                
                gigabytes = await input(true);
                megabytes = gigabytes * 1024;
                kilobytes = megabytes * 1024;
                bytes = kilobytes * 1024;
                let bits = bytes * 8;

                print("Bits: " + bits, true);
                print("Bytes: " + bytes, true);
                print("Kilobytes: " + kilobytes, true);
                print("Megabytes: " + megabytes, true);

                print("Enter a number of bits (EXTENSION)", true);
                bits = await input(true);

                bytes = bits / 8;
                kilobytes = bytes / 1024;
                megabytes = kilobytes / 1024;
                gigabytes = megabytes / 1024;

                print("Bytes: " + bytes, true);
                print("Kilobytes: " + kilobytes, true);
                print("Megabytes: " + megabytes, true);
                print("Gigabytes: " + gigabytes, true);
            },

            // BMI Calculator
            async function() {
                print("Enter your weight (in kg)", true);
                let weight = await input(true);

                print("Enter your height (in m)", true);
                let height = await input(true);

                let bmiAnswer = weight / (height * height);
                print(weight + " / (" + height + " * " + height + ") = " + bmiAnswer, true);

                print("Enter your weight (in lbs)", true);
                weight = await input(true);

                print("Enter your height (in inches)", true);
                height = await input(true);

                bmiAnswer = (weight / (height * height)) * 703;
                print("703 * (" + weight + " / (" + height + " * " + height + ")) = " + bmiAnswer, true);
            }
        ],

        // Selection
        [
            // Grade Calculator
            async function() {

                print("Enter the percentage you got.", true);
                let percentage = await input(true);

                let grade = "";

                if (percentage > 100) {
                    print("Over 100%?! You're not THAT good!", true);
                    return;
                }
                if (percentage > 90)
                    grade = "A*";
                else if (percentage > 80)
                    grade = "A";
                else if (percentage > 70)
                    grade = "B";
                else if (percentage > 60)
                    grade = "C";
                else if (percentage > 50)
                    grade = "D";
                else if (percentage <= 50)
                    grade = "E";
                if (percentage == 0)
                    grade = "U";
                if (percentage < 0) {
                    print("You got less than zero?! There's no way you're THAT bad!", true);
                    return;
                }

                print("You got: " + grade, true);
            },

            // Better Calculator
            async function() {
                print("Enter one number.", true);
                let firstNumber = await input(true);

                print("Enter another number.", true)
                let secondNumber = await input(true);

                print("What kind of calculation do you want to do? (+, -, *, /)", true);
                let calculation = await input(false);
                let answer = 0;

                if (calculation == "+")
                    answer = firstNumber + secondNumber;
                else if (calculation == "-")
                    answer = firstNumber - secondNumber;
                else if (calculation == "*")
                    answer = firstNumber * secondNumber;
                else if (calculation == "/")
                    answer = firstNumber / secondNumber;
                else {
                    print("Come on, that's not a valid option!", true);
                    return;
                }

                print(firstNumber + " " + calculation + " " + secondNumber + " = " + answer, true);

            },

            // Text Length Comparer
            async function() {
                print("Please enter the first string.", true);
                let firstString = await input(false);

                print("Please enter the second string.", true);
                let secondString = await input(false);

                if (firstString.length == secondString.length)
                    print("They are both equal in length!", true);
                else if (firstString.length > secondString.length)
                    print("First string is bigger by " + (firstString.length - secondString.length) + " characters", true);
                else if (secondString.length > firstString.length)
                    print("Second string is bigger by " + (secondString.length - firstString.length) + " characters", true);
            }
        ],

        // Iteration
        [
            // FizzBuzz
            async function() {
                print("FizzBuzz\r\n1\r\n2\r\nFizz\r\n4\r\nBuzz\r\nFizz\r\n7\r\n8\r\nFizz\r\nBuzz\r\n11\r\nFizz\r\n13\r\n14\r\nFizzBuzz\r\n16\r\n17\r\nFizz\r\n19\r\nBuzz\r\nFizz\r\n22\r\n23\r\nFizz\r\nBuzz\r\n26\r\nFizz\r\n28\r\n29\r\nFizzBuzz\r\n31\r\n32\r\nFizz\r\n34\r\nBuzz\r\nFizz\r\n37\r\n38\r\nFizz\r\nBuzz\r\n41\r\nFizz\r\n43\r\n44\r\nFizzBuzz\r\n46\r\n47\r\nFizz\r\n49\r\nBuzz\r\nFizz\r\n52\r\n53\r\nFizz\r\nBuzz\r\n56\r\nFizz\r\n58\r\n59\r\nFizzBuzz\r\n61\r\n62\r\nFizz\r\n64\r\nBuzz\r\nFizz\r\n67\r\n68\r\nFizz\r\nBuzz\r\n71\r\nFizz\r\n73\r\n74\r\nFizzBuzz\r\n76\r\n77\r\nFizz\r\n79\r\nBuzz\r\nFizz\r\n82\r\n83\r\nFizz\r\nBuzz\r\n86\r\nFizz\r\n88\r\n89\r\nFizzBuzz\r\n91\r\n92\r\nFizz\r\n94\r\nBuzz\r\nFizz\r\n97\r\n98\r\nFizz", true);
            },

            // The Ultimate Adder
            async function() {
                
                let totalsRes = await getTotals();
                if (totalsRes == null)
                    return;
                print("The total was: " + totalsRes.total, true);
            },

            // The Mean Calculator
            async function() {
                let totalsRes = await getTotals();
                if (totalsRes == null)
                    return;
                let mean = totalsRes.total / totalsRes.numbersToAdd;
                print("The mean was: " + mean, true);
            }
        ],

        // Arrays
        [
            // The Shopping List
            async function() {
                let shoppingList = [];

                while (true)
                {
                    if (shoppingList.length == 0)
                        print("You have no items in your shopping list!", true);
                    else
                    {
                        print("Here are all of the items on your shopping list:", true);
                        for (let i = 0; i < shoppingList.length; i++)
                            print("#" + (i + 1) + ": " + shoppingList[i], true);
                    }

                    print("Here's what you can do:", true);
                    print("Type 'add' to add something to your shopping list.", true);
                    print("Type 'remove' to remove something from your shopping list.", true);
                    let option = (await input(false)).toLowerCase();

                    if (option == "add")
                    {
                        let toAdd = "";
                        
                        while (toAdd == "") {
                            print("Type what you want to add to the list.", true);
                            toAdd = await input(false);
                        }

                        shoppingList.push(toAdd);
                    }

                    else if (option == "remove")
                    {
                        print("Type in the number for which item you want to remove - you'll find the numbers next to the items in your shopping list", true);
                        let choice = await input(true) - 1;

                        if (choice < 0 || choice >= shoppingList.length)
                        {
                            print("Hey! That wasn't a valid number.", true);
                            continue;
                        }

                        shoppingList.splice(choice, 1);
                    }
                    else print("That wasn't a valid option!", true);
                }
            },

            // Biggest Number Calculator
            async function() {
                print("Input how many items are in the array.", true);
                let numberOfItems = await input(true);

                if (numberOfItems == 0)
                    print("There are no items in the array!", true);
                else {
                    let arr = [];

                    for (let i = 0; i < numberOfItems; i++) {
                        print("Enter number #" + (i + 1), true)
                        arr[i] = await input(true);
                    }
                        
                    let biggestNumber = 0;
                    for (let i = 0; i < numberOfItems; i++)
                        if (arr[i] > biggestNumber)
                            biggestNumber = arr[i];

                    print("The biggest number is: " + biggestNumber, true);
                }
            },

            // "FX" table
            async function() {
                let fs = [];
                let xs = [];

                print("Choose how many rows you want in the table.", true);
                let numberOfRows = await input(true);

                if (numberOfRows <= 0)
                    print("You can't have 0 or below items!", true);

                for (let i = 0; i < numberOfRows; i++) {
                    let cRow = i + 1;
                    print("Enter the 'f' for row #" + cRow, true);
                    fs.push(await input(true));

                    print("Enter the 'x' for row #" + cRow, true);
                    xs.push(await input(true));
                }

                print("Here are all of your 'fx's:", true);
                for (let i = 0; i < numberOfRows; i++) {
                    print(fs[i] + " x " + xs[i] + " = " + (fs[i] * xs[i]), true);
                }
                
            },

            // Standard Deviation
            async function() {

                let items = [];

                print("Choose how many numbers you want to work out the standard deviation for.", true);
                let numberOfItems = await input(true);

                if (numberOfItems <= 0)
                    print("You can't have 0 or below items!", true);
                
                else {

                    print("Input all the numbers you want to work out the standard deviation for:", true);
                    for (let i = 0; i < numberOfItems; i++) {
                        print("Input Number " + (i + 1), true);
                        items.push(await input(true));
                    }

                    let mean = 0;
                    for (let i = 0; i < numberOfItems; i++)
                        mean += items[i];
                    mean = mean / numberOfItems;

                    let squaredSum = 0;
                    for (let i = 0; i < numberOfItems; i++)
                        squaredSum += items[i] * items[i];

                    let dividedSquareSum = squaredSum / numberOfItems;
                    let finalResult = Math.sqrt(dividedSquareSum - (mean * mean));

                    print("Mean: " + mean, true);
                    print("Standard Deviation: " + finalResult, true);
                }
            }
        ],

        // Members
        [
            async function() {
                let membersArr = [];
                let vipArr = [];

                print("How many people are there on the VIP list?", true);
                let vipSize = await input(true);

                if (vipSize > 0) {
                    print("Input all of the VIP members.", true);

                    for (let i = 0; i < vipSize; i++) {
                        print("Input member " + (i + 1), true);
                        vipArr.push(await input(false).toLowerCase());
                    }
                }

                print("How many people are there on the regular members list?", true);
                let membersSize = await input(true);

                if (membersSize > 0) {
                    print("Input all of the regular members.", true);

                    for (let i = 0; i < membersSize; i++) {
                        print("Input member " + (i + 1), true);
                        membersArr.push(await input(false).toLowerCase());
                    }
                }

                print("Alright! Now, type in a name to check if someone is on one of the lists.", true);
                while (true) {
                    print("Enter a name.", true);
                    let currentName = (await input(false)).toLowerCase();

                    let isVIP = findIn(vipArr, currentName);

                    if (isVIP) {
                        print("This person is a VIP!", true);
                        continue;
                    }

                    let isRegularMember = findIn(membersArr, currentName);
                    if (isRegularMember) {
                        print("This person is allowed in as a regular member.", true);
                        continue;
                    }

                    print("This person isn't allowed in.", true);
                }
            },

            async function() { }
        ]
    ];

    let findIn = function(arr, item) {
        for (let i = 0; i < arr.length; i++)
            if (arr[i] == item)
                return true;

        return false;
    }

    let getTotals = async function() {
        print("Enter how many numbers you would like to process.", true);
        let numbersToAdd = await input(true);

        if (numbersToAdd == 0) {
            print("You can't process 0 numbers!", true);
            return null;
        }
        else {
            let total = 0;

            for (let i = 0; i < numbersToAdd; i++) {
                print("Please enter number " + (i + 1), true);
                total += await input(true);
            }

            return { numbersToAdd: numbersToAdd, total: total };
        }
    }

    let consoleChange = function(key) {

        let writeLimit = consoleWriteLimit;

        // If we're writing a backspace, we need to increase the "writeLimit", because we are taking away the character BEFORE the caret, as opposed to at.
        if (key.keyCode == 8)
            writeLimit++;

        // If we're trying to do this in a range we aren't allowed to do it, just stop the event right here.
        if (document.getElementById("consoleInput").selectionStart < writeLimit)
            return false;

        // If we're pressing ENTER, then run the next instruction.
        if (key.keyCode == 13) {
            continueRunning();

            // We're cancelling it before because if we didn't, the event would go through AFTER "continueRunning" runs, which would mean we would get an extra NewLine after it has printed everything out.
            return false;
        }

    }

    let print = function(text, newLine) {
        consoleBox.val(consoleBox.val() + text + (newLine ? "\n" : ""));
        consoleWriteLimit = consoleBox.val().length;
    }

    let input = function(ensureNumber) {
        return new Promise(function(resolve, reject) {
            consoleWaiting = true;

            consoleOnContinue = function() {
                consoleWaiting = false;
                let inputtedVal = consoleBox.val().substring(consoleWriteLimit);
                print("", true);

                if (ensureNumber) {
                    let numCheck = checkIfNumber(inputtedVal);
                    if (!numCheck.valid)
                        reject("NaN");
                    resolve(numCheck.number)
                }

                resolve(inputtedVal);
            }

            consoleOnChange = function() {
                reject("Moved console");
            }
        });
    }

    let executeProgram = async function() {
        while (true) {
            try {
                resetConsole();
                await consoleInstructions[currentEpisode][currentTask]();
                await input(false);
            } catch {
                //throw ex;
                break;
            }
        }
    }

    let continueRunning = function() {

        if (consoleOnError) {
            resetConsole();
            executeProgram();
        }
        else if (consoleWaiting) {
            consoleWaiting = false;
            consoleOnContinue();
        }
    }

    let checkIfNumber = function(txt) {
        
        let num = parseFloat(txt, 10);

        if (isNaN(num)) {
            sayInvalidNumbers();
            return { valid: false };
        }

        return { valid: true, number: num };
    }
	
	let sayInvalidNumbers = function() {
        consoleOnError = true;
		consoleBox.val(consoleBox.val() + "The numbers you entered weren't valid! Press ENTER to restart.");
        consoleWriteLimit = consoleBox.val().length;
	}
	
    let resetConsole = function() {

        if (consoleOnChange != null)
            consoleOnChange();
        consoleBox.val("");
        consoleWaiting = false;
        consoleWriteLimit = 0;
        consoleOnError = false;
        consoleOnChange = null;
    }

})();
