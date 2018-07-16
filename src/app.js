// ----->> Model <<-----

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};

//  ----->> Octupus <<-----

var octupus = {

    init: function() {
        // set out current cat to the first one int the list
        model.currentCat = model.cats[0];

        // notify views to inilize the
        catListView.init(); 
        catView.init();
        
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // Increment counter of currently selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render()
    }
}

// ----->> View <<------

var catView = {
    
    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImgElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click increments the current cat counter
        this.catImgElem.addEventListener('click', function() {
            octupus.incrementCounter();
        });

        this.render();
    },

    render: function() {
        // update the DOM element by current cat values
        var currentCat = octupus.getCurrentCat();

        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImgElem.src = currentCat.imgSrc;
    }
}

var catListView = {

    init: function () {
        this.catListElem = document.getElementById('cat-list');

        // render the view with right values
        this.render();
    },

    render: function() {
        var cat, elem;
        // get cats from octopus
        var cats = octupus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        for(cat of cats) {
            //  make a new elem list item
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)

            elem.addEventListener('click', (function(cat) {
                return function() {
                    octupus.setCurrentCat(cat);
                    catView.render();
                }
            })(cat))

            // finally, add the elem to the list
            this.catListElem.appendChild(elem);
        }

    }
}

// start the app
octupus.init();