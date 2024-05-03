<template>
    <div class="authentication-card">
      <div class="card-header">
         资料审核基本区域<span>正常</span>
      </div>
      <div class="card-body">
        <div class="card-text-row">
          <span class="card-text-label">姓名：</span>
          <span class="card-text-value">张三</span>
        </div>
        <div class="card-text-row">
          <span class="card-text-label">学号：</span>
          <span class="card-text-value">S22222</span>
        </div>
        <div class="card-text-row">
          <span class="card-text-label">电话：</span>
          <span class="card-text-value">13464646</span>
        </div>
        <div class="card-operations">
          <button class="card-operation-button">更新</button>
          <button class="card-operation-button">预览记录</button>
          <button class="card-operation-button">状态管理</button>
          <button class="card-operation-button">更新操作</button>
        </div>
      </div>
      <div class="card-footer">
        <span>1</span>
      </div>    
    </div>
    </template>
    
    <style scoped>
    .authentication-card {
      width: 350px;
      border: 1px solid #c0c0c0;
      border-radius: 5px;
      background-color: white;
      margin: 10px auto;
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      background-color: #e8e8e8;
      border-bottom: 1px solid #c0c0c0;
    }
    
    .card-body {
      padding: 10px;
    }
    
    .card-text-row {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;
    }
    
    .card-text-label {
      width: 80px;
      color: #606060;
    }
    
    .card-operations {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
    }
    
    .card-operation-button {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #c0c0c0;
      background-color: white;
      color: #606060;
      cursor: pointer;
    }
    
    .card-operation-button:hover {
      background-color: #e8e8e8;
    }
    
    .card-footer {
      display: flex;
      justify-content: center;
      padding: 10px;
      background-color: #e8e8e8;
      border-top: 1px solid #c0c0c0;
    }
    </style>