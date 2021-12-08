
    const btnOpenModal=document.querySelector('#btnOpenModal');
    const modalTitle=document.querySelector('.modal-title');
    const modalBlock=document.querySelector('#modalBlock');
    const closeModal=document.querySelector('#closeModal');
    const questionTitle=document.querySelector('#question');
    const formAnswers=document.querySelector('#formAnswers');
    const nextButton=document.querySelector('#next');
    const prevButton=document.querySelector('#prev');
    const sendButton=document.querySelector('#send');

    const questions=[
        {
        question: "Какого цвета бургер?",
        answers: [
            {
                title: 'Стандарт',
                url: './image/burger.png'
            },
            {
                title: 'Черный',
                url: './image/burgerBlack.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Из какого мяса котлета?",
        answers: [
            {
                title: 'Курица',
                url: './image/chickenMeat.png'
            },
            {
                title: 'Говядина',
                url: './image/beefMeat.png'
            },
            {
                title: 'Свинина',
                url: './image/porkMeat.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Дополнительные ингредиенты?",
        answers: [
            {
                title: 'Помидор',
                url: './image/tomato.png'
            },
            {
                title: 'Огурец',
                url: './image/cucumber.png'
            },
            {
                title: 'Салат',
                url: './image/salad.png'
            },
            {
                title: 'Лук',
                url: './image/onion.png'
            }
        ],
        type: 'checkbox'
    },
    {
        question: "Добавить соус?",
        answers: [
            {
                title: 'Чесночный',
                url: './image/sauce1.png'
            },
            {
                title: 'Томатный',
                url: './image/sauce2.png'
            },
            {
                title: 'Горчичный',
                url: './image/sauce3.png'
            }
        ],
        type: 'radio'
    }
];

    btnOpenModal.addEventListener('click', ()=>{

        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', ()=>{
        modalBlock.classList.remove('d-block');
    });

    const playTest=()=>{

        const finalAnswers=[];
        let numberQuestion=0;

        const renderAnswers=(index)=>{
            questions[index].answers.forEach((answer)=>{
                const answerItem=document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex','justify-content-center');
            
                answerItem.innerHTML=`
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value='${answer.title}'>
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>"${answer.title}"</span>
                    </label>
                `;
                formAnswers.appendChild(answerItem);

            })
        };

        const renderQuestions=(indexQuestion)=>{

            formAnswers.innerHTML="";
            if (numberQuestion>=0 && numberQuestion<=questions.length-1){
                questionTitle.textContent=`${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none');
            }
            if (numberQuestion===0){
                prevButton.classList.add('d-none');
            }
            
            if (numberQuestion===questions.length){
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');
                questionTitle.textContent='';
                modalTitle.textContent='';
                formAnswers.innerHTML=`
                <div class="form-group">
                <label for ="numberPhone">Введите свой номер телефона</label>
                <input type="phone" class="form-control" id="numberPhone">
                </div>

                `;
            }
            if (numberQuestion===questions.length+1){
                modalTitle.innerHTML="Спасибо за пройденный тест!";
            
                const answers=[];
                finalAnswers.forEach(item=>{
                    answers.push((Object.values(item)).toString().toLowerCase() );
                    
                });
                console.log(answers);
                let answer=`Ваш любимый бургер ${answers[0]}`;
                if (answers[1]){answer=answer+' с котлетой из '+`${answers[1].substr(0, answers[1].length-1)}ы `;}
                if (answers[3]){answer=answer+' c '+`${answers[3].substr(0, answers[3].length-2)}ым`+' соусом';} 
                if (answers[2]){
                    answer=answer+', в дополнение: '+answers[2];
                }   
                answers[0]==="черный"? src="./image/burgerBlack.png":src="./image/burger.png" ;
                formAnswers.innerHTML=`
                <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src=${src} alt="burger">
                </label>
                </div> 
                <p>${answer}</p>
                ` ;
                // formAnswers.textContent+=answer;  
                console.log('answer: ', answer);
                
                sendButton.classList.add('d-none');
                setTimeout(()=>{
                    modalBlock.classList.remove('d-block');
                },5000);
            }
        };

        renderQuestions(numberQuestion);

        const checkAnswer=()=>{
            const obj={};
            const inputs=[...formAnswers.elements].filter((input)=>input.checked || input.id==="numberPhone");
            inputs.forEach((input,index)=>{
                if (numberQuestion>=0 && numberQuestion<=questions.length-1){
                    obj[`${index}_${questions[numberQuestion].question}`]=input.value;
                }
                if (numberQuestion===questions.length){
                    obj['Номер телефона']=input.value;
                }
            });
            finalAnswers.push(obj);
        };
        
        nextButton.onclick=()=>{
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);            
        };

        prevButton.onclick=()=>{
            if (finalAnswers){finalAnswers.pop();}
            numberQuestion=numberQuestion-1;
            renderQuestions(numberQuestion);
        };

        sendButton.onclick=()=>{
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        };
    };
    
