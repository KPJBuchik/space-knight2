   let $el = document.body

   
   
   let randomNumber = (min, max) => {
    
    
        return Math.random() * (max - min) + min;
    }

    // Generate a star 
    let genStar = () => {

        let star = document.createElement("img");
        star.src = ("assets/stars.png")
        star.classList.add("star");

        // Gen star coordinates relative to $el size
        let x = randomNumber(1, $el.offsetWidth);
        let y = randomNumber(1, $el.offsetHeight);

        let { style } = star;

        style.left = Math.floor(x) + "px";
        style.top = Math.floor(y) + "px";

        style.setProperty(
            "--star-size",
            randomNumber(1, 4) + "px"
        );

        style.setProperty(
            "--twinkle-duration",
            Math.ceil(randomNumber(1, 5)) + "s"
        );

        style.setProperty(
            "--twinkle-delay",
            Math.ceil(randomNumber(1, 5)) + "s"
        );

        return star;
    }

    for (let index = 0; index < 25; index++) {
        $el.append(genStar());
    }

