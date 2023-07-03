/* template js start */
document.body.addEventListener("click", function (e) {
    if (e.target.className.includes('product-img') || e.target.className.includes('cta') ) return
    if (!e.target.className.includes('btn')) {
      console.log('inside click tag');
      window.openLink("clickTag1");
    }  
  });
  
  var productsDiv = document.querySelector('.products');
  var productTitle;
  var productWrappers;
  var firstProductWrapper;
  var activeIndex = 0;
  
  let btnClick = 0;
  let pageClick = 0;
  
  const back = document.querySelector('.back');
  const forward = document.querySelector('.forward');
  const icon = document.querySelector('.icon');
  const legal = document.querySelector('.legal');
  
  
  icon.addEventListener('mouseover', () => {
    legal.style.display = 'flex'
    icon.style.opacity = '.6'
  });
  icon.addEventListener('mouseout', () => {
    legal.style.display = 'none'
    icon.style.opacity = '1'
  });
  
  /* Begin slideshow */
  /* Car carousel */
  const nextCar = () => {
    document.querySelector('.active-sec').classList.remove('active-sec')
    imageWrappers[activeIndex].classList.add('active-sec')
  
    productWrappers[activeIndex].scrollIntoView({block: "nearest", inline: "nearest"});
    updateLegal()
    const carLinks = Array.from(document.querySelectorAll('.click')).map(x => x.href);
    document.querySelector('.cta-a').href = carLinks[activeIndex];
  }; 
  
  /* Imgage slideshow */
  const startSlideshow = () => {
    const first = Array.from(document.querySelectorAll('.first'))
    const carLinks = Array.from(document.querySelectorAll('.click')).map(x => x.href);
    document.querySelector('.cta-a').href = carLinks[activeIndex];
    
    first.map(x => x.classList.add('active-slide'));
  
    setInterval(() => {
      first.forEach(first => {
        if (first.classList.contains('active-slide')){
          first.classList.add("next-slide")
          first.classList.remove("active-slide")
          first.nextElementSibling.classList.add("active-slide")
  
          setTimeout(() => {
            first.classList.remove("next-slide")
          }, 800)
        } else {
          first.nextElementSibling.classList.add("next-slide")
          first.nextElementSibling.classList.remove("active-slide")
          first.classList.add("active-slide")
  
          setTimeout(() => {
            first.nextElementSibling.classList.remove("next-slide")
          }, 800)
        }
      })
    }, 3000)
  };
  
  back.addEventListener('click', () => {
    if (activeIndex === 0) return;
    activeIndex--;
    nextCar();
    clearInterval(startSlideshow)
  });
  
  forward.addEventListener('click', () => {
    if (activeIndex === productWrappers.length - 1) return;
    activeIndex++;
    nextCar();
    clearInterval(startSlideshow)
  });
  
  setInterval(() => {
    if (activeIndex === 0) {
      back.style.opacity = ".12"
    } else if (activeIndex === productWrappers.length - 1) {
      forward.style.opacity = ".12"
    } else {
      back.style.opacity = ".85"
      forward.style.opacity = ".85"
    }
  }, 500);
  
  
  const updateSlide = () => {
    productWrappers = document.querySelectorAll("[class*='slide-']");
    imageWrappers = document.querySelectorAll("[class*='ind-']");
    if (productWrappers.length > 0) {
      firstProductWrapper = productWrappers[0];
      imageWrappers[0].classList.add('active-sec')
    }
  };
  
  updateSlide();
  
  /* End slideshow */
  const formatter = new Intl.NumberFormat('se-SE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  var d = new Date();
  d.setSeconds(0, 0);
  var cacheBuster = d.toISOString();
  
  const fetchData = async () => {
  const data = await fetch('https://video.seenthis.se/public/feeds/1f1f9dc6-3131-41df-a65f-db84cbdcca82/current.json?v' + cacheBuster).then(response => response.json())
  
    data.items.map(() => {
      const template = (item, index) => (
        `
            <li class="slide-${index} product-wrapper">
            <div>
              <div class="copy">
             
                <span>TILLGÄNGLIG NU</span><br><br>
  
                <p class="model">${item.title}<p>
              </div>
              <div class="text">
              <span>Kontantpris</span><br>
                  ${formatter.format(item.price.replace(/\D/g, ''))} SEK
              </div>  
              <a class="click" target="_blank" href="${item.url}?tl=dis-gdnw-bfqq-tac-miy-.-bann-.-OnlineStore_A_all-.-e0daaf9e7d1c">
              <img class="product-img" src="${item.image_Exterior}"/>
              </a>
              </div>
            </li>
            `
      );
      const images = (item, index) => (
        console.log(item.image_InteriorDashboard.size)
        `
        <section class="section ind-${index}">
          <img src="${item.image_InteriorDashboard}" class="first slide " />
          <img src="${item.image_InteriorFrontRow}" class="slide" />
        </section>
          `
      );
      productsDiv.innerHTML = data.items.map(template).join('');
      document.querySelector('.interior').innerHTML = data.items.map(images).join('');
      updateSlide();
      startSlideshow();
    });
    updateLegal();
  };
  
  let legalText = [
  'BMW iX1 xDrive30. Strömförbrukning. kWh/100 km bl. körning (WLTP): 16,9-18,1. Utsläpp CO2 g/km: 0.',
  'BMW i4 eDrive40. Strömförbrukning. kWh/100 km bl. körning (WLTP): 16,1-19,1. Utsläpp CO2 g/km: 0.',
  'BMW iX3. Strömförbrukning. kWh/100 km bl. körning (WLTP): 18,5-18,9. Utsläpp CO₂ g/km: 0.',
  'BMW iX xDrive40: Strömförbrukning. kWh/100 km bl. körning (WLTP): 19,4-23,0. Utsläpp CO₂ g/km: 0.',
  'BMW i7 xDrive60. Strömförbrukning. kWh/100 km bl. körning (WLTP): 18,4-19,6. Utsläpp CO2 g/km: 0.'
  ];
  
  const updateLegal = async () => {
    const arr = Array.from(document.querySelectorAll('.model')).map(x => x.textContent)
    const model = arr[activeIndex].split(' ')[0]
    
      switch (model) {
        case 'iX1':
        document.querySelector('.legal-text').textContent = `${legalText[0]}`;
        break;
        case 'i4':
        document.querySelector('.legal-text').textContent = `${legalText[1]}`;
        break;
        case 'iX3':
        document.querySelector('.legal-text').textContent = `${legalText[2]}`;
        break;
        case 'iX':
        document.querySelector('.legal-text').textContent = `${legalText[3]}`;
         break;
       case 'i7':
        document.querySelector('.legal-text').textContent = `${legalText[4]}`;
        break;
        default: 
        document.querySelector('.legal-text').textContent = `Felmeddelande: För fakta om strömförbrukning, kontakta BMW eller besök bmw.se`;   
    };
  }; 
  
  fetchData();
  /* template js end */
  
  /* Custom Events */
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
      if (btnClick > 0) return
      trackCustomEvent('shoppable-select-1');
      btnClick++
    } else {
      if (pageClick > 0) return
      trackCustomEvent('shoppable-select-2');
      pageClick++
    }
  })
  
  
  
  