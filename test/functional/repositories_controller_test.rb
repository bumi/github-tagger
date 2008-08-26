require File.dirname(__FILE__) + '/../test_helper'

class RepositoriesControllerTest < ActionController::TestCase
  def test_should_get_index
    get :index
    assert_response :success
    assert_not_nil assigns(:repositories)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end

  def test_should_create_repository
    assert_difference('Repository.count') do
      post :create, :repository => { }
    end

    assert_redirected_to repository_path(assigns(:repository))
  end

  def test_should_show_repository
    get :show, :id => repositories(:one).id
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => repositories(:one).id
    assert_response :success
  end

  def test_should_update_repository
    put :update, :id => repositories(:one).id, :repository => { }
    assert_redirected_to repository_path(assigns(:repository))
  end

  def test_should_destroy_repository
    assert_difference('Repository.count', -1) do
      delete :destroy, :id => repositories(:one).id
    end

    assert_redirected_to repositories_path
  end
end
