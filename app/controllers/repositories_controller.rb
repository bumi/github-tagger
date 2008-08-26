class RepositoriesController < ApplicationController

  def index
    if params[:tags]
      @repositories = (polymorphic_object ? polymorphic_object.repositories : Repository).find_all_tagged_with(params[:tags])
    else
      @repositories = Repository.find(:all)
    end

    respond_to do |format|
      format.js { render :json => @repositories.to_json, :callback => params[:callback] }
    end
  end

  def show
    @repository = Repository.find_by_param(params[:id])

    respond_to do |format|
      format.js { render :json => @repository.to_json, :callback => params[:callback] }
    end
  end

  def create
    @repository = Repository.new(params[:repository])

    respond_to do |format|
      if @repository.save
        flash[:notice] = 'Repository was successfully created.'
        format.js { render :json => @repository.to_json, :callback => params[:callback] }
      else
        format.js { render :json => @repository.errors.to_json, :callback => params[:callback] }
      end
    end
  end

end
