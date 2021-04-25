/***
 *      @author Victor Chimenti, MSCS-SE '20
 *      @file law-organizer-masonryfeed.js
 *      @see Seattle University School of Law Faculty Profile Type
 *      law/organizer/masonryfeed/
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
 *      @version 4.17
 */




 try {

    /***
     *  Assign local variables from the content type's fields
     * 
     * */
    var contentName = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Name' output='normal' modifiers='striptags,htmlentities' />");
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
    var fullTextLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Name' output='fulltext' modifiers='striptags,htmlentities' />");
    var anchorTag = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='html_anchor' />");
    var contentID = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='content_id' />");

    
 

    /***
     *  Declare/Assign local variables with base formatting
     * 
     * */
    var hiddenFields = '';
    var openHiddenFields = '<div class="hiddenSearchText visually-hidden">';
    var closeHiddenFields = '</div>';
    var primaryImageString = '<img src="' + primaryImage + '" class="card-img rounded-circle" alt="' + firstName + ' ' + lastName + ', ' + primaryTitle + '">';
    var cardTitle = '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0">' + firstName + ' ' + lastName + '</h3>';
    var primaryTitleString = '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start">' + primaryTitle + '</p>';
    var emailAddressString = '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start">' + emailAddress + '</p>';
    var closeCardTitle = '</h3>';
    var openCardBody = '<div class="card-body">';
    var closeCardBody = '</div>';
    var openBodyWrapper = '<div class="col-md-8 d-flex align-items-center">';
    var closeBodyWrapper = '</div>';
    var openImageWrapper = '<div class="col-md-4 d-flex align-items-center">';
    var closeImageWrapper = '</div>';
    var openRow = '<div class="row g-0">';
    var closeRow = '</div>';
    var anchorWrap = '<div class="visually-hidden">' + anchorTag + '</div>';
    var openCard = '<div class="card h-100 w-100 border-0">'
    var closeCard = '</div>';
    var beginningHTML = '<div class="lawFacultyWrapper contentItem col flex-fill w-50" aria-label="' + firstName + ' ' + lastName + '" id="id' + contentID + '" data-position-default="Main" data-position-selected="Main">';
    var endingHTML = '</div>';
    var horizontalRule = '<hr class="lawProfileBorderRule" />'




    /***
     *  determine if the article contains full text content
     * 
     * */
    if (biography != "") {
        cardTitle = '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a href="' + fullTextLink + '" title="' + firstName + ' ' + lastName + ', ' + primaryTitle + '">' + firstName + ' ' + lastName + '</a></h3>';
    }




    /***
     *  write hidden search fields
     * 
     * */
    if (secondaryTitle != "") {
        var secondaryTitleHidden = '<span class="visually-hidden secondaryTitle">' + secondaryTitle + '</span>';
        hiddenFields += secondaryTitleHidden;
    }
    if (education != "") {
        var educationHidden = '<span class="visually-hidden education">' + education + '</span>';
        hiddenFields += educationHidden;
    }
    if (expertise != "") {
        var expertiseHidden = '<span class="visually-hidden expertise">' + expertise + '</span>';
        hiddenFields += expertiseHidden;
    }
    if (affiliations != "") {
        var affiliationsHidden = '<span class="visually-hidden affiliations">' + affiliations + '</span>';
        hiddenFields += affiliationsHidden;
    }
    if (courses != "") {
        var coursesHidden = '<span class="visually-hidden courses">' + courses + '</span>';
        hiddenFields += coursesHidden;
    }
    if (biography != "") {
        var biographyHidden = '<span class="visually-hidden biography">' + biography + '</span>';
        hiddenFields += biographyHidden;
    }
    if (publications != "") {
        var publicationsHidden = '<span class="visually-hidden publications">' + publications + '</span>';
        hiddenFields += publicationsHidden;
    }
    if (activity != "") {
        var activityHidden = '<span class="visually-hidden activity">' + activity + '</span>';
        hiddenFields += activityHidden;
    }
    if (facultyStatus != "") {
        var facultyStatusyHidden = '<span class="visually-hidden facultyStatus">' + facultyStatus + '</span>';
        hiddenFields += facultyStatusyHidden;
    }

    


    /***
     *  Write the document once
     * 
     * */
    document.write(beginningHTML);
    document.write(anchorTag);
    document.write(openCard);
    document.write(openRow);
    document.write(openImageWrapper);
    document.write(primaryImageString);
    document.write(closeImageWrapper);
    document.write(openBodyWrapper);
    document.write(openCardBody);
    document.write(cardTitle);
    document.write(primaryTitleString);
    document.write(emailAddressString);
    document.write(closeCardBody);
    document.write(closeBodyWrapper);
    document.write(closeRow);
    document.write(openHiddenFields);
    document.write(hiddenFields);
    document.write(closeHiddenFields);
    document.write(closeCard);
    document.write(horizontalRule);
    document.write(endingHTML);




} catch (err) {
    document.write(err.message);
}
