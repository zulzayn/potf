<div id="pipeline"></div>
<h4 class="text-center mt-2 mb-3">PIPELINE</h4>

<div class="content m-1" id="tab-group-2">

  <table class="h-100 w-100" style="background-color:transparent !important;border:none">
    <tr>
      <td style="background-color:transparent !important;">
        <div class="input-style has-borders no-icon mb-4 input-style-active">
          <label for="selectPipeline" class="color-highlight">Select a pipeline</label>
          <select id="selectPipeline">
            <option value="default" disabled="" selected="">Select a pipeline</option>
          </select>
          <span><i class="fa fa-chevron-down"></i></span>
        </div>
      </td>
      <td class="text-center" style="background-color:transparent !important;width:20px">
        <a id="btn-pipeline-config" data-menu="menu-add-pipeline" href="#" style="color:unset">
          <i class="fas fa-cog ps-1 mb-3 fa-lg"></i>
        </a>
      </td>
    </tr>
  </table>

  <div class="tab-controls tabs-small tabs-rounded" data-highlight="bg-highlight">
    <a href="#" data-active="" data-bs-toggle="collapse" data-bs-target="#tab-1-pipe">Parameter</a>
    <a href="#" data-bs-toggle="collapse" data-bs-target="#tab-2-pipe">Simulation Model</a>
  </div>

  <div class="clearfix mb-3"></div>

  <div data-bs-parent="#tab-group-2" class="collapse show" id="tab-1-pipe">
    @include('pipeline_parameter.index')
  </div>
  
  <div data-bs-parent="#tab-group-2" class="collapse" id="tab-2-pipe">
    @include('pipeline_simulation.index')
  </div>
  
</div>


@push('content2')


<div id="menu-add-pipeline" class="menu menu-box-modal menu-box-detached rounded-m" style="max-height:600px" data-menu-height="600" data-menu-width="500">
  <div class="menu-title mt-n1">
    <h1>Add Pipeline</h1>
    <p class="color-highlight">Add pipeline to the list.</p>
    <a href="#" class="close-menu"><i class="fa fa-times"></i></a>
  </div>
  <div class="content mt-2">
    <div class="divider mb-3"></div>
    <form class="needs-validation" id="addPipelineForm" novalidate>
      <div class="input-style input-style-always-active has-borders mb-4">
        <input id="pipelineName" name="pipelineName" type="name" class="form-control" placeholder="Enter pipeline name" required>
        <label class="color-theme opacity-50 text-uppercase font-700 font-10">Pipeline Name</label>
        <em>(required)</em>
      </div>

      <div class="input-style input-style-always-active has-borders mb-4">
        <textarea id="pipelineDesc" name="pipelineDesc" style="height:unset !important" class="form-control" cols="30" rows="5"
          placeholder="Enter pipeline description"></textarea>
        <label class="color-theme opacity-50 text-uppercase font-700 font-10">Pipeline Description</label>
      </div>

      <div class="row">
        <div class="col-12 text-center">

          <button type="submit" id="add-pipeline"
            class="btn btn-s rounded-s text-uppercase font-900 shadow-s border-highlight bg-highlight"><i
              class="fas fa-plus"></i>&nbsp;&nbsp;Add</button>
        </div>
      </div>
    </form>

    <div class="card card-style">
      <div class="content mb-2" style="height: 260px;overflow-y: scroll;">
        <h3 class="mb-2">List of Pipeline</h3>
        <table class="table table-borderless text-center rounded-sm shadow-l" style="overflow: hidden;">
          <thead>
            <tr>
              <th scope="col" class="bg-dark-dark border-dark-dark color-white">Pipeline</th>
              <th scope="col" class="bg-dark-dark border-dark-dark color-white">Description</th>
              <th scope="col" class="bg-dark-dark border-dark-dark color-white" style="width: 60px;">Action</th>
            </tr>
          </thead>
          <tbody id="tbl-pipeline">
           
            
          </tbody>
        </table>
      </div>
    </div>


  </div>
</div>

<div id="menu-delete-pipeline" class="menu menu-box-modal rounded-m" data-menu-width="310" data-menu-height="270">
  <div class="text-center"><i class="fal fa-times-circle color-red-light mt-4" style="font-size: 45px;"></i></div>
  <h1 class="text-center mt-3">Are You Sure?</h1>
  <p class="ps-3 pe-3 text-center color-theme opacity-60">
      Do you realy want to delete the record ? This action cannot be undone.
  </p>
  <form class="needs-validation" novalidate id="deletePipelineForm">
      <input type="hidden" name="idPipelineDelete" id="idPipelineDelete">
      <button type="submit" id="delete-pipeline"
          class="btn btn-m font-900 text-uppercase bg-highlight rounded-sm btn-center-l">Confirm</button>
  </form>
</div>

@endpush