{
    let createPost = function(param)
    {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e)
        {
            e.preventDefault();

            $.ajax(
                {
                    type:'post',
                    url:'/post/create',
                    data:newPostForm.serialize(),
                    success:function(data)
                    {
                        let newPost = newPostDom(data.data.post);
                        $('#post-list-container>ul').prepend(newPost)
                        deletePost($(' .post-delete-button',newPost));
                    },error:function(error)
                    {
                        console.log(error.responseText);

                    }
                }
            )
        })
        
    }

        // method to create a post in DOM

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
                <a class="post-delete-button" href="/post/destroy/${post._id}"><i class="fa-solid fa-trash fa-sm"></i></a>
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

        let deletePost = function(deleteLink)
        {
            $(deleteLink).click(function(e)
            {
                e.preventDefault();

                $.ajax(
                    {
                        type:'get',
                        url:$(deleteLink).prop('href'),
                        success:function(data)
                        {
                            $(`#post-${data.data.post_id}`).remove();
                        },
                        error:function(error)
                        {
                            console.log(error.responseText)
                        }

                    }
                )
            })
        }

    createPost();
}
