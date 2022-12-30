<template>
  <div>
    <div>Index page</div>
    <div id="result" class="result">{{ data.resultText }}</div>
    <div id="input" class="input-box">
      <input id="name" v-model="data.name" autocomplete="off" class="input" type="text"/>
      <button class="btn" style="width: 100px" @click="indexGreet">index Greet</button>
    </div>
    <div id="iframe-view"></div>
  </div>

</template>

<script setup>


import {onMounted, reactive} from 'vue'
const data = reactive({
  name: "",
  resultText: "Please enter your name below 👇",
})
const indexGreet = () => {
  window['go']['main']['App']['Greet'](data.name).then(result => {
    data.resultText = result
  })
}

onMounted(() => {
  const iframeNode = document.createElement("iframe")
  iframeNode.src = '/#/commons/iframe-template'
  iframeNode.onload = () => {
    const iframeContentDocument = iframeNode.contentDocument
    const style = document.createElement('style')
    style.type = 'text/css'
    style.textContent = `
  .result {
  height: 20px;
  line-height: 20px;
  margin: 1.5rem auto;
}

.input-box .btn {
  width: 60px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  border: none;
  margin: 0 0 0 20px;
  padding: 0 8px;
  cursor: pointer;
}

.input-box .btn:hover {
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  color: #333333;
}

.input-box .input {
  border: none;
  border-radius: 3px;
  outline: none;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  background-color: rgba(240, 240, 240, 1);
  -webkit-font-smoothing: antialiased;
}

.input-box .input:hover {
  border: none;
  background-color: rgba(255, 255, 255, 1);
}

.input-box .input:focus {
  border: none;
  background-color: rgba(255, 255, 255, 1);
}
  `
    iframeContentDocument.head.appendChild(style)
    const divNode = document.createElement('div')
    divNode.innerHTML = `
    <div id="app2">
        <div>iframe page</div>
        <div id="result" class="result">{{ data.resultText }}</div>
          <div id="input" class="input-box">
            <input id="name" v-model="data.name" autocomplete="off" class="input" type="text"/>
            <button class="btn" style="width: 100px" @click="iframeGreet">iframe Greet</button>
            <button class="btn" style="width: 100px" @click="parentGreet">parent Greet</button>
        </div>
    </div>
  `
    iframeContentDocument.getElementById('app').remove()
    iframeContentDocument.body.appendChild(divNode)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.text = `
    Vue.createApp({
      data() {
        return {
          data: {
            name: "",
            resultText: "Please enter your name below 👇",
          }
        }
      },
      mounted() {
        console.log(\`the iframe page is now mounted.\`)
      },
      methods: {
        iframeGreet() {
          window['go']['main']['App']['Greet'](this.data.name).then(result => {
            this.data.resultText = result
          })
        },
        parentGreet() {
          window.parent.window['go']['main']['App']['Greet'](this.data.name).then(result => {
            this.data.resultText = result
          })
        }
      },
    }).mount('#app2')
    `
    iframeContentDocument.head.appendChild(script)

  }
  document.getElementById('iframe-view').appendChild(iframeNode)
})

</script>

<style>
iframe{
  min-height: 550px;
  height: 100%;
  width: 100%;
  border-width: 0;
  border-style: none;
  border-color: unset;
  border-image: none;
}

.result {
  height: 20px;
  line-height: 20px;
  margin: 1.5rem auto;
}

.input-box .btn {
  width: 60px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  border: none;
  margin: 0 0 0 20px;
  padding: 0 8px;
  cursor: pointer;
}

.input-box .btn:hover {
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  color: #333333;
}

.input-box .input {
  border: none;
  border-radius: 3px;
  outline: none;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  background-color: rgba(240, 240, 240, 1);
  -webkit-font-smoothing: antialiased;
}

.input-box .input:hover {
  border: none;
  background-color: rgba(255, 255, 255, 1);
}

.input-box .input:focus {
  border: none;
  background-color: rgba(255, 255, 255, 1);
}

</style>