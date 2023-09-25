document.addEventListener('DOMContentLoaded', () => {
    function modal () {
        let modal = document.querySelectorAll('.modal');
        let modalWrap = document.querySelector('.modal-wrap');
        let dim = document.querySelector('.modal-wrap .dim');
        let modalCloseBtn = document.querySelectorAll('.btn-close');

        // open modal
        function modalOpen () {
            document.addEventListener('click', (e) => {
                let dataTarget = e.target.getAttribute('data-target');
                let targetModal = document.querySelector('.'+dataTarget);
                
                if (dataTarget != null) {
                    modalWrap.style.display = 'block';
                    targetModal.setAttribute('style', 'display: block;top: 50%;left: 50%;transform: translate(-50%, -50%);')
                }
            })
        }
        modalOpen ();

        // close modal
        function modalClose () {        
            dim.addEventListener('click', () => {
                close();
            })

            modalCloseBtn.forEach(el => {
                el.addEventListener('click', () => {
                    close();
                })
            })

            // close
            function close () {
                modalWrap.style.display = 'none';
                modal.forEach(el => {
                    el.style.display = 'none';
                })
            }
        }
        modalClose ();
    }
    modal ();
})