function pipelineFormulaParameterBuilder(results){
    if (results.data){
        if (results.data.length) {
           
            $('#pipelineFormulaParameter').html('');
            console.log("Available Parameter");
            results.data.map(pipelineparam => {

                $('#pipelineFormulaParameter').append(`
                    <div class="col-3">
                    <a href="#" data-id-pipeline-param="${pipelineparam.id}" class="pipeline-formula-select btn btn-m btn-full mb-3 rounded-sm font-900 border-highlight-dark color-highlight-dark bg-theme">${pipelineparam.name}</a>
                    </div>
                `);
                
            })

            $('.pipeline-formula-select').on('click' , function(){
  
              

              // will give the current postion of the cursor
              var curPos = document.getElementById("pipelineSimulationFormula").selectionStart; 
            
              // will get the value of the text area
              let x= $('#pipelineSimulationFormula').val();
            
              // will get the value of the input box
            //   let text_to_insert=$(this).html();
              let idPipelineParam = $(this).data('id-pipeline-param');
        
              // setting the updated value in the text area
              $('#pipelineSimulationFormula').val(x.slice(0,curPos)+'{{'+idPipelineParam+'}}'+x.slice(curPos));
              $("#pipelineSimulationFormula").focus();
            })

        }
        else{
            $('#pipelineFormulaParameter').html('');

            $('#pipelineFormulaParameter').append(`
            <br>
            <p class="text-center">Parameter is empty. Please add first at parameter tab.</p>
            <br>
            `);
        }
    }
    else
    {
        $('#pipelineFormulaParameter').html('');

        $('#pipelineFormulaParameter').append(`
        <br>
        <p class="text-center">Parameter is empty. Please add first at parameter tab.</p>
        <br>
        `);
    }
}

function pipelineParameterListBuilder(results){
    if (results.data){
        if (results.data.length) {
            $('#pipelineParameterList').html('');

            results.data.map(pipelineparam => {

                $('#pipelineParameterList').append(`
                    <a href="#" data-menu="menu-transaction-1" class="d-flex mb-3">

                        <div class="align-self-center">
                        <h1 class="mb-n2 font-16">${pipelineparam.name}</h1>
                        <p class="font-11 opacity-60">${pipelineparam.required === 1 ? 'required' : 'optional'}</p>
                        </div>
                        <div class="align-self-center ms-auto text-end">
                        <h2 class="mb-n1 font-18 color-highlight">${pipelineparam.type}</h2>
    
                        </div>
                    </a>
                `)
            })

        }
        else{
            $('#pipelineParameterList').html('');

            $('#pipelineParameterList').append(`
            <br>
            <p class="text-center">Parameter is empty. To add click on the plus button. To view other parameter, please select other Pipeline</p>
            <br>
            `);
        }
    }
    else
    {
        $('#pipelineParameterList').html('');

        $('#pipelineParameterList').append(`
            
        `);
    }
}

function getAllPipeline(){
    fetch('/pipeline').then(function(response) {
        return response.json();
    }).then(function(resultsJSON) {

        var results = resultsJSON

        if(results.status == 'success'){
            
            if (results.data){
                if (results.data.length) {

                    if (document.querySelector('#selectPipeline')) {
                        $('#selectPipeline').html('');

                        $('#selectPipeline').append(`
                            <option value="default" disabled="" selected="">Select a Pipeline</option>
                        `);

                        results.data.map(pipeline => {

                            $('#selectPipeline').append(`
                                <option value="${pipeline.id}">${pipeline.name}</option>
                            `)
                        })
                    }

                    if (document.querySelector('#tbl-pipeline')) {
                        $('#tbl-pipeline').html('');

                        results.data.map(pipeline => {
                            $('#tbl-pipeline').append(`
                            <tr class="bg-dark-light">
                            <th scope="row">${pipeline.name}</th>
                            <td>${pipeline.desc ? pipeline.desc : ''}</td>
                            <td>
                            <a class="deletePipeline" data-idpipeline="${pipeline.id}" href="#"><i class="far fa-trash-alt color-red-dark"></i></a>
                            </td>
                            </tr>
                        `);
                        });

                        $('.deletePipeline').on('click' , function() {
                            let idPipeline = $(this).data('idpipeline');
                            $('#idPipelineDelete').val(idPipeline);
                            menu('menu-delete-pipeline', 'show', 250);
                        })

                    }

                }
                else{
                    $('#selectPipeline').html('');

                    $('#selectPipeline').append(`
                    <option value="default" disabled="" selected="">Select a Pipeline</option>
                    `);

                    $('#tbl-pipeline').html('');
                }
            }

        }
        else{
            if(results.type == 'Validation Error'){
                validationErrorBuilder(results);
            }
            else{
                snackbar(results.status , results.message)
            }
        }
    
    }).catch(function(err) {
        console.log('Error Get All Pipeline: ' + err);
    });
}

