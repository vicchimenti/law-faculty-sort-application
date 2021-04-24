/***
 *      @author Victor Chimenti, MSCS-SE '20
 *      @file organizer.faculty.js
 *      @see Seattle University School of Law Faculty Profile Type
 *      law/organizer/facultyList/
 *
 *      This new content type layout is a smart layout for news items that must obey
 *      a masonry grid layout. In this iteration this layout will be dedicated
 *      to the faculty-staff bio content type.
 *
 *      This content layout will be the organizer layout and will link to the
 *      full text layout to reveal the full article.
 *
 *      Document will write once when the page loads
 *
 *      @version 3.1
 */




 try {

    /***
     *  Assign local variables from the content type's fields
     * 
     * */
     

    var contentName = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Name' output='normal' modifiers='striptags,htmlentities' />");
    var employeeType = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Faculty' output='normal' display_field='value' />");
    var firstName = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='First Name' output='normal' modifiers='striptags,htmlentities' />");
    var lastName = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Last Name' output='normal' modifiers='striptags,htmlentities' />");
    var facultyStatus = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Faculty Status' output='normal' display_field='value' />");
    var primaryTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Primary Title' output='normal' modifiers='striptags,htmlentities />");
    var secondaryTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Secondary Title' output='normal' modifiers='striptags,htmlentities />");
    var primaryImage = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Profile Pic' output='normal' formatter='path/*' />");
    var emailAddress = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Email' output='normal' modifiers='striptags,htmlentities />");
    var roomNumber = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Room' output='normal' modifiers='striptags,htmlentities />");
    var cv = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='CV' output='normal' formatter='path/*' />");
    var cvLinkStatus = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Show link to CV' output='normal' display_field='value' />");
    var education = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Education' output='normal' modifiers='medialibrary,nav_sections' />");
    var expertise = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Areas of Expertise' output='normal' modifiers='medialibrary,nav_sections' />");
    var affiliations = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Affiliations' output='normal' modifiers='medialibrary,nav_sections' />");
    var courses = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Courses' output='normal' modifiers='medialibrary,nav_sections' />");
    var biography = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Biography' output='normal' modifiers='medialibrary,nav_sections' />");
    var publications = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Publications' output='normal' modifiers='medialibrary,nav_sections' />");
    var activity = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Activity' output='normal' modifiers='medialibrary,nav_sections' />");
    var fullTextLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Name' output='fulltext' use-element='true' filename-element='Name' modifiers='striptags,htmlentities' />");
    var anchorTag = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='html_anchor' />");
    var contentID = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='content_id' />");

    
 

    /***
     *  Declare/Assign local variables with base formatting
     * 
     * */
    // var cardText = "<span class='card-text summary'><p>" + profileSummary + "</p></span>";
    // var titleLink = "";
    // var listItems = "";
    // var listOfDegrees = "";
    // var listOfTitles = "";
    // var titleOne = "";
    // var degreeOne = "";
    // var contactPhone = "";
    // var contactEmail = "";


    var primaryImageString = '<img src="' + primaryImage + '" alt="' + firstName + ' ' + lastName + ', ' + primaryTitle + '">';
    var cardTitle = '<h3 class="card-title">' + firstName + ' ' + lastName + '</h3>';
    var primaryTitleString = '<p class="card-text">' + primaryTitle + '</p>';
    var emailAddressString = '<p class="card-text"><a href="mailto:' + emailAddress + '?subject = From Your Faculty Profile&body = Message">' + emailAddress + '</a></p>';
    var closeCardTitle = '</h3>';
    var openCardBody = '<div class="card-body">';
    var closeCardBody = '</div>';
    var openBodyWrapper = '<div class="col-md-8">';
    var closeBodyWrapper = '</div>';
    var openImageWrapper = '<div class="col-md-4">';
    var closeImageWrapper = '</div>';
    var openRow = '<div class="row g-0">';
    var closeRow = '</div>';
    var anchorWrap = '<div class="visually-hidden">' + anchorTag + '</div>';
    var beginningHTML = '<div class="card" aria-label="' + firstName + ' ' + lastName + '" id="id' + contentID + '" data-position-default="Main" data-position-selected="Main">';
    var endingHTML = '</div>';




    /***
     *  parse the list of degrees, add <li> tags
     * 
     * */
    // if (degrees != "") {
    //     var arrayOfDegrees = degrees.split('\n');
    //     listItems = "";
    //     for (let i = 0; i < arrayOfDegrees.length; i++) {
    //         listItems += '<li class="tag">' + arrayOfDegrees[i] + '</li>';
    //     }
    //     listOfDegrees = '<div class="tags"><ul class="profileDegrees">' + listItems + '</ul></div>';
    //     degreeOne = arrayOfDegrees[0];
    // }




    /***
     *  parse the list of titles, add <li> tags
     * 
     * */
    // if (titles != "") {
    //     var arrayOfTitles = titles.split('\n');
    //     listItems = "";
    //     for (let i = 0; i < arrayOfTitles.length; i++) {
    //         listItems += '<li class="tag">' + arrayOfTitles[i] + '</li>';
    //     }
    //     listOfTitles = '<div class="tags"><ul class="profileTitles">' + listItems + '</ul></div>';
    //     titleOne = arrayOfTitles[0];
    // }




    /***
     *  determine if the article contains full text content
     * 
     * */
    if (biography != "") {
        cardTitle = '<h3 class="card-title"><a href="' + fullTextLink + ' title="' + firstName + ' ' + lastName + ', ' + primaryTitle + '">' + firstName + ' ' + lastName + '</a></h3>';
    }




    /***
     *  verify Main image and photo credits
     * 
     * */
    // if (frontPageImage == "") {
    //     thumbNailString = '<span class="hidden">No Image Provided</span>';

    // } else {
    //     thumbNailString = '<span class="cardImageWrapper"><img src="' + frontPageImage + '" class="card-img-top" alt="' + profileTitle + '" /></span>';
    // }




    /***
     *  verify Phone
     * 
     * */
    // if (phone == "") {
    //     contactPhone = '<span class="hidden">No Phone Provided</span>';

    // } else {
    //     contactPhone = '<p class="contactInfo phone">Phone: ' + phone + '</p>';
    // }




    /***
     *  verify email
     * 
     * */
    // if (emailAddress == "") {
    //     contactEmail = '<span class="hidden">No Phone Provided</span>';

    // } else {
    //     contactEmail = '<p class="contactInfo">Email: ' + emailAddress + '</p>';
    // }



    
    /***
     *  Write the document once
     * 
     * */
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, beginningHTML));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, anchorWrap));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openRow));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openImageWrapper));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, primaryImageString));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeImageWrapper));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openBodyWrapper));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openCardBody));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, cardTitle));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, emailAddressString));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeCardBody));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeBodyWrapper));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeRow));
    document.write(endingHTML);


    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openCardBody));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openCardBody));





    document.write('<div class="card-body">');
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, titleLink));
    document.write('<div class="card-subtitle mb-2 text-muted">' + titleOne + '</div>');
    document.write('<div class="card-text">' + degreeOne + '</div>');
    document.write('</div>'); // close card-body
    document.write('<div class="card-footer">');
    document.write(contactPhone);
    document.write(contactEmail);
    document.write('</div>'); // close card-footer




} catch (err) {
    document.write(err.message);
}

 try {

    /***
     *  Assign local variables from the content type's fields
     * 
     * */
    var itemName = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Name' output='normal' modifiers='striptags,htmlentities' />");
    var itemTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Title' output='normal' display_field='value' />");
    var textLocation = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Location of text' output='normal' display_field='value' />");
    var description = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Description' output='normal' display_field='value' />");
    var backgroundImage = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Image' output='normal' formatter='path/*' />");
    var btnOneText = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Button 1 text' output='normal' modifiers='striptags,htmlentities' />");
    var btnOneLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Button 1 link' output='linkurl' modifiers='nav_sections' />");
    var btnOneTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Button 1 link' output='linktext' modifiers='nav_sections' />");
    var btnTwoText = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Button 2 text' output='normal' modifiers='striptags,htmlentities' />");
    var btnTwoLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Button 2 link' output='linkurl' modifiers='nav_sections' />");
    var btnTwoTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Button 2 link' output='linktext' modifiers='nav_sections' />");
    var anchorTag = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='html_anchor' />");
    var contentID = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='content_id' />");




    /***
     *  Declare/Assign local variables with default formatting and values
     * 
     * */
    var titleString = '<h2 id="label' + contentID + '">' + itemTitle + '</h2>';
    var openStandardContent = '<div class="panelText card-text"><div class="standardContent">';
    var closeStandardContent = '</div></div>'
    var openPanelInner = '<div class="panelInner col-12 col-lg-4 shadow ' + textLocation + '">';
    var closePanelInner = '</div>';
    var openPanelContainer = '<div class="panelFlexContainer ' + textLocation + '">'
    var closePanelContainer = '</div>';
    var imageString = '<img class="card-image-top" src="' + backgroundImage +'">';
    var openOverlay = '<div class="card-img-overlay card-inverse my-3">';
    var closeOverlay = '</div>';
    var openBlock = '<div class="card-block">';
    var closeBlock = '</div>';
    var btnOneString = '<li class="hidden visually-hidden"><a href="#" class="hidden visually-hidden card-link h-100" title="No Valid Link Provided"><span class="hidden visually-hidden d-inline-block align-middle">No Valid Link Provided</span></a></li>';
    var btnTwoString = '<li class="hidden visually-hidden"><a href="#" class="hidden visually-hidden card-link h-100" title="No Valid Link Provided"><span class="hidden visually-hidden d-inline-block align-middle">No Valid Link Provided</span></a></li>';
    var openLinksList = '<ul class="panelLinks flex-md-nowrap">';
    var closeLinksList = '</ul>';
    var descriptionString = '<div>' + description + '</div>';
    var beginningHTML = '<div class="panelWrapper contentItem g-0 container-fluid" title="' + itemTitle + '" id="id<t4 type=\'meta\' meta=\'content_id\' data-position-default="Main" data-position-selected="Main" role="presentation" aria-labelledby="label<t4 type=\'meta\' meta=\'content_id\' />"/>"><div class="col-12 card border-0">';
    var endingHTML = '</div></div>';




    /***
     *  Handle Selective Output Logic
     *      Button Links
     * 
     * */
    if (btnOneLink != "") {
        btnOneString = '<li><a href="' + btnOneLink + '" class="card-link h-100" title="' + btnOneTitle + '"><span class="d-inline-block align-middle">' + btnOneText + '</span></a></li>';
    }
    if (btnTwoLink != "") {
        btnTwoString = '<li><a href="' + btnTwoLink + '" class="card-link h-100" title="' + btnTwoTitle + '"><span class="d-inline-block align-middle">' + btnTwoText + '</span></a></li>';
    }



    /***
     *  Write the document once
     * 
     * */
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, beginningHTML));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, anchorTag));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, imageString));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openOverlay));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openBlock));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openPanelContainer));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openPanelInner));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openStandardContent));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, titleString));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, descriptionString));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openLinksList));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, btnOneString));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, btnTwoString));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeLinksList));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeStandardContent));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closePanelInner));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closePanelContainer));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeBlock));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeOverlay));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, endingHTML));




} catch (err) {
    document.write(err.message);
}
