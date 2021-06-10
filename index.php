<html>
    <head>
        <title>ABWorld</title>

        <!-- CSS -->
        <link rel="stylesheet" href="css/index.css">
        <?php include('base/headShared.html') ?>

    </head>
    <body>
        
        <div class="pageBg"></div>
        <div class="opening">
            <div class="openingContents">
                <div class="openingMain">
                    <div class="openingMainImgContainer">
                        <img src="img/icons/ABWorld/LARGE.png">
                    </div>
                    <h1>ABWorld</h1>
                    <p>ABWorld provides and creates free and open-source software, tools and much more.</p>
                    <a class="openingMainProjects btn btnFilled" data-scrollOnClick="true" data-scrollTo=".projects">Projects <img src="img/graphics/smallDownArrow.svg"></a>
                    <a class="openingMainProjects btn" data-scrollOnClick="true" data-scrollTo=".moreInfo">More Info <img src="img/graphics/smallDownArrow.svg"></a>
                </div>

                <?php include('base/openingBottom.html') ?>
            </div>
        </div>

        <div class="section projects" data-default-slider="#softwareSliders">
            <h1 class="sectionHeading" style="text-align: center;">Our products</h1>

            <div class="sliderTabs">
                <a class="sliderTab sliderTabSelected" data-opens="#softwareSliders">Software</a>
                <a class="sliderTab" data-opens="#onlineSliders">Online</a>
                <a class="sliderTab" data-opens="#librarySliders">Programming Library</a>
                <a class="sliderTab" data-opens="#otherSliders">Other</a>
            </div>

            <!-- Software -->
            <div class="sliderList" id="softwareSliders">
                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrow.svg">
                        <img class="icon" src="img/icons/ABSoftware/ABPaint/Logo/LARGE.png">
                        <div class="right">
                            <h2>ABPaint</h2>
                            <div class="tags">
                                <div class="tag tag-comingSoon">Coming Soon</div>
                            </div>
                            <p>A powerful vector-based graphics program.</p>
                        </div>
                    </div>
                    
                    <div class="sliderBack">
                        <a class="first" href="#">
                            <div>Download ABPaint</div>
                        </a>
                        <a class="second" href="#">
                            <div>More Info</div>
                        </a>
                    </div>

                </div>
            </div>

            <!-- Online -->
            <div class="sliderList" id="onlineSliders">
                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrow.svg">
                        <img src="img/icons/Online/ABMedia/LARGE.png">
                        <div class="right">
                            <h2>ABMedia</h2>
                            <p>The official YouTube channel for ABWorld.</p>
                        </div>
                    </div>
                    
                    <div class="sliderBack">
                        <a class="first" href="https://www.youtube.com/channel/UC1T-F3OLNopJ4OsExsVgnkA">
                            <div>Visit on YouTube</div>
                        </a>
                        <a class="second" href="https://www.youtube.com/watch?v=9Oalbonuk9o&list=PLAVSKeDM4AqMn1dVboE1P8vwR3BmyqfGI">
                            <div>ABMedia Programming Series</div>
                            <div><small>Learn the basics of programming!</small></div>
                        </a>
                    </div>
                </div>

                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrow.svg">
                        <img class="icon" src="img/icons/Online/ABSoftware Docs/LARGE.png">
                        <div class="right">
                            <h2>ABSoftware Docs</h2>
                            <div class="tags">
                                <div class="tag tag-learning">Learning</div>
                            </div>
                            <p>Complete documentation for all ABSoftware products.</p>
                        </div>
                    </div>
                    <div class="sliderBack">
                        <a class="first allDocsGuides" data-scrollOnClick="true" data-scrollTo=".documentation">
                            <div>View All Docs <img src="img/graphics/smallDownArrow.svg"></div>
                        </a>
                    </div>
                </div>

                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrow.svg">
                        <img class="icon" src="img/icons/Online/ABLearn/LARGE.png">
                        <div class="right">
                            <h2>ABLearn</h2>
                            <div class="tags">
                                <div class="tag tag-learning">Learning</div>
                            </div>
                            <p>Interactive learning experience to teach the most important parts of ABSoftware products.</p>
                        </div>
                    </div>
                    
                    <div class="sliderBack">
                        <a class="first allLearnGuides" data-scrollOnClick="true" data-scrollTo=".documentation">
                            <div>View All Learn Guides <img src="img/graphics/smallDownArrow.svg"></div>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Library -->
            <div class="sliderList" id="librarySliders">
                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrow.svg">
                        <img class="icon" src="img/icons/ABSoftware/ABSave/Logo/LARGE.png">
                        <div class="right">
                            <h2>ABSoftware.ABSave</h2>
                            <div class="tags">
                                <div class="tag tag-csharp">C#</div>
                                <div class="tag tag-comingSoon">Alpha</div>
                                <div class="tag tag-comingSoon">Page coming soon</div>
                            </div>
                            <p>A serializer/deserializer for <b>ABSave</b>.</p>
                        </div>
                    </div>
                    
                    <div class="sliderBack">
                        <a class="first" href="#">
                            <div>Download</div>
                        </a>
                        <a class="second" href="#">
                            <div>What is ABSave?</div>
                        </a>
                        <a class="third" href="#">
                            <div>Usage</div>
                        </a>
                    </div>
                </div>

                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrow.svg">
                        <img class="icon" src="img/icons/ABSoftware/ABParser/LARGE.png">
                        <div class="right">
                            <h2>ABParser</h2>
                            <div class="tags">
                                <div class="tag tag-csharp">C#</div>
                                <div class="tag tag-cpp">C++</div>
                                <div class="tag tag-comingSoon">Beta</div>
                                <div class="tag tag-comingSoon">Page coming soon</div>
                            </div>
                            <p>A utility to create powerful string parsers easily.</p>
                        </div>
                    </div>
                    
                    <div class="sliderBack">
                        <a class="first" href="#">
                            <div>Download</div>
                        </a>
                        <a class="second" href="https://github.com/ABSoftwareOfficial/ABSoftware.ABParser">
                            <div>Source Code</div>
                        </a>
                    </div>
                </div>

                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrow.svg">
                        <img class="icon" src="img/icons/ABSoftware/ABSoftware.Core/LARGE.png">
                        <div class="right">
                            <h2>ABSoftware.Core</h2>
                            <div class="tags">
                                <div class="tag tag-csharp">C#</div>
                                <div class="tag tag-general">ABSoftware Specific</div>
                                <div class="tag tag-comingSoon">Beta</div>
                                <div class="tag tag-comingSoon">Download coming soon</div>
                            </div>
                            <p>A foundation for all ABSoftware programs.</p>
                        </div>
                    </div>
                    
                    <div class="sliderBack">
                        <a class="second" href="#">
                            <div>Download</div>
                        </a>
                        <a class="first" href="https://github.com/ABSoftwareOfficial/ABSoftware.Core">
                            <div>Source Code</div>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Other -->
            <div class="sliderList" id="otherSliders">
                <p style="text-align: center">This is currently empty.</p>
            </div>
        </div>

        <div class="section moreInfo">
            <div class="zigZag zigZagTop"></div>
            <div class="moreInfoContents" data-parallaxBg="true" data-parallax-speed="4">
                <h1>More Info</h1>

                <div class="moreInfoPart partLearning partLearningAndDevelopment">
                    <h2>Learning our products</h2>
                    <p>One of the most important things is learning how to use our products, so we provide some very helpful tools, so you can pick them up quickly and easily.</p>

                    <div class="moreInfoFirst">
                        <img src="img/icons/Online/ABLearn/LARGE.png">
                        <h3>ABLearn</h3>
                        <p>An interactive learning experience for <b>some</b> ABSoftware projects, and only the most important parts.</p>
                        <a class="btn btnFilled allLearnGuides" data-scrollOnClick="true" data-scrollTo=".documentation">See all ABLearn guides <img src="img/graphics/smallDownArrow.svg"></a>
                    </div>
                    <div class="moreInfoSecond">
                        <img src="img/icons/Online/ABSoftware Docs/LARGE.png">
                        <h3>ABSoftware Docs</h3>
                        <p><b>Complete</b> text documentation for ABWorld projects.</p>
                        <a class="btn btnFilled allDocsGuides" data-scrollOnClick="true" data-scrollTo=".documentation">See all ABSoftware docs <img src="img/graphics/smallDownArrow.svg"></a>
                    </div>
                </div>

                <div class="moreInfoPart partDevelopment partLearningAndDevelopment">
                    <h2>Develop for ABWorld</h2>
                    <p>If you're a programmer - you can help us out by contributing the one of the ABWorld projects. Most projects are <b>C#, C++</b>, with this website being <b>HTML, CSS, JS (jQuery)!</b> Source code is available at either one our GitHub pages.</p>

                    <div class="moreInfoFirst">
                        <img src="img/icons/ABWorld/LARGE.png">
                        <h3>ABWorldOfficial</h3>
                        <p>Contains non-ABSoftware products (e.g. the website).</p>
                        <a class="btn btnFilled" href="https://github.com/ABWorldOfficial">Visit GitHub</a>
                    </div>
                    <div class="moreInfoSecond">
                        <img src="img/icons/ABSoftware/ABSoftware/LARGE.png">
                        <h3>ABSoftwareOfficial</h3>
                        <p>Contains all ABSoftware products (e.g. ABParser, ABSave etc.) This is also where you'll find documentation about how you can develop applications.</p>
                        <a class="btn btnFilled" href="https://github.com/ABSoftwareOfficial">Visit GitHub</a>
                    </div>
                </div>

                
            </div>
            <div class="zigZag zigZagBottom"></div>
        </div>

        <div class="section documentation" data-default-slider="#learnSliders">
            <h1 class="sectionHeading" style="text-align: center;">Learning</h1>
            <p style="text-align: center;">All of the learn guides and documentation available for all our projects</p>

            <div class="sliderTabs">
                <a class="sliderTab sliderTabSelected" data-docsOpens="#learnSliders">ABLearn</a>
                <a class="sliderTab" data-docsOpens="#docsSliders">ABSoftware Docs</a>
            </div>

            <div class="sliderList" id="learnSliders">
                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrowLight.svg">
                        <img class="icon" src="img/icons/ABSoftware/ABPaint/Logo/LARGE.png">
                        <div class="right">
                            <h2>ABPaint</h2>
                            <div class="tags">
                                <div class="tag tag-comingSoon">Coming soon</div>
                            </div>
                            <p>Learn how to use ABPaint with this interactive guide.</p>
                        </div>
                    </div>
                    
                    <div class="sliderBack">
                        <a class="first" href="#">
                            <div>Beginners</div>
                        </a>
                        <a class="second" href="#">
                            <div>Intermediate</div>
                        </a>
                    </div>
                </div>
                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrowLight.svg">
                        <img class="icon" src="img/icons/ABSoftware/ABSoftware.Core/LARGE.png">
                        <div class="right">
                            <h2>ABSoftware.Core</h2>
                            <div class="tags">
                                <div class="tag tag-comingSoon">Coming soon</div>
                            </div>
                            <p>If you want to develop for ABWorld, take this interactive guide to learn the base of all ABSoftware programs first!</p>
                        </div>
                    </div>
                    
                    <div class="sliderBack">
                        <a class="first" href="#">
                            <div>Go to ABLearn</div>
                        </a>
                    </div>
                </div>
            </div>

            <div class="sliderList" id="docsSliders">
                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrowLight.svg">
                        <img src="img/icons/ABSoftware/ABPaint/Logo/LARGE.png">
                        <div class="right">
                            <h2>ABPaint</h2>
                            <div class="tags">
                                <div class="tag tag-comingSoon">Coming soon</div>
                            </div>
                            <p>Complete text documentation on every feature in ABPaint.</p>
                        </div>
                    </div>
                    
                    <div class="sliderBack">
                        <a class="first" href="#">
                            <div>Go to Docs</div>
                        </a>
                    </div>
                </div>
                <div class="slider">
                    <div class="sliderFront sliderFrontClosed">
                        <img class="arrow" src="img/graphics/smallRightArrowLight.svg">
                        <img class="icon" src="img/icons/ABSoftware/ABParser/LARGE.png">
                        <div class="right">
                            <h2>ABParser</h2>
                            <div class="tags">
                                <div class="tag tag-comingSoon">Work in progress</div>
                            </div>
                            <p>How to use ABParser in your projects.</p>
                        </div>
                    </div>
                    
                    <div class="sliderBack">
                        <a class="first" href="docs/abparser">
                            <div>Go to Docs</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="section copyright">
            <p>Copyright (C) <?php echo date("Y") ?> Alex Burrows, ABWorld Team</p>
        </div>
    </body>
</html>