function getPipelineParameter(idPipeline){

    $('#pipelineParameterList').html(`
    <br>

    <div class="d-flex justify-content-center">
        <div class="spinner-border color-highlight text-center" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>

    <br>
    `);
    

    fetch('/pipelineparameter/'+idPipeline+'').then(function(response) {
        return response.json();
    }).then(function(resultsJSON) {

        var results = resultsJSON

        if(results.status == 'success'){
            
            pipelineFormulaParameterBuilder(results);

            pipelineParameterListBuilder(results);

           
           

        }
        else{
            if(results.type == 'Validation Error'){
                validationErrorBuilder(results);
            }
            else{
                snackbar(results.status , results.message)
            }
        }
    
    }).catch(function(err) {
        console.log('Error Get Pipeline Parameter: ' + err);
    });
}


function getPipelineSimulation(idPipeline){

    $('#pipelineSimulationList').html(`
    <br>

    <div class="d-flex justify-content-center">
        <div class="spinner-border color-highlight text-center" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>

    <br>
    `);
    

    fetch('/pipelinesimulator/'+idPipeline+'').then(function(response) {
        return response.json();
    }).then(function(resultsJSON) {

        var results = resultsJSON

        if(results.status == 'success'){
            
            if (results.data){
                if (results.data.length) {
                    $('#pipelineSimulationList').html('');

                    results.data.map(pipelinesimulator => {

                        $('#pipelineSimulationList').append(`
                            <a href="#" data-menu="menu-transaction-1" class="d-flex mb-3">

                                <div class="align-self-center">
                                <h1 class="mb-n2 font-16">${pipelinesimulator.name}</h1>
                                </div>

                            </a>
                        `)
                    })

                }
                else{
                    $('#pipelineSimulationList').html('');

                    $('#pipelineSimulationList').append(`
                    <br>
                    <p class="text-center">Simulator is empty. To add click on the plus button. To view other simulators, please select other Pipeline</p>
                    <br>
                    `);
                }
            }
            else
            {
                $('#pipelineSimulationList').html('');

                $('#pipelineSimulationList').append(`
                    
                `);
            }

        }
        else{
            if(results.type == 'Validation Error'){
                validationErrorBuilder(results);
            }
            else{
                snackbar(results.status , results.message)
            }
        }
    
    }).catch(function(err) {
        console.log('Error Get Pipeline Simulators: ' + err);
    });
}


