class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.references :area

      t.timestamps
    end
    add_index :contacts, :area_id
  end
end
