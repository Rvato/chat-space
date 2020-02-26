# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false|
|user_id|integer|null: false|
|group_name|string|null: false|
### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|e_mail|string|null: false, unique: true|
|password|string|null: false|
|user_name|string|null: false, index: true|
### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|user_id|integer|null: false|
|group_id|integer|null: false|
### Association
- belongs_to :user
- belongs_to :group