///////////////////////////////////////////////////////////////////////
// Select pipeline dropdown
if (document.querySelector('#selectPipeline')) {

    //Initialize pipeline dropdown
    getAllPipeline();

    //Event listener for pipeline dropdown
    $('#selectPipeline').on('change' , () => {
        let val = $('#selectPipeline').val();
        $('.selected-pipeline').html(val);
        $('.idPipeline').val(val);

        getPipelineParameter(val);
        getPipelineSimulation(val);
    })


}
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//Add Pipeline
$("#addPipelineForm").on('submit' , function(event){

    event.preventDefault();
    if (navigator.onLine) {
        var formElement = $(this);

         // Loop over them and prevent submission
         Array.prototype.slice.call(formElement)
         .forEach(function (formValidate) {
            if (!formValidate.checkValidity()) 
            {
                event.preventDefault()
                event.stopPropagation()
            }
            else
            {

                let form = formElement[0];
                let btnSubmitForm = $('#add-pipeline')

                btnSubmitForm.addClass('off-btn').trigger('classChange');

                fetch("pipeline", {
                    method: 'post',
                    credentials: "same-origin",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    },
                    body: new FormData(form),
                })
                .then(function(response){
                    return response.json();
                }).then(function(resultsJSON){

                    var results = resultsJSON

                    if(results.status == 'success'){

                        getAllPipeline();
                        
                        btnSubmitForm.removeClass('off-btn').trigger('classChange');

                        snackbar(results.status , results.message)

                        form.reset();

                    }
                    else{
                        if(results.type == 'Validation Error')
                        {
                            btnSubmitForm.removeClass('off-btn').trigger('classChange');

                            validationErrorBuilder(results);
                        }
                        else{
                            snackbar(results.status , results.message)
                        }
                    }

                })
                .catch(function(err) {
                    console.log('Error Add New Pipeline: ' + err);
                });

                
            }
            formValidate.classList.add('was-validated');
        });
    }
    else{
        menu('menu-offline', 'show', 250);
    }
});
///////////////////////////////////////////////////////////////////////


 ///////////////////////////////////////////////////////////////////////
//Add Pipeline Parameter
$("#addPipelineParamForm").on('submit' , function(event){

    event.preventDefault();
    if (navigator.onLine) {
        var formElement = $(this);

         // Loop over them and prevent submission
         Array.prototype.slice.call(formElement)
         .forEach(function (formValidate) {
            if (!formValidate.checkValidity()) 
            {
                event.preventDefault()
                event.stopPropagation()
            }
            else
            {
                let form = formElement[0];
                let btnSubmitForm = $('#add-pipeline-param');

                btnSubmitForm.addClass('off-btn').trigger('classChange');

                let formData = new FormData(form);
                if ($('#pipelineParameterRequired').is(":checked"))
                {
                    var pipelineParameterRequired = 1;
                    formData.append('pipelineParameterRequired', pipelineParameterRequired);
                }
                else
                {
                    var pipelineParameterRequired = 0;
                    formData.append('pipelineParameterRequired', pipelineParameterRequired);
                }

                var idPipeline = $('#idPipeline').val();

                fetch("pipelineparameter", {
                    method: 'post',
                    credentials: "same-origin",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    },
                    body: formData,
                })
                .then(function(response){
                    return response.json();
                }).then(function(resultsJSON){

                    var results = resultsJSON

                    if(results.status == 'success'){
                        
                        btnSubmitForm.removeClass('off-btn').trigger('classChange');

                        menu('menu-add-pipeline-parameter', 'hide', 250);

                        snackbar(results.status , results.message)

                        form.reset();

                        getPipelineParameter(idPipeline);
                        getPipelineSimulation(idPipeline);

                    }
                    else{
                        if(results.type == 'Validation Error')
                        {
                            btnSubmitForm.removeClass('off-btn').trigger('classChange');

                            validationErrorBuilder(results);
                        }
                        else{
                            snackbar(results.status , results.message)
                        }
                    }

                })
                .catch(function(err) {
                    console.log('Error Add New Pipeline Parameter: ' + err);
                });

                
            }
            formValidate.classList.add('was-validated');
        });
    }
    else{
        menu('menu-offline', 'show', 250);
    }
});
///////////////////////////////////////////////////////////////////////


 ///////////////////////////////////////////////////////////////////////
