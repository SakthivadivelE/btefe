export interface loginData{
    username:string,
    password:string
}

export interface user{
    date:string,
    email:string,
    empID:number,
    interest:string,
    isAdmin:number,
    last_login:string,
    last_logout_time:string,
    notify:number,
    password:string,
    token_expire:string,
    user_id:number,
    username:string
}

export interface userData {
    user:user,
    error:any
}

export interface topics {
    topic_id:number,
    title:string
}

export interface postData {
    post_id:string,
    title:string,
    description:string,
    user_id:string,
    topic_id:string,
    created_date:string,
    solution:string,
    isApproved:string,
    isRejected:string,
    rejectReason:string,
    total_answers:string,
    last_updated:string
  };