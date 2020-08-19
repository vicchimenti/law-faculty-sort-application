<script type="text/javascript">
/***
*   @author Victor Chimenti, MSCS-SE '20
*   @file profile-filter.js
*   @see UCOR, UNIVERSITY CORE CURRICULUM, https://www.seattleu.edu/core/for-students/courses/
*   as an example of this filter engine
*   This URI will change after launch to to suit the host department
*
*   jQuery
*   This script searches the Law School faculty profile content items for matches to the
*   user selected search parameters in the filter field dropdown menus
*
*   @version 2.2
*/






    $(function () {
        // After the DOM is ready, Wait until the window loads
        $(window).load(function () {
            // Once window loads set a timeout delay
            setTimeout(function () {




                //** global array holds list of content items that will render after filter selection **//
                var visibleItems = [];
                var parseItems = {};




                //   ***   Process and Parse Visible Items   ***   //
                $(function () {
                    let parseItemsToDisplay = function () {
                        // assign array of currently visible content items
                        visibleItems = $('.facultyListItemWrapper').not('.hideByText, .hideByType');
                        // check to see if array is empty
                        if (visibleItems.length == 0) {
                            // when array is empty show the results message
                            $('.noResultsToShow').removeClass('hideResultsMessage');
                        } else {
                            // when array has content items suppress the results message
                            $('.noResultsToShow').addClass('hideResultsMessage');
                        }
                    };
                    parseItems.process = parseItemsToDisplay;
                });




                //   ***   Keyword Search   ***   //
                $(function () {
                    // scan the keyword each character the user inputs
                    $('#keystroke_filter').on('keyup', function () {
                        // Assign Search Key
                        let keyword = $(this).val().toLowerCase();
                        // filter the education abroad items for the input key
                        $(function () {
                            $('.facultyListItemWrapper').filter(function () {
                                // when the search key is not present in the item then hide the item
                                $(this).toggleClass('hideByText', !($(this).text().toLowerCase().indexOf(keyword) > -1));
                            });
                        });
                        // parse out unselected content items and limit display to user selected items
                        parseItems.process();
                    });
                });





                //   ***   Type Filter   ***   //
                $(function () {
                    // When the Dropdown Menu Selector Course Types Change - Execute change function
                    $('#SelectBox-ByType').change(function () {
                        // Assign Search Key
                        let typeKey = $(this).val();
                        // If Search Key is Not Null then Compare to the Type List Items in Each Content Item
                        if (typeKey) {
                            $('.articleType').filter(function (i, e) {
                                var typeValue = $(this).text();
                                // Check to see if the Key and Value are a Match
                                if (typeValue.match(typeKey)) {
                                    $(this).parents('.facultyListItemWrapper').removeClass('hideByType');
                                } else {
                                    $(this).parents('.facultyListItemWrapper').addClass('hideByType');
                                }
                            });
                            // Else the Search Key is Null so Reset all Content Items to Visible
                        } else {
                            $('.facultyListItemWrapper').removeClass('hideByType');
                        }
                        // parse out unselected content items and limit display to user selected items
                        parseItems.process();
                    });
                });
            }, 10);
        });
});
</script>