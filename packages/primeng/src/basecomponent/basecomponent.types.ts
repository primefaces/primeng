import type { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';

export type NgLifecycle = OnInit & OnChanges & DoCheck & AfterContentInit & AfterContentChecked & AfterViewInit & AfterViewChecked & OnDestroy;

export type LifecycleHooks = 'onInit' | 'onChanges' | 'doCheck' | 'onDestroy' | 'onAfterContentInit' | 'onAfterContentChecked' | 'onAfterViewInit' | 'onAfterViewChecked';
