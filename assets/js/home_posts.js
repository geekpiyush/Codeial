{
    // method to submit the form data using ajax

    let createPost = function()
    {
        let newPostForm = $('#new-post-form');
            newPostForm.submit(function(e)
            {
                e.preventDefault()

                $.ajax({
                    type: "post",
                    url: "/post/create",
                    data: newPostForm.serialize(),
                    success: function(data) 
                    {
                        let newPost = newPostDom(data.data.post);
                        $('#post-list-container>ul').prepend(newPost);
                        deletePost($(' .post-delete-button', newPost));

                     new PostComments(data.data.post._id);

                        new Noty({
                            theme: 'relax',
                            text: "Post published!",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
        
                    },error: function(err)
                    {
                        console.log('there is some error',err.responseText);
                    }
                });
           
            })
            
    }

    // method to create a post in dom

        let newPostDom = function(post)
        {
            return $(`<li id="post-${post._id}">
            <p>  
                ${post.content}
            <br>
            <small>
            <i class="fa-solid fa-user fa-lg"></i>
             ${post.user.name}
            </small>
             <a class="post-delete-button" href="/post/destroy/${post._id}">remove</a>

            </p>
            <div class="post-comment">
               
             <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="write your comment">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Comment">
             </form>
            
             <div class="comment-list">
                <ul id="post-comment-${post._id}">
                  
                </ul>
             </div>
            </div>
        </li>`)
        }

        // method for delete a post from DOM

        let deletePost = function(deleteLink)
        {
            $(deleteLink).click(function(e)
            { 
                e.preventDefault();

                $.ajax({
                    type: "get",
                    url:$(deleteLink).prop('href'),
                    success: function(data)
                    {
                        $(`#post-${data.data.post_id}`).remove();
                        new Noty({
                            theme: 'relax',
                            text: "Post Deleted",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    },
                    error: function(err)
                    {
                        console.log('there is some error....!',err.responseText)
                    }
                });
            })
        }

            // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }
        createPost();
        convertPostsToAjax();
}