//Add Pipeline Simulator
$("#addPipelineSimulationForm").on('submit' , function(event){

    event.preventDefault();
    if (navigator.onLine) {
        var formElement = $(this);

         // Loop over them and prevent submission
         Array.prototype.slice.call(formElement)
         .forEach(function (formValidate) {
            if (!formValidate.checkValidity()) 
            {
                event.preventDefault()
                event.stopPropagation()
            }
            else
            {
                let form = formElement[0];
                let btnSubmitForm = $('#add-pipeline-simulation');

                btnSubmitForm.addClass('off-btn').trigger('classChange');

                var idPipeline = $('#idPipeline4Simulation').val();
               

                fetch("pipelinesimulator", {
                    method: 'post',
                    credentials: "same-origin",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    },
                    body: new FormData(form),
                })
                .then(function(response){
                    return response.json();
                }).then(function(resultsJSON){

                    var results = resultsJSON

                    if(results.status == 'success'){
                        
                        btnSubmitForm.removeClass('off-btn').trigger('classChange');

                        menu('menu-add-pipeline-simulation', 'hide', 250);

                        snackbar(results.status , results.message)

                        form.reset();

                        getPipelineSimulation(idPipeline);

                    }
                    else{
                        if(results.type == 'Validation Error')
                        {
                            btnSubmitForm.removeClass('off-btn').trigger('classChange');

                            validationErrorBuilder(results);
                        }
                        else{
                            snackbar(results.status , results.message)
                        }
                    }

                })
                .catch(function(err) {
                    console.log('Error Add New Pipeline Simulation: ' + err);
                });

                
            }
            formValidate.classList.add('was-validated');
        });
    }
    else{
        menu('menu-offline', 'show', 250);
    }
});
///////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////
//Delete Pipeline
$("#deletePipelineForm").on('submit' , function(event){

    event.preventDefault();
    if (navigator.onLine) {
        var formElement = $(this);

        var formdata = new FormData();
        formdata.append("_method", "DELETE");

        // Loop over them and prevent submission
        Array.prototype.slice.call(formElement)
        .forEach(function (formValidate) {
            if (!formValidate.checkValidity()) 
            {
                event.preventDefault()
                event.stopPropagation()
            }
            else
            {
                let form = new FormData(formElement[0]);
                let btnSubmitForm = $('#delete-pipeline');

                btnSubmitForm.addClass('off-btn').trigger('classChange');

                // var deletePipelineId = $('#idPipelineDelete').val();

                fetch("pipeline/"+form.get('idPipelineDelete')+"/", {
                    method: 'DELETE',
                    credentials: "same-origin",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                })
                .then(function(response){
                    return response.json();
                }).then(function(resultsJSON){

                    var results = resultsJSON

                    if(results.status == 'success'){


                        btnSubmitForm.removeClass('off-btn').trigger('classChange');

                        menu('menu-delete-pipeline', 'hide', 250);

                        snackbar(results.status , results.message)

                        getAllPipeline();

                    }
                    else{
                        if(results.type == 'Validation Error')
                        {
                            btnSubmitForm.removeClass('off-btn').trigger('classChange');

                            validationErrorBuilder(results);
                        }
                        else{
                            snackbar(results.status , results.message)
                        }
                    }

                })
                .catch(function(err) {
                    console.log(err);
                });

                
            }
            formValidate.classList.add('was-validated'); 
        });
    }
    else{
        menu('menu-offline', 'show', 250);
    }
});
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//Check if idPipeline already assign into the modal
$('#btn-menu-add-pipeline-parameter').on('click' , function(){
    let idPipeline = $('#menu-add-pipeline-parameter').find('.selected-pipeline').html();
    console.log(idPipeline);
    if(idPipeline){
        menu('menu-add-pipeline-parameter', 'show', 250);
    }else{
        snackbar('warning' , 'Please select pipeline first.')
    }
});
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//Check if idPipeline already assign into the modal
$('#btn-menu-add-pipeline-simulation').on('click' , function(){
    let idPipeline = $('#menu-add-pipeline-simulation').find('.selected-pipeline').html();
    if(idPipeline){
        menu('menu-add-pipeline-simulation', 'show', 250);
    }else{
        snackbar('warning' , 'Please select pipeline first.')
    }
});
///////////////////////////////////////////////////////////////////////