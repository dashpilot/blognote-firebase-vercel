const template = `
<div class="container text-center" x-data="cardApp()">
  <div class="box p-50">
<template x-if="!$store.user.loggedIn">
<div>
<h1>BlogNote</h1>
<p class="tagline mt-10">Please Sign In</p>
<div class="mt-20 mb-50">
<a class="button is-medium mt-20 ml" @click="relay()">Sign In</a>
</div>
</div>
</template>

<template x-if="$store.user.loggedIn">
  <div>
    <img src="/img/vite-alpine.png" class="w-30" />
    <h1>Vite & Alpine</h1>
    <p class="tagline mt-10 mb-50">Starter Template</p>
    <label class="label mt-25">Your name:</label>
    <input class="input w-50" type="text" x-model="name">

    <div class="mt-20 mb-50">
    <button class="button is-link is-medium mt-20 mr" @click="save()">Save</button>
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
    init() {
      console.log('card component loaded');
    },
    relay() {
      document.querySelector('#signIn').click();
    },
    save() {


      call_api('github/set-data', 'test4.md', 'text', this.name).then(function(res) {
        if (res.ok) {
          console.log(res.msg);
          alert('saved');
          return true;
        } else {
          console.log('An error occured' + res);
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