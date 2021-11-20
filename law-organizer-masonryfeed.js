/***
 *    @author Victor Chimenti, MSCS
 *    @see Seattle University School of Law Faculty Profile Masonry View
 *    @file law-organizer-masonryfeed.js
 *          Law - Faculty Profile
 *          ID: 5143
 *          law/organizer/masonryfeed/
 *
 *      Document will write once when the page loads
 *
 *      @version 5.0
 */








/***
 *      Import T4 Utilities
 */
 importClass(com.terminalfour.media.IMediaManager);
 importClass(com.terminalfour.spring.ApplicationContextProvider);
 importClass(com.terminalfour.publish.utils.BrokerUtils);
 importClass(com.terminalfour.media.utils.ImageInfo);
 
 
 
 
 /***
  *      Extract values from T4 element tags
  *      and confirm valid existing content item field
  */
 function getContentValues(tag) {
     try {
         let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)
         return {
             isError: false,
             content: _tag == '' ? null : _tag
         }
     } catch (error) {
         return {
             isError: true,
             message: error.message
         }
     }
 }
 
 
 
 
 /***
  *      Returns a media object
  */
 function getMediaInfo(mediaID) {
 
     let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
     let media = mediaManager.get(mediaID, language);
 
     return media;
 }
 
 
 
 
 /***
  *      Returns a media stream object
  */
 function readMedia(mediaID) {
 
     let mediaObj = getMediaInfo(mediaID);
     let oMediaStream = mediaObj.getMedia();
 
     return oMediaStream;
 }
 
 
 
 
 /***
  *      Returns an array of list items
  */
 function assignList(arrayOfValues) {
 
     let listValues = '';
 
     for (let i = 0; i < arrayOfValues.length; i++) {
 
         listValues += '<li class="tag">' + arrayOfValues[i].trim() + '</li>';
     }
 
     return listValues;
 }
 
 
 
 
 /***
  *      Write the document
  */
 function writeDocument(array) {
 
     for (let i = 0; i < array.length; i++) {
 
         document.write(array[i]);
     }
 }




/***
 *      Main
 */
 try {


    /***
     *      Dictionary of content
     * */
    let masonDict = {}

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
    var emailAddress = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Email' output='normal' modifiers='striptags,htmlentities,encode_emails' />");
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
    var fullTextLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Name' output='fulltext' use-element='true' modifiers='striptags,htmlentities' />");
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
    var emailAddressString = '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start"><a href="mailto:' + emailAddress + '?subject=From your Faculty Profile" title="Email ' + firstName + ' ' + lastName + '">Contact ' + firstName + '</a></p>';
    var closeCardTitle = '</h3>';
    var openCardBody = '<div class="card-body">';
    var closeCardBody = '</div>';
    var openBodyWrapper = '<div class="col-md-8 d-flex align-items-center">';
    var closeBodyWrapper = '</div>';
    var openImageWrapper = '<div class="col-md-4 d-flex align-items-center">';
    var closeImageWrapper = '</div>';
    var openRow = '<div class="row g-0">';
    var closeRow = '</div>';
    var openCard = '<div class="card h-100 w-100 border-0">'
    var closeCard = '</div>';
    var beginningHTML = '<article class="lawFacultyWrapper contentItem col flex-fill w-50" aria-label="' + firstName + ' ' + lastName + '" id="id' + contentID + '" data-position-default="Main" data-position-selected="Main">';
    var endingHTML = '</article>';
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
