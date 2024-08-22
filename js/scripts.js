function setModal(triggerSelector, modalSelector, closeSelector) {
  const triggers = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        body = document.querySelector('body'),
        video = modal.querySelector('video');
  
  let isOpen = false;

  const showModal = (trigger) => {
      modal.classList.remove('none');
      isOpen = true;
      body.style.overflow = 'hidden';
    
      if(trigger.dataset.video) {
        video.src = trigger.dataset.video;
      }

      video && video.play();
  };

  const closeModal = () => {
      modal.classList.add('none');
      isOpen = false;
      body.style.overflow = 'unset';
      video && video.pause();
  };

  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
          closeModal();
      };
  });

  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          closeModal();
      }
  })

  if (triggers) {
      triggers.forEach(trigger => {
          trigger.addEventListener('click', () => {
              showModal(trigger);

              const close = modal.querySelector(closeSelector);
              
              close.addEventListener('click', () => {
                  closeModal();
              });

          });
      })
  };
};

function setMobileMenu(triggerSelector, modalSelector, modalShowSelector, closeSelector){
    const trigger = document.querySelector(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          body = document.querySelector('body');
    
    let isOpen = false;

    const openModal = () => {
        body.style.overflow = 'hidden';
        modal.classList.add(modalShowSelector);
        isOpen = true;
    };

    const closeModal = () => {
        modal.classList.remove(modalShowSelector);
        body.style.overflow = 'unset';
        isOpen = false;
    };


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            closeModal();
        };
    });

    trigger.addEventListener('click', openModal);
    close && close.addEventListener('click', closeModal);
};


function showHideItem(triggerSelector, hideElementSelector, showSelector) {
    const trigger = document.querySelector(triggerSelector)
    const hideElement = trigger.querySelector(hideElementSelector);
    
    trigger.addEventListener('click', (e) => {
        if (e.target === hideElement) return;

        hideElement.classList.toggle(showSelector);
    });
}

function setZoomGallery(imgSelector) {
    const triggers = document.querySelectorAll(imgSelector),
    modal = document.querySelector('.modal-gallery'),
    modalImg = document.querySelector('.modal-gallery__img'),
    body = document.querySelector('body');

    let isOpen = false;
    let timeOut = null;

    const showModal = () => {
        modal.classList.remove('none');
        isOpen = true;
        body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.add('none');
        isOpen = false;
        body.style.overflow = 'unset';
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            closeModal();
        };
    });

    modal.addEventListener('click', (e) => {
        closeModal();
    })

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const imgSrc = trigger.src;
            const altImg = trigger.alt;

            modalImg.src = imgSrc;
            modalImg.alt = altImg;
            
            showModal();
        });
    })   
}


function setTabs(tabsElements, activeTabSelector, contentElements) {
    let lastContent = contentElements[0];
    let lastTab = tabsElements[0];
    
    console.log(tabsElements);
    console.log(contentElements)
    tabsElements.forEach((item, index) => {
        contentElements[index].classList.add('fadeOutFromNone');
        item.addEventListener('click', () => {
            lastContent.classList.add('none');
            lastTab.classList.remove(activeTabSelector.replace(/[.]/g, ''));
        
            tabsElements[index].classList.add(activeTabSelector.replace(/[.]/g, ''));
            contentElements[index].classList.remove('none');

            lastTab = tabsElements[index];
            lastContent = contentElements[index];

        });
    });
};



function setTabPrice(tabSelector, activeTabSelector, contentSelector) {
    const tabs = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    setTabs(tabs, activeTabSelector, content);

    content.forEach((category) => {
        const priceButtons = category.querySelectorAll('.price__category-button');
        const priceButtonActiveSelector = '.active';
        const priceContent = category.querySelectorAll('.price__content');
        setTabs(priceButtons, priceButtonActiveSelector, priceContent);
    });
};


function setFormCustomSelect(formSelector, selectSelector, selectWrapperSelector, optionSelector, submenuSelector, itemSelector) {
    const form = document.querySelector(formSelector);
    const selectWrapper = form.querySelector(selectWrapperSelector);    
    const select = selectWrapper.querySelector(selectSelector);
    const option = select.querySelector(optionSelector);
    const submenu = form.querySelector(submenuSelector);
    const items = submenu.querySelectorAll(itemSelector);

    let lastActiveItem = items[0];

    const toggleShowMenu = () => {
        submenu.classList.toggle('none');
    }

    selectWrapper.addEventListener('click', () => {
        toggleShowMenu();
    });

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            lastActiveItem.classList.remove('active');
            item.classList.add('active');
            lastActiveItem = item;
            
            option.value = item.dataset.formValue;
            option.textContent = item.dataset.formValue;
            toggleShowMenu();
        })
    });
}