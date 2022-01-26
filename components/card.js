const template = `
<div class="container" x-data="cardApp()">
  <div class="box">
<template x-if="!$store.app.loggedIn">
<div class="text-center p-50">
<h2>BlogNote</h2>
<p class="tagline mt-10">Please Sign In</p>
<div class="mt-20">
<a class="button is-medium mt-20 ml" @click="relay()">Sign In</a>
</div>
</div>
</template>

<template x-if="$store.app.loggedIn">
  <div>
  <div class="columns">
    <div class="column is-one-quarter" id="sidebar">

    <template x-for="item in $store.items">
      <a class="side-tab" :class="{ 'active': $store.app.curItem.id == item.id }" @click="$store.app.curItem = item"><span class="ellipsis overflow-hidden block" style="white-space: nowrap; max-width: 190px;" x-text="item.title"></span></a>
    </template>

    </div>
    <div class="column" id="main">

  <template x-if="$store.app.curItem.id">
    <div>
      <label class="label">Title</label>
      <input class="input" type="text" placeholder="title" x-model="$store.app.curItem.title">

      <label class="label">Body</label>
      <textarea class="input" placeholder="title" x-model="$store.app.curItem.body"></textarea>

      <div class="mb-20 mt">
      <button class="button" @click="save()">
      <template x-if="loading">
        <i class="fas fa-spinner fa-spin mr"></i>
      </template>
      Save</button>
      </div>
    </div>
  </template>

  <template x-if="!$store.app.curItem.id">
    <div class="intro-alert">
      <h3>Welcome to BlogNote</h3>

      <div class="notification is-warning mt-15">

      BlogNote is a simple micro-CMS that saves to your Github repo. Great for your SPA or Static Site Generator
</div>

    </div>
  </template>


    </div>

    </div>

  </div>
</template>

  </div>
</div>
`

export default () => {
  return {
    template: template,
    name: '',
    loading: false,
    init() {
      console.log('card component loaded');
    },
    relay() {
      document.querySelector('#signIn').click();
    },
    save() {
      this.loading = true;
      var myapp = this;
      call_api('github/set-data', 'data.json', 'json', this.entries).then(function(res) {
        if (res.ok) {
          console.log(res.msg);
          myapp.loading = false;
          return true;
        } else {
          console.log('An error occured' + res);
          myapp.loading = false;
          return false;
        }
      });

      /*
            setData('github', 'test2.md', 'text', this.name).then(function() {
              alert('saved!');
            })
            */
    }
  }
}