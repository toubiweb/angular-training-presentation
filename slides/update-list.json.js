var glob = require("glob");
var fs = require("fs");
var path = require("path");

var outputPath = './list.json';

// options is optional
glob('./J*/**/*.@(html|md)', function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.

    var filesMap = files.reduce(function (filesMap, file) {

        var dir = path.dirname(file);
        if (!filesMap[dir]) {
            filesMap[dir] = [];
        }
        filesMap[dir].push(file);
        return filesMap;
    }, {});

    var slides = [];
    for (var property in filesMap) {
        if (filesMap.hasOwnProperty(property)) {
            
            var files = filesMap[property];

            var dirSlides = files.reduce(function (dirSlides, file) {

                dirSlides.push({
                    filename: file,
                    attr: {
                        'data-background': 'resources/background/oujda-alpha2.png'
                    }
                });
                return dirSlides;
            }, []);

            if (dirSlides.length > 0) {
                if (slides.length === 0){
                    // very first slide
                    dirSlides[0].attr = {
                        'data-menu-title': 'Formation Angular JS',
                        'data-background': 'resources/background/oujda.jpg'
                    };
                }else{
                    // first slide of folder
                    dirSlides[0].attr = {
                        'data-background': 'resources/background/oujda-alpha.png'
                    };
                }
            }

            slides.push(dirSlides);
        }
    }



    /*
        var slides = [
            [
                {
                    "filename": "01.introduction/01.title.html",
                    "attr": {
                        "data-menu-title": "Formation Angular JS"
                    }
                },
                {
                    "filename": "01.introduction/02.coach.html"
                },
                {
                    "filename": "01.introduction/03.versions.html"
                },
                {
                    "filename": "01.introduction/04.approach.html"
                },
                {
                    "filename": "01.introduction/05.program.html"
                }
            ]

        ];
    */


    fs.writeFile(outputPath, JSON.stringify(slides, null, 4), function (err) {
        if (err) {
            console.log('Error creating file "%s": "%s"', outputPath, err.message);
        } else {
            console.log('File successfully file: "%s"', outputPath);
        }
    })
})
