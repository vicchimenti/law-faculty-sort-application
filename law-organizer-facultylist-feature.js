/***
 *    @author Victor Chimenti, MSCS
 *    @see Seattle University School of Law Faculty Profile Masonry View
 *    @file law-organizer-facultylist-feature.js
 *          Law - Faculty Profile
 *          ID: 5143
 *          law/organizer/facultylist/feature
 *
 *      Document will write once when the page loads
 *
 *      @version 7.18.1
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
 *      and trim all strings
 */
function getContentValues(tag) {

    try {

        let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim();

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
    let listDict = {

        contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        fullName: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
        lastName: getContentValues('<t4 type="content" name="Last Name" output="normal" modifiers="striptags,htmlentities" />'),
        firstName: getContentValues('<t4 type="content" name="First Name" output="normal" modifiers="striptags,htmlentities" />'),
        primaryTitle: getContentValues('<t4 type="content" name="Primary Title" output="normal" modifiers="striptags,htmlentities" />'),
        emailAddress: getContentValues('<t4 type="content" name="Email" output="normal" modifiers="striptags,htmlentities,encode_emails" />'),
        fullTextLink: getContentValues('<t4 type="content" name="Name" output="fulltext" use-element="true" filename-element="Name" modifiers="striptags,htmlentities" />'),
        facultyStatus: getContentValues('<t4 type="content" name="Faculty Status" output="normal" display_field="value" />'),
        primaryImage: getContentValues('<t4 type="content" name="Profile Pic" output="normal" formatter="path/*" />'),
        biography: getContentValues('<t4 type="content" name="Biography" output="normal" modifiers="medialibrary,nav_sections" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    }




    /***
     *  Declare/Assign local variables with base formatting
     * 
     * */
    let openHiddenFields = '<div class="hiddenSearchText visually-hidden">';
    let closeHiddenFields = '</div>';
    let openCardBody = '<div class="card-body">';
    let closeCardBody = '</div>';
    let openBodyWrapper = '<div class="col-md-8 d-flex align-items-center">';
    let closeBodyWrapper = '</div>';
    let openImageWrapper = '<div class="col-md-4 d-flex align-items-center">';
    let closeImageWrapper = '</div>';
    let openFig = '<figure class="figure visually-hidden">';
    let closeFig = '</figure>'
    let openRow = '<div class="row g-0">';
    let closeRow = '</div>';
    let openCard = '<div class="feature-card card h-100 w-100 border-0 shadow-lg">';
    let closeCard = '</div>';
    let primaryImageString = '<span class="primaryImageString hidden visually-hidden">No Image Provided</span>';
    let emailAddressString = '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start"><a class="emailAddress card-link" href="mailto:' + listDict.emailAddress.content + '?subject=From your Faculty Profile" title="Email ' + listDict.firstName.content + ' ' + listDict.lastName.content + '">Contact ' + listDict.firstName.content + '</a></p>';
    let primaryTitleString = '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start">' + listDict.primaryTitle.content + '</p>';
    let beginningHTML = '<article class="lawFacultyWrapper listwrapper col flex-fill my-3 visually-hidden" id="featurebio' + listDict.contentId.content + '" aria-label="' + listDict.firstName.content + ' ' + listDict.lastName.content + '">';
    let endingHTML = '</article>';




    /***
     *  prioritize fullname h3 with primary title
     * 
     * */
    let cardTitle = (listDict.fullName.content && listDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + listDict.fullTextLink.content + '" title="' + listDict.fullName.content + ', ' + listDict.primaryTitle.content + '">' + listDict.fullName.content + '</a></h3>' :
        (listDict.fullName.content && !listDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + listDict.fullTextLink.content + '" title="' + listDict.fullName.content + '">' + listDict.fullName.content + '</a></h3>' :
        (listDict.firstName.content && listDict.lastName.content && listDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + listDict.fullTextLink.content + '" title="' + listDict.firstName.content + ' ' + listDict.lastName.content + ', ' + listDict.primaryTitle.content + '">' + listDict.firstName.content + ' ' + listDict.lastName.content + '</a></h3>' :
        (listDict.firstName.content && listDict.lastName.content && !listDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + listDict.fullTextLink.content + '" title="' + listDict.firstName.content + ' ' + listDict.lastName.content + '">' + listDict.firstName.content + ' ' + listDict.lastName.content + '</a></h3>' :
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + listDict.fullTextLink.content + '" title="' + listDict.contentName.content + '">' + listDict.contentName.content + '</a></h3>';




    /***
     *  parse hidden search fields
     * 
     * */
    let facultyStatusString = (listDict.facultyStatus.content) ?
        '<span class="visually-hidden facultyStatus">' + listDict.facultyStatus.content + '</span>' :
        '<span class="visually-hidden facultyStatus">No Status Entered</span>';




    /***
     *  Parse for image
     * 
     * */
    if (listDict.primaryImage.content) {

        let imageID = content.get('Profile Pic').getID();
        let mediaInfo = getMediaInfo(imageID);
        let media = readMedia(imageID);
        let info = new ImageInfo;
        info.setInput(media);

        let imageDefaultAlt = listDict.fullName.content || listDict.contentName.content;

        primaryImageString = (info.check()) ?
            '<img src="' + listDict.primaryImage.content + '" class="articleImage figure-img card-img p-0 m-0" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />' :
            '<img src="' + listDict.primaryImage.content + '" class="articleImage figure-img card-img p-0 m-0" alt="' + imageDefaultAlt + '" loading="auto" />';

        beginningHTML = (mediaInfo.getName().includes("no-profile-photo") || mediaInfo.getName().includes("No Photo Available")) ?
            '<article class="lawFacultyWrapper listwrapper col flex-fill my-3 visually-hidden" id="featurebio' + listDict.contentId.content + '" aria-label="' + listDict.firstName.content + ' ' + listDict.lastName.content + '">' :
            '<article class="lawFacultyWrapper listwrapper col flex-fill my-3" id="featurebio' + listDict.contentId.content + '" aria-label="' + listDict.firstName.content + ' ' + listDict.lastName.content + '">';

        openFig = '<figure class="figure">';
    }




    /***
     *  write document once
     * 
     * */
    writeDocument(
        [
            beginningHTML,
            openCard,
            openRow,
            openImageWrapper,
            openFig,
            primaryImageString,
            closeFig,
            closeImageWrapper,
            openBodyWrapper,
            openCardBody,
            cardTitle,
            primaryTitleString,
            emailAddressString,
            openHiddenFields,
            facultyStatusString,
            closeHiddenFields,
            closeCardBody,
            closeBodyWrapper,
            closeRow,
            closeCard,
            endingHTML
        ]
    );




} catch (err) {
    document.write(err.message);
}