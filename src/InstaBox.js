import './style.css'

export class InstaBox {

    constructor(username) {
        this.instaBioContainer = document.querySelector('#' + username)
        
        this.url = "https://instagram.com/" + username;
        this.userModel = {
            username: username,
            img: "",
            name: "",
            bio:"",
            external_url: "",
            followers: "",
            following: "",
            posts:"",
            wrapperDivToDisplay: "#" + username + ""
        }
      
        this.start()
    }
    
    start() {
        
        this.renderDisplay(this.instaBioContainer);
        fetch(this.url)
        .then(resolve => resolve.text())
        .then(res => {
        	this.userModel.img= this.getInfo('img', res),
            this.userModel.name= this.getInfo('name', res),
            this.userModel.bio= this.getInfo('bio', res),
            this.userModel.external_url = this.getInfo('external_url', res),
            this.userModel.followers= this.getInfo('followers', res),
            this.userModel.following= this.getInfo('following', res),
            this.userModel.posts= this.getInfo('posts', res)
            return this.userModel    
        })
        .then(user => {
            this.queryItem('follow_button').attributes[1].nodeValue = this.url
            this.queryItem('img').src = user.img
            this.queryItem('username').innerText = user.username
            this.queryItem('name').innerText = user.name
            this.queryItem('bio').innerHTML = this.unicodeToChar(user.bio).replace(/\\n/g, "<br />").replace(/\"\,/, "")
            this.queryItem('external_url').innerText = user.external_url
            this.queryItem('external_url').attributes[1].nodeValue = user.external_url
            this.queryItem('followers').innerText = user.followers
            this.queryItem('following').innerText = user.following
            this.queryItem('posts').innerText = user.posts
    
            this.loaded()
        })    
  
    }
    
    
    getInfo(info, data){
        var searchModel = {
            img: /\"profile_pic_url\":\"(http.+?)\"/,
            bio:/\"biography\":\"(.+?)\"/,
            external_url:/\"external_url\":\"(.+?)\"/,
            name:/\"full_name\":\"(.+?)\"/,
            followers: /\"edge_followed_by\":\{\"count\":(.+?)\},/,
            following: /\"edge_follow\":\{\"count\":(.+?)\},/,
            posts:/\"edge_owner_to_timeline_media\":\{\"count\":(.+?)\,\"/
        };
        return data.match(searchModel[info]) ? data.match(searchModel[info])[1] : "";
  
    }
  
  
    queryItem(item){
        var selector = {
            follow_button: ".profile-edit-btn",
            img: ".profile-image img",
            username: ".profile-user-name",
            name: ".profile-real-name",
            bio: ".profile-bio p",
            external_url: "a.external-url",
            followers:".profile-stat-count.followers",
            following:".profile-stat-count.following",
            posts:".profile-stat-count.posts"
        };
        
        var querySelectorValue = this.userModel.wrapperDivToDisplay + " .insta-bio-container " + selector[item]
        return document.querySelector(querySelectorValue);
    }
  
  
    /* HELPERS */
    unicodeToChar(text) {
        return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
    }
  
  adaptToContainerSize() {
    var elementSize = this.instaBioContainer.offsetWidth
    this.instaBioContainer.className = ""
    if (elementSize <= 741)
      this.instaBioContainer.className = 'insta-bio-small-display'
    
  }
  
    /* LOADER */
    loaded(){
        document.querySelector(this.userModel.wrapperDivToDisplay + " " + '.insta-bio-container').className = "insta-bio-container";
        document.querySelector(this.userModel.wrapperDivToDisplay + " " + '.spinner-loader-wrapper').remove();
      

        var self = this
        window.addEventListener('resize', function (event) {
            self.adaptToContainerSize()
        }, true);
        this.adaptToContainerSize()
    }

    renderDisplay (node) {
        node.innerHTML = '<div class="spinner-loader-wrapper"><div class="spinner"></div></div><div class="insta-bio-container do-not-display"><div class="profile"><div class="profile-image"><div class="circle"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="enable-background:new -580 439 577.9 194;" xml:space="preserve"><circle cx="50" cy="50" r="40" /></svg></div><img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"></div><div class="profile-user-settings"><h1 class="profile-user-name">Mayk Brito</h1><a class="profile-edit-btn" href="#" target="_blank">Follow</a></div><div class="profile-stats"><ul><li><span class="profile-stat-count posts">164</span> posts</li><li><span class="profile-stat-count followers">188</span> followers</li><li><span class="profile-stat-count following">206</span> following</li></ul></div><div class="profile-bio"><span class="profile-real-name">Jane Doe</span><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️</p><a class="external-url" href="#" target="_blank">https://re9sites.com</a></div></div></div>';
    }

}