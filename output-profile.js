/***
 *    @author Victor Chimenti, MSCS
 *    @see Seattle University School of Law Faculty Profile Type View
 *    @file output-profile.js
 *          Law - Faculty Profile
 *          ID: 5143
 *          output/profile
 *          For Status based masonry feeds
 *
 *      Document will write once when the page loads
 *
 *      @version 5.6.8
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
 *      and confirm valid existing content item field and trim strings
 */
function getContentValues(tag) {

    try {

        let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim();

        return {
            isError: false,
            content: _tag == '' ? null : _tag
        };

    } catch (error) {

        return {
            isError: true,
            message: error.message
        };
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
    let masonDict = {

        contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        fullName: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
        lastName: getContentValues('<t4 type="content" name="Last Name" output="normal" modifiers="striptags,htmlentities" />'),
        firstName: getContentValues('<t4 type="content" name="First Name" output="normal" modifiers="striptags,htmlentities" />'),
        facultyStatus: getContentValues('<t4 type="content" name="Faculty Status" output="normal" display_field="value" />'),
        primaryTitle: getContentValues('<t4 type="content" name="Primary Title" output="normal" modifiers="striptags,htmlentities" />'),
        emailAddress: getContentValues('<t4 type="content" name="Email" output="normal" modifiers="striptags,htmlentities,encode_emails" />'),
        primaryImage: getContentValues('<t4 type="content" name="Profile Pic" output="normal" formatter="path/*" />'),
        fullTextLink: getContentValues('<t4 type="content" name="Name" output="fulltext" use-element="true" filename-element="Name" modifiers="striptags,htmlentities" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    };




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
    let openRow = '<div class="row g-0">';
    let closeRow = '</div>';
    let openCard = '<div class="card h-100 w-100 border-0">';
    let closeCard = '</div>';
    let primaryImageString = '<span class="primaryImageString hidden visually-hidden">No Image Provided</span>';
    let endingHTML = '</article>';




    let beginningHTML = (masonDict.firstName.content && masonDict.lastName.content) ?
        '<article class="lawFacultyWrapper col flex-fill w-50" id="masonbio' + masonDict.contentId.content + '" aria-label="' + masonDict.firstName.content + ' ' + masonDict.lastName.content + '">' :
        '<article class="lawFacultyWrapper col flex-fill w-50" id="masonbio' + masonDict.contentId.content + '" aria-label="' + masonDict.contentName.content + '">';




    /***
     *  determine if the article contains full text content
     * 
     * */

    let cardTitle = (masonDict.fullName.content && masonDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + masonDict.fullTextLink.content + '" title="View the full profile of ' + masonDict.fullName.content + ', ' + masonDict.primaryTitle.content + '">' + masonDict.fullName.content + '</a></h3>' :
        (masonDict.fullName.content && !masonDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + masonDict.fullTextLink.content + '" title="View the full profile of ' + masonDict.fullName.content + '">' + masonDict.fullName.content + '</a></h3>' :
        (masonDict.firstName.content && masonDict.lastName.content && masonDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + masonDict.fullTextLink.content + '" title="View the full profile of ' + masonDict.firstName.content + ' ' + masonDict.lastName.content + ', ' + masonDict.primaryTitle.content + '">' + masonDict.firstName.content + ' ' + masonDict.lastName.content + '</a></h3>' :
        (masonDict.firstName.content && masonDict.lastName.content && !masonDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + masonDict.fullTextLink.content + '" title="View the full profile of ' + masonDict.firstName.content + ' ' + masonDict.lastName.content + '">' + masonDict.firstName.content + ' ' + masonDict.lastName.content + '</a></h3>' :
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + masonDict.fullTextLink.content + '" title="View the full profile of ' + masonDict.contentName.content + '">' + masonDict.contentName.content + '</a></h3>';




    /***
     *  parse email fields
     * 
     * */
    let emailAddressString = (masonDict.firstName.content && masonDict.lastName.content && masonDict.emailAddress.content) ?
        '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start"><a class="emailAddress card-link" href="mailto:' + masonDict.emailAddress.content + '?subject=From your Faculty Profile" title="Email ' + masonDict.firstName.content + ' ' + masonDict.lastName.content + '">Contact ' + masonDict.firstName.content + '</a></p>' :
        '<span class="hidden visually-hidden">No valid email information provided</span>';




    /***
     *  parse title fields
     * 
     * */
    let primaryTitleString = (masonDict.primaryTitle.content) ?
        '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start">' + masonDict.primaryTitle.content + '</p>' :
        '<span class="hidden visually-hidden">No valid Primary Title provided</span>';




    /***
     *  parse hidden search fields
     * 
     * */
    let facultyStatusString = (masonDict.facultyStatus.content) ?
        '<span class="visually-hidden facultyStatus">' + masonDict.facultyStatus.content + '</span>' :
        '<span class="visually-hidden facultyStatus">No Status Entered</span>';




    /***
     *  Parse for image
     * 
     * */
    if (masonDict.primaryImage.content) {

        let imageID = content.get('Profile Pic').getID();
        let mediaInfo = getMediaInfo(imageID);
        let media = readMedia(imageID);
        let info = new ImageInfo;
        info.setInput(media);

        let imageDefaultAlt = masonDict.fullName.content || masonDict.contentName.content;

        primaryImageString = (info.check()) ?
            '<figure class="figure"><img src="' + masonDict.primaryImage.content + '" class="articleImage figure-img card-img rounded-circle" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" /></figure>' :
            '<figure class="figure"><img src="' + masonDict.primaryImage.content + '" class="articleImage figure-img card-img rounded-circle" alt="' + imageDefaultAlt + '" loading="auto" /></figure>';
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
            primaryImageString